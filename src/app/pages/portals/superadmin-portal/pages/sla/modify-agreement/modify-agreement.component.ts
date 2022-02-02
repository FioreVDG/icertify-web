import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  // TODO: Create interface of agreement
  agreements: Array<any> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}

  pushToAgreements() {
    this.agreements.push(this.agreementForm.getRawValue());
  }

  removeFromAgreements(i: number) {
    this.agreements.splice(i, 1);
  }

  onSubmit() {
    console.log(this.timeToString(this.agreementForm.getRawValue().time.start));
    console.log(this.timeToString(this.agreementForm.getRawValue().time.end));
  }

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
