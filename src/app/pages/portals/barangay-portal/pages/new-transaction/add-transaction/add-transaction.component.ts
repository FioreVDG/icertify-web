import { ActionResultComponent } from './../../../../../../shared/dialogs/action-result/action-result.component';
import { DropboxService } from './../../../../../../service/dropbox/dropbox.service';
import { UploadComponent } from './../../../../../../shared/components/upload/upload.component';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  step: any = 1;
  documentType: string = '';
  docTypes: Array<string> = [
    'Power of Attorney',
    'Medical Documents',
    'Sworn Statements',
    'Affidavits',
    'Deeds',
    'Wills and Trusts',
    'Others',
  ];
  docsArray: Array<any> = [];
  video: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    private dialog: MatDialog,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  eventSelection(event: any) {
    console.log(event);
  }

  upload() {
    console.log(this.docsArray.length);
    if (this.docsArray.length === 3) {
      this.dialog.open(ActionResultComponent, {
        data: {
          msg: 'You can only upload a maximum of 3 files',
          success: false,
          button: 'Okay',
        },
      });
    } else {
      this.dialog
        .open(UploadComponent, {
          data: {
            mobileNumber: this.data.mobileNumber,
          },
          panelClass: 'dialog-darken',
        })
        .afterClosed()
        .subscribe(async (res: any) => {
          console.log(res);
          res.result.document_type = this.documentType;
          let existing: any;

          existing = this.docsArray.find(
            (o: any) => o.documentType === res.result.document_type
          );

          console.log(existing);

          if (existing) {
            console.log(existing);
            this.dialog.open(ActionResultComponent, {
              data: {
                msg: `You already uploaded a file for ${existing.documentType}`,
                success: false,
                button: 'Okay',
              },
            });
          } else {
            this.docsArray.push({
              documentType: res.result.document_type,
              dropbox: res.result,
              link: await this.getTempLink(res.result.path_display),
            });
          }
          setTimeout(() => {
            this.documentType = '';
          }, 500);
          console.log(this.docTypes);
          console.log(this.docsArray);
        });
    }
  }

  uploadVid() {
    this.dialog
      .open(UploadComponent, {
        data: {
          mobileNumber: this.data.mobileNumber,
          format: 'VIDEO',
          name: 'video_signing',
        },
        panelClass: 'dialog-darken',
      })
      .afterClosed()
      .subscribe(async (res: any) => {
        console.log(res);
        this.video = await this.getTempLink(res.result.path_display);
      });
  }

  async getTempLink(data: any) {
    console.log(data);
    const resp = await this.dbx.getTempLink(data).toPromise();
    console.log(resp);
    return resp.result.link;
  }

  submit() {}
}
