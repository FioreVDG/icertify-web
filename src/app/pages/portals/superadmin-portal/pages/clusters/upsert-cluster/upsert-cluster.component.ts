import { AutocompleteDialogComponent } from './autocomplete-dialog/autocomplete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { QueryParams } from './../../../../../../models/queryparams.interface';
import { ApiService } from './../../../../../../service/api/api.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-upsert-cluster',
  templateUrl: './upsert-cluster.component.html',
  styleUrls: ['./upsert-cluster.component.scss'],
})
export class UpsertClusterComponent implements OnInit {
  @ViewChild('riderInput') riderInput!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  totalDuration = 0;
  clusterForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    day: new FormGroup({
      monday: new FormGroup({
        am: new FormControl(''),
        pm: new FormControl(''),
        status: new FormControl(false, [Validators.required]),
      }),
      tuesday: new FormGroup({
        am: new FormControl(''),
        pm: new FormControl(''),
        status: new FormControl(false, [Validators.required]),
      }),
      wednesday: new FormGroup({
        am: new FormControl(''),
        pm: new FormControl(''),
        status: new FormControl(false, [Validators.required]),
      }),
      thursday: new FormGroup({
        am: new FormControl(''),
        pm: new FormControl(''),
        status: new FormControl(false, [Validators.required]),
      }),
      friday: new FormGroup({
        am: new FormControl(''),
        pm: new FormControl(''),
        status: new FormControl(false, [Validators.required]),
      }),
      saturday: new FormGroup({
        am: new FormControl(''),
        pm: new FormControl(''),
        status: new FormControl(false, [Validators.required]),
      }),
      sunday: new FormGroup({
        am: new FormControl(''),
        pm: new FormControl(''),
        status: new FormControl(false, [Validators.required]),
      }),
    }),
    _notaryId: new FormControl('', [Validators.required]),
    _riders: new FormArray([]),
    barangays: new FormArray([]),
  });

  riderCtrl = new FormControl();
  filteredRiders: Observable<any[]>;
  notaryCtrl = new FormControl();
  filteredNotaries: Observable<any[]>;
  barangayControls: AbstractControl[] = [];

  activeFlag = false;

  days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  addBarangayForm() {
    (this.clusterForm.get('barangays') as FormArray).push(
      new FormGroup({
        barangay: new FormControl({}, [Validators.required]),
        _brgyId: new FormControl('', [Validators.required]),
        minDoc: new FormControl('', [Validators.required]),
        maxDoc: new FormControl('', [Validators.required]),
        duration: new FormControl('', [Validators.required]),
      })
    );

    this.barangayControls = (
      this.clusterForm.get('barangays') as FormArray
    ).controls;
  }

  deleteBarangayForm(i: number) {
    // ask question here
    (this.clusterForm.get('barangays') as FormArray).removeAt(i);
  }

  selectBarangay(i: number) {
    this.dialog
      .open(AutocompleteDialogComponent)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res) {
          (this.clusterForm.get('barangays') as FormArray)
            .at(i)
            .get('_brgyId')
            ?.setValue(res._brgyId);

          (this.clusterForm.get('barangays') as FormArray)
            .at(i)
            .get('barangay')
            ?.setValue(res.address.barangay);
        }
      });
  }

  getTotalDuration() {
    var totalDuration = 0;
    this.clusterForm.value.barangays.forEach((brgy: any) => {
      totalDuration += brgy.duration * brgy.maxDoc;
    });
    this.totalDuration = totalDuration;
    return totalDuration;
  }

  constructor(private api: ApiService, private dialog: MatDialog) {
    this.filteredRiders = this.riderCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this._filter(val || '', 'Rider');
      })
    );

    this.filteredNotaries = this.notaryCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this._filter(val || '', 'Notary');
      })
    );

    this.addBarangayForm();
  }

  private _filter(value: string, type: string): Observable<any[]> {
    var mobileNumbers: Array<string> = [];
    // this.clusterForm.value._riders.forEach((rider: any) => {
    //   mobileNumbers.push(rider.mobileNumber);
    // });
    var query: QueryParams = {
      find: [
        {
          value: type,
          field: 'type',
          operator: '=',
        },
      ],
      filter: {
        value,
        fields: ['firstName', 'lastName'],
      },
    };
    if (mobileNumbers.length) {
      query.find.push({
        field: 'mobileNumber',
        operator: '[nin]',
        value: mobileNumbers.join(','),
      });
    }
    console.log(query);
    // todo, add interface for response of endpoints
    return this.api.user.getAllUser(query).pipe(
      map((res: any) => {
        console.log(res);
        return res.env.users;
      })
    );
  }

  notarySelected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.value);
    this.clusterForm.get('_notaryId')?.setValue(event.option.value._id);
  }

  displayWith(option: any) {
    return (option.firstName + ' ' + option.lastName).toUpperCase();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.fruits.push(event.option.viewValue);
    console.log(event.option.value);
    var rider = event.option.value;
    let riderFormGroup = new FormGroup({
      _id: new FormControl(rider._id),
      firstName: new FormControl(rider.firstName),
      lastName: new FormControl(rider.lastName),
      mobileNumber: new FormControl(rider.mobileNumber),
    });
    (this.clusterForm.get('_riders') as FormArray).push(riderFormGroup);
    this.riderInput.nativeElement.value = '';
    this.riderCtrl.setValue(null);
  }

  removeRider(i: number) {
    (this.clusterForm.get('_riders') as FormArray).removeAt(i);
  }

  ngOnInit(): void {
    this.days.forEach((d) => {
      this.clusterForm
        .get('day')
        ?.get(d)
        ?.get('status')
        ?.valueChanges.subscribe((res) => {
          if (res) {
            this.clusterForm
              .get('day')
              ?.get(d)
              ?.get('am')
              ?.setValidators([Validators.required]);
            this.clusterForm
              .get('day')
              ?.get(d)
              ?.get('pm')
              ?.setValidators([Validators.required]);
          } else {
            this.clusterForm.get('day')?.get(d)?.get('am')?.clearValidators();
            this.clusterForm.get('day')?.get(d)?.get('pm')?.clearValidators();
            this.clusterForm.get('day')?.get(d)?.get('am')?.setValue('');
            this.clusterForm.get('day')?.get(d)?.get('pm')?.setValue('');
            this.clusterForm.get('day')?.get(d)?.get('am')?.setErrors(null);
            this.clusterForm.get('day')?.get(d)?.get('pm')?.setErrors(null);
          }
          this.checkActiveDay();
        });
    });
  }

  checkActiveDay() {
    this.activeFlag = false;
    this.days.forEach((d) => {
      this.activeFlag =
        this.activeFlag ||
        this.clusterForm.get('day')?.get(d)?.get('status')?.value;
    });
  }

  saveCluster() {
    console.log(this.clusterForm.getRawValue());
  }
}
