import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-upsert-accounts',
  templateUrl: './upsert-accounts.component.html',
  styleUrls: ['./upsert-accounts.component.scss'],
})
export class UpsertAccountsComponent implements OnInit {
  isFormValid: boolean = false;
  hasSelected: boolean = false;
  brgyDetails: any;
  referenceValue: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpsertAccountsComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  selectBrgy(event: any) {
    console.log(event);
    this.brgyDetails = event.event;
    this.isFormValid = event.isValid;
  }

  selectVal(event: any) {
    console.log(event);
    this.hasSelected = event.isDirty;
    this.referenceValue = event.value;
  }
}
