import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { UploadNotirizedDocumentComponent } from 'src/app/pages/portals/notary-portal/pages/uploading-notarized-document/upload-notirized-document/upload-notirized-document.component';
import { ApiService } from 'src/app/service/api/api.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { UploadComponent } from 'src/app/shared/components/upload/upload.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';

@Component({
  selector: 'app-upload-cert-of-indigency',
  templateUrl: './upload-cert-of-indigency.component.html',
  styleUrls: ['./upload-cert-of-indigency.component.scss'],
})
export class UploadCertOfIndigencyComponent implements OnInit {
  uploading: boolean = false;
  me: any;
  toUploadCOI: any;
  imageChecker = ['png', 'jpeg', 'jpg'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadNotirizedDocumentComponent>,
    private dialog: MatDialog,
    private dbx: DropboxService,
    private api: ApiService,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
    });
  }

  uploadFile() {
    this.dialog
      .open(UploadComponent, {
        data: {
          name: 'cert_of_indigency',
          path: 'INDIGENT/',
          mobileNumber: this.data.obj.mobileNumber,
        },
        panelClass: 'dialog-darken',
      })
      .afterClosed()
      .subscribe(async (res: any) => {
        console.log(res);
        this.toUploadCOI = res.result;
        let name = res.result.name.split('.');
        this.dbx.getTempLink(res.result.path_display).subscribe((res: any) => {
          this.toUploadCOI['link'] = res.result.link;
          this.toUploadCOI['isImage'] = this.imageChecker.includes(
            name[name.length - 1]
          )
            ? true
            : false;
        });
        console.log(this.toUploadCOI);
      });
  }

  onSave() {
    this.uploading = true;
    let toSaveData = JSON.parse(JSON.stringify(this.data.obj));
    toSaveData.images.cert_of_indigency = this.toUploadCOI;
    if (toSaveData.images.reason_coi) delete toSaveData.images.reason_coi;
    // console.log(toSaveData);
    this.api.user
      .updateIndigent(this.data.obj._id, toSaveData)
      .subscribe((res: any) => {
        console.log(res);
        const id = res.env.user._id;
        this.api.document.updateSenderImages(id).subscribe((res) => {
          this.uploading = false;
          console.log(res);
          this.dialog
            .open(ActionResultComponent, {
              data: {
                msg: 'Certificate of Indigency successfully uploaded!',
                success: true,
                button: 'Okay',
              },
            })
            .afterClosed()
            .subscribe((res: any) => {
              if (res) this.dialogRef.close(true);
            });
        });
      });
  }
}
