import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-proof-of-identity',
  templateUrl: './view-proof-of-identity.component.html',
  styleUrls: ['./view-proof-of-identity.component.scss'],
})
export class ViewProofOfIdentityComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewProofOfIdentityComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
