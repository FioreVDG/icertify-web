import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-proof-of-identity',
  templateUrl: './view-proof-of-identity.component.html',
  styleUrls: ['./view-proof-of-identity.component.scss'],
})
export class ViewProofOfIdentityComponent implements OnInit {
  loading: boolean = true;
  imgObj: any = {};
  reasonVal: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewProofOfIdentityComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      if (this.data.document) {
        this.imgObj = this.data.document.sender?.images;
        if (this.imgObj.cert_of_indigency == 'Empty') {
          delete this.imgObj.cert_of_indigency;
        }
        console.log(this.imgObj);
      }
      if (this.data.document?.sender?.images?.reason_coi) {
        this.reasonVal = this.data.document.sender?.images.reason_coi;
      }
    }
  }
  checkImageBtnDisabler() {
    const disabler = [
      'Review Details',
      'Registrant Information',
      'View Registration Details',
    ];
    if (disabler.includes(this.data.header)) return true;
    else return false;
  }
}
