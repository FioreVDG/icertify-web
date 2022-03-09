import { ActionResultComponent } from './../../../../../../shared/dialogs/action-result/action-result.component';
import { ApiService } from 'src/app/service/api/api.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UploadComponent } from 'src/app/shared/components/upload/upload.component';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-upload-notirized-document',
  templateUrl: './upload-notirized-document.component.html',
  styleUrls: ['./upload-notirized-document.component.scss'],
})
export class UploadNotirizedDocumentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadNotirizedDocumentComponent>,
    private dialog: MatDialog,
    private dbx: DropboxService,
    private api: ApiService,
    private store: Store<{ user: User }>
  ) {}
  imageChecker = ['png', 'jpeg', 'jpg'];
  toUploadDocument: any;
  uploading: boolean = false;
  me: any;

  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
    });
  }

  selectFile() {
    this.dialog
      .open(UploadComponent, {
        data: {
          name: `${this.data.refCode}_${this.data.sender.lastName}_Notarized`,
          path: `INDIGENT/${this.data.sender.mobileNumber}/Notarized_Document`,
        },
        panelClass: 'dialog-darken',
      })
      .afterClosed()
      .subscribe(async (res: any) => {
        console.log(res);
        this.toUploadDocument = res.result;
        let name = res.result.name.split('.');
        console.log(name[name.length - 1]);
        this.dbx.getTempLink(res.result.path_display).subscribe((res: any) => {
          this.toUploadDocument['link'] = res.result.link;
          this.toUploadDocument['isImage'] = this.imageChecker.includes(
            name[name.length - 1]
          )
            ? true
            : false;
        });
      });
  }
  upload() {
    this.uploading = true;
    this.data['notarizedDocument'] = {
      _uploadedBy: this.me._id,
      dateUploaded: new Date(),
    };
    this.data.notarizedDocument['dropbox'] = this.toUploadDocument;
    this.api.document.notarize(this.data, this.data._id).subscribe(
      (res: any) => {
        console.log(res);
        this.dialog.open(ActionResultComponent, {
          data: {
            success: true,
            msg: 'Upload Successful!',
            button: 'Okay!',
          },
        });
        this.uploading = false;
        this.dialogRef.close(true);
      },
      (err) => {
        this.uploading = false;
        this.dialog.open(ActionResultComponent, {
          data: {
            msg: err.error.message,
          },
        });
      }
    );
  }
}
