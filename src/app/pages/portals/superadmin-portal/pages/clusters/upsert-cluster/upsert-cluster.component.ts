import { ActionResultComponent } from './../../../../../../shared/dialogs/action-result/action-result.component';
import { AutocompleteDialogComponent } from './autocomplete-dialog/autocomplete-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-upsert-cluster',
  templateUrl: './upsert-cluster.component.html',
  styleUrls: ['./upsert-cluster.component.scss'],
})
export class UpsertClusterComponent implements OnInit {
  @ViewChild('riderInput') riderInput!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedRider: any[] = [];
  objRider: any[] = [];
  totalDuration = 0;
  selectedCluster: any[] = [];
  clusterForm = new FormGroup({
    name: new FormControl(this.data ? this.data.name : '', [
      Validators.required,
    ]),
    day: new FormGroup({
      monday: new FormGroup({
        am: new FormControl(this.data ? this.data.day.monday.am : ''),
        pm: new FormControl(this.data ? this.data.day.monday.pm : ''),
        status: new FormControl(
          this.data && this.data.day.monday.status === 'Open' ? 'Open' : false,
          [Validators.required]
        ),
      }),
      tuesday: new FormGroup({
        am: new FormControl(this.data ? this.data.day.tuesday.am : ''),
        pm: new FormControl(this.data ? this.data.day.tuesday.pm : ''),
        status: new FormControl(
          this.data && this.data.day.tuesday.status === 'Open' ? 'Open' : false,
          [Validators.required]
        ),
      }),
      wednesday: new FormGroup({
        am: new FormControl(this.data ? this.data.day.wednesday.am : ''),
        pm: new FormControl(this.data ? this.data.day.wednesday.pm : ''),
        status: new FormControl(
          this.data && this.data.day.wednesday.status === 'Open'
            ? 'Open'
            : false,
          [Validators.required]
        ),
      }),
      thursday: new FormGroup({
        am: new FormControl(this.data ? this.data.day.thursday.am : ''),
        pm: new FormControl(this.data ? this.data.day.thursday.pm : ''),
        status: new FormControl(
          this.data && this.data.day.thursday.status === 'Open'
            ? 'Open'
            : false,
          [Validators.required]
        ),
      }),
      friday: new FormGroup({
        am: new FormControl(this.data ? this.data.day.friday.am : ''),
        pm: new FormControl(this.data ? this.data.day.friday.pm : ''),
        status: new FormControl(
          this.data && this.data.day.friday.status === 'Open' ? 'Open' : false,
          [Validators.required]
        ),
      }),
      saturday: new FormGroup({
        am: new FormControl(this.data ? this.data.day.saturday.am : ''),
        pm: new FormControl(this.data ? this.data.day.saturday.pm : ''),
        status: new FormControl(
          this.data && this.data.day.saturday.status === 'Open'
            ? 'Open'
            : false,
          [Validators.required]
        ),
      }),
      sunday: new FormGroup({
        am: new FormControl(this.data ? this.data.day.sunday.am : ''),
        pm: new FormControl(this.data ? this.data.day.sunday.pm : ''),
        status: new FormControl(
          this.data && this.data.day.sunday.status === 'Open' ? 'Open' : false,
          [Validators.required]
        ),
      }),
    }),
    _notaryId: new FormControl('', [Validators.required]),
    _riders: new FormArray([]),
    barangays: new FormArray([]),
  });

  riderCtrl = new FormControl();
  filteredRiders: Observable<any[]>;
  notaryCtrl = new FormControl(this.data ? this.data._notaryId : '');
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

  addBarangayForm(def?: any) {
    (this.clusterForm.get('barangays') as FormArray).push(
      new FormGroup({
        _barangay: new FormControl(def ? def._barangay : '', [
          Validators.required,
        ]),
        minDoc: new FormControl(def ? def.minDoc : '', [Validators.required]),
        maxDoc: new FormControl(def ? def.maxDoc : '', [Validators.required]),
        duration: new FormControl(def ? def.duration : '', [
          Validators.required,
        ]),
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
    let selClusters: any[] = [];
    console.log(i);
    if (this.clusterForm.get('barangays')?.value.length) {
      let selectedBarangays = this.clusterForm.get('barangays')?.value;
      for (const barangay of selectedBarangays) {
        selClusters.push(barangay);
      }
    }

    this.dialog
      .open(AutocompleteDialogComponent, { data: { barangays: selClusters } })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          if (this.data && this.data.barangays.length) {
            console.log(this.data.barangays);
            if (
              this.data.barangays[i] &&
              this.data.barangays[i]._barangay.brgyCode !==
                res._barangay.brgyCode
            ) {
              (this.clusterForm.get('barangays') as FormArray)
                .at(i)
                .get('_barangay')
                ?.markAsDirty();
            } else {
              (this.clusterForm.get('barangays') as FormArray)
                .at(i)
                .get('_barangay')
                ?.markAsPristine();
            }
          } else {
            (this.clusterForm.get('barangays') as FormArray)
              .at(i)
              .get('_barangay')
              ?.markAsDirty();
          }

          (this.clusterForm.get('barangays') as FormArray)
            .at(i)
            .get('_barangay')
            ?.setValue(res._barangay);
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UpsertClusterComponent>
  ) {
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

    if (!this.data) this.addBarangayForm();
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
        {
          value: type === 'Rider' ? false : true,
          field: 'isMain',
          operator: '=',
        },
      ],
      filter: {
        value,
        fields: ['firstName', 'lastName', 'email'],
      },
    };
    if (type === 'Rider') {
      if (this.selectedRider.length) {
        query.find.push({
          field: '_id',
          operator: '[nin]=',
          value: this.selectedRider.join(','),
        });
      }
    }

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
    (this.clusterForm.get('_notaryId') as FormArray).markAsDirty();
  }

  displayWith(option: any) {
    console.log(option);
    if (option) return (option.firstName + ' ' + option.lastName).toUpperCase();
    return '';
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.fruits.push(event.option.viewValue);

    var rider = event.option.value;
    this.selectedRider.push(rider._id);
    let riderFormGroup = new FormGroup({
      _id: new FormControl(rider._id),
      firstName: new FormControl(rider.firstName),
      lastName: new FormControl(rider.lastName),
      mobileNumber: new FormControl(rider.mobileNumber),
    });
    (this.clusterForm.get('_riders') as FormArray).push(riderFormGroup);
    (this.clusterForm.get('_riders') as FormArray).markAsDirty();
    this.riderInput.nativeElement.value = '';
    this.riderCtrl.setValue(null);
  }

  removeRider(i: number) {
    (this.clusterForm.get('_riders') as FormArray).removeAt(i);
    this.selectedRider.splice(i, 1);

    if (this.selectedRider.length === this.objRider.length) {
      for (let i = 1; i < this.objRider.length; i++) {
        if (this.selectedRider[i] !== this.objRider[i]) {
          (this.clusterForm.get('_riders') as FormArray).markAsDirty();
        }
      }
      (this.clusterForm.get('_riders') as FormArray).markAsPristine();
    } else {
      (this.clusterForm.get('_riders') as FormArray).markAsDirty();
    }
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
    if (this.data) this.setDefaultValueFormArray();
    console.log(this.notaryCtrl.value);

    if (this.data) {
      if (this.data._riders.length) {
        this.data._riders.forEach((el: any) => {
          this.selectedRider.push(el._id);
          this.objRider.push(el._id);
        });
      }
    }

    this.clusterForm.valueChanges.subscribe((res) => {
      console.log(this.clusterForm.get('barangays'));
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
    var cluster = this.clusterForm.getRawValue();
    this.days.forEach((d) => {
      cluster.day[d].status = cluster.day[d].status ? 'Open' : 'Closed';
    });
    let api = this.api.cluster.create(cluster);
    if (this.data) api = this.api.cluster.update(cluster, this.data.id);

    this.dialog
      .open(AreYouSureComponent, {
        data: {
          isOthers: true,
          msg: 'save this Cluster?',
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(
        (res: any) => {
          if (res) {
            api.subscribe(
              (res) => {
                console.log(res);
                this.dialog.open(ActionResultComponent, {
                  data: {
                    msg:
                      cluster.name + ' successfully ' + this.data
                        ? 'updated!'
                        : 'added!',
                    success: true,
                    button: 'Got it!',
                  },
                });
                this.dialogRef.close(true);
              },
              (err) => {
                this.dialog.open(ActionResultComponent, {
                  data: {
                    msg: 'Error: ' + err.error.message,
                    success: false,
                    button: 'Got it!',
                  },
                });
              }
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  setDefaultValueFormArray() {
    this.data.barangays.forEach((i: any) => {
      this.addBarangayForm(i);
    });
    this.data._riders.forEach((i: any) => {
      console.log(i);
      let riderFormGroup = new FormGroup({
        _id: new FormControl(i._id),
        firstName: new FormControl(i.firstName),
        lastName: new FormControl(i.lastName),
        mobileNumber: new FormControl(i.mobileNumber),
      });
      (this.clusterForm.get('_riders') as FormArray).push(riderFormGroup);
    });
  }

  onClose() {
    if (!this.clusterForm.pristine) {
      this.dialog
        .open(AreYouSureComponent, {
          data: {
            isOthers: true,
            msg: 'cancel? Clicking "Yes" will cancel adding cluster',
          },
          disableClose: true,
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) this.dialogRef.close();
        });
    } else {
      this.dialogRef.close();
    }
  }
}
