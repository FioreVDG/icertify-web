import { ApiService } from 'src/app/service/api/api.service';
import { ActionResultComponent } from './../../../../../../../shared/dialogs/action-result/action-result.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from './../../../../../../../service/util/util.service';
import { DropboxService } from './../../../../../../../service/dropbox/dropbox.service';
import { DocumentService } from './../../../../../../../service/api/document/document.service';
import { AreYouSureComponent } from './../../../../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mark-as-notarized',
  templateUrl: './mark-as-notarized.component.html',
  styleUrls: ['./mark-as-notarized.component.scss'],
})
export class MarkAsNotarizedComponent implements OnInit {
  status: string = '';
  remark: string = '';
  remarksArr: Array<string> = [
    'Principal Nonappearance',
    'Failed KYC',
    'Others',
  ];
  others: string = '';
  path: string = '/ICertify/INDIGENT/Screenshots/';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MarkAsNotarizedComponent>,
    private dialog: MatDialog,
    private document: DocumentService,
    private dbx: DropboxService,
    private util: UtilService,
    private sb: MatSnackBar,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  markDocument(event: any) {
    console.log(event);
    let msg: string =
      this.data.type === 'Notarized'
        ? `you want to notarized ${event.refCode}`
        : `you want to mark as unnotarized ${event.refCode}`;
    if (this.data.type)
      this.dialog
        .open(AreYouSureComponent, {
          data: { msg: msg, isOthers: true },
        })
        .afterClosed()
        .subscribe((res: any) => {
          if (res) this.changeDocumentStatus(event);
        });
  }

  changeDocumentStatus(event: any) {
    console.log(event);
    if (this.data.type === 'Notarized') {
      const loader = this.util.startLoading('Confirming Please wait...');
      //UPLOADING TO DBX
      console.log(this.data.screenshot);
      let imgBlob = this.dataURItoBlob(this.data.screenshot.split(',')[1]);
      console.log(imgBlob);
      let fileName: any = event.refCode + '-' + event._id;
      this.dbx.uploadFile(this.path, fileName + '.png', imgBlob).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.sb.open('File Successfully Uploaded!', undefined, {
              panelClass: ['success'],
              duration: 1000,
            });
            event.screenShots = [res.result];
            console.log(event);
            this.document.notarize(event, event._id).subscribe((res: any) => {
              console.log(res);
              if (res) {
                let docLogs: any = {};
                let docIds: any = [];
                docLogs.docDetails = this.data.document;
                docLogs.message = 'Marked as Notarized';
                docLogs._barangay = this.data.document._barangay;
                docIds.push(this.data.document._id);
                this.api.documentlogs.createDocumentLogs(docLogs).subscribe(
                  (res: any) => {
                    console.log(res);
                  },
                  (err) => {
                    console.log(err);
                  }
                );
                let apiQueries = docIds.map((id: any) => {
                  return this.api.document.update(
                    {
                      documentLogStatus: 'Marked as Notarized',
                    },
                    id
                  );
                });
                forkJoin(apiQueries).subscribe(
                  (res: any) => {
                    console.log(res);
                  },
                  (err: any) => {
                    console.log(err);
                  }
                );
                this.util.stopLoading(loader);
                this.dialog
                  .open(ActionResultComponent, {
                    data: {
                      msg: `${event.refCode} successfully marked as notarized!`,
                      success: true,
                      button: 'Okay',
                    },
                  })
                  .afterClosed()
                  .subscribe(
                    (res: any) => {
                      if (res) this.dialogRef.close({ data: 'Notarized' });
                    },
                    (err) => {
                      console.log(err);
                      this.util.stopLoading(loader);
                      this.dialog.open(ActionResultComponent, {
                        data: {
                          msg:
                            err.error.message ||
                            'Server error, Please try again!',
                          success: false,
                          button: 'Okay',
                        },
                      });
                    }
                  );
              }
            });
          }
        },
        (err) => {
          console.log(err);
          this.sb.open('Failed to Upload File.', undefined, {
            panelClass: ['failed'],
            duration: 1500,
          });
          this.util.stopLoading(loader);
        }
      );
    } else {
      const loader = this.util.startLoading('Confirming Please wait...');
      event.remark = this.others ? this.others : this.remark;
      this.document.unnotarize(event, event._id).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            let docLogs: any = {};
            let docIds: any = [];
            docLogs.docDetails = this.data.document;
            docLogs.message = 'Marked as Unnotarized';
            docLogs._barangay = this.data.document._barangay;
            docIds.push(this.data.document._id);
            this.api.documentlogs.createDocumentLogs(docLogs).subscribe(
              (res: any) => {
                console.log(res);
              },
              (err) => {
                console.log(err);
              }
            );
            let apiQueries = docIds.map((id: any) => {
              return this.api.document.update(
                {
                  documentLogStatus: 'Marked as Unnotarized',
                },
                id
              );
            });
            forkJoin(apiQueries).subscribe(
              (res: any) => {
                console.log(res);
              },
              (err: any) => {
                console.log(err);
              }
            );
            this.util.stopLoading(loader);
            this.dialog
              .open(ActionResultComponent, {
                data: {
                  msg: `${event.refCode} successfully marked as Unnotarized!`,
                  success: true,
                  button: 'Okay',
                },
              })
              .afterClosed()
              .subscribe((res: any) => {
                if (res) this.dialogRef.close({ data: 'Unnotarized' });
              });
          }
        },
        (err) => {
          console.log(err);
          this.util.stopLoading(loader);
          this.dialog.open(ActionResultComponent, {
            data: {
              msg: err.error.message || 'Server error, Please try again!',
              success: false,
              button: 'Okay',
            },
          });
        }
      );
    }
  }
  //CONVERT BASE 64 to blob
  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }
}
