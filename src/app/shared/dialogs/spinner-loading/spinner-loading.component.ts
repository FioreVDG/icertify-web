import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.scss'],
})
export class SpinnerLoadingComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SpinnerLoadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
