import { QueryParams } from './../../../../../../models/queryparams.interface';
import { ApiService } from './../../../../../../service/api/api.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upsert-cluster',
  templateUrl: './upsert-cluster.component.html',
  styleUrls: ['./upsert-cluster.component.scss'],
})
export class UpsertClusterComponent implements OnInit {
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

  riders = [];

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

  addRider(_riderId: string) {
    const _riderForm = new FormControl('', [Validators.required]);
    (this.clusterForm.get('_rider') as FormArray).push(_riderForm);
  }

  addBarangay(_riderId: string) {
    const _riderForm = new FormControl('', [Validators.required]);
    (this.clusterForm.get('_rider') as FormArray).push(_riderForm);
  }

  constructor(private api: ApiService) {
    var query: QueryParams = {
      find: [
        {
          value: 'Rider',
          field: 'type',
          operator: '=',
        },
      ],
    };
    // todo, add interface for response of endpoints
    this.api.user.getAllUser(query).subscribe((res: any) => {
      console.log(res);
    });
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
