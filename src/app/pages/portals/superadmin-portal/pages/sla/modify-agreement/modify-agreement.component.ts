import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { COLLECTIONS, MOCK } from './config';

@Component({
  selector: 'app-modify-agreement',
  templateUrl: './modify-agreement.component.html',
  styleUrls: ['./modify-agreement.component.scss'],
})
export class ModifyAgreementComponent implements OnInit {
  agreementForm = new FormGroup({
    label: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    time: new FormGroup({
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
    }),
    displayType: new FormControl('', [Validators.required]),
    collectionName: new FormControl('', [Validators.required]),
    path: new FormControl('', [Validators.required]),
  });

  displayTypes = ['Tabular', 'Pie Chart', 'Line Graph', 'Bar Graph'];
  collections = COLLECTIONS;
  properties: Array<{ label: string; path: string }> = [];
  agreementIndex = -1;

  // TODO: Create interface of agreement
  agreements: Array<any> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private util: UtilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.agreements = this.data.agreements;
    this.agreementForm.get('collectionName')?.valueChanges.subscribe((res) => {
      this.properties =
        this.collections.find((o) => o.name === res)?.paths || [];
    });
  }

  editAgreement(i: number) {
    this.agreementIndex = i;
    this.agreementForm.setValue(this.agreements[i]);
    console.log(this.agreementIndex);
  }

  pushToAgreements() {
    if (this.agreementIndex < 0)
      this.agreements.push(this.agreementForm.getRawValue());
    else
      this.agreements.splice(
        this.agreementIndex,
        1,
        this.agreementForm.getRawValue()
      );

    this.data.agreements = this.agreements;
    let loader = this.util.startLoading('Syncing Changes...');
    this.api.sla.update(this.data, this.data._id).subscribe(
      (res) => {
        this.agreementForm.reset();
        console.log(this.agreements);
        this.agreementIndex = -1;
        this.util.stopLoading(loader);
      },
      (err) => {
        this.dialog.open(ActionResultComponent, {
          data: {
            msg: 'Error: ' + err.error.message,
            success: false,
            button: 'Okay',
          },
        });
      }
    );
  }

  removeFromAgreements(i: number) {
    this.agreements.splice(i, 1);
  }

  // onSubmit() {
  //   console.log(this.timeToString(this.agreementForm.getRawValue().time.start));
  //   console.log(this.timeToString(this.agreementForm.getRawValue().time.end));
  // }

  timeToString(time: any) {
    // 12 hours format
    let timeSplit = time.split(':'),
      hours,
      minutes,
      meridian;
    hours =
      Number(timeSplit[0]) < 10 ? timeSplit[0].substring(1) : timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }

    return `${hours}:${minutes} ${meridian}`;
  }
}
