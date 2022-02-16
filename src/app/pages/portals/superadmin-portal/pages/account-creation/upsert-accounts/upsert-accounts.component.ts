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

  backBtnLogic() {
    let temp: any = this.data.header;
    if (temp === 'iCertify Admin' && this.data.step === 2)
      this.dialogRef.close();
    else if (temp === 'Barangay Hall' && this.data.step === 1)
      this.dialogRef.close();
    else if (temp === 'Notary') this.dialogRef.close();
    else if (temp === 'QC Legal Department' && this.data.step === 3)
      this.dialogRef.close();
    else this.data.step = this.data.step - 1;
  }
}
