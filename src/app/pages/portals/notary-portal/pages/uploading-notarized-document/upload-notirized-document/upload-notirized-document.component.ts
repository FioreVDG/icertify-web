import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UploadComponent } from 'src/app/shared/components/upload/upload.component';

@Component({
  selector: 'app-upload-notirized-document',
  templateUrl: './upload-notirized-document.component.html',
  styleUrls: ['./upload-notirized-document.component.scss'],
})
export class UploadNotirizedDocumentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadNotirizedDocumentComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  test() {
    this.dialog
      .open(UploadComponent, {
        data: {
          name: '',
          path: 'INDIGENT/',
        },
        panelClass: 'dialog-darken',
      })
      .afterClosed()
      .subscribe(async (res: any) => {
        console.log(res);
      });
  }
}
