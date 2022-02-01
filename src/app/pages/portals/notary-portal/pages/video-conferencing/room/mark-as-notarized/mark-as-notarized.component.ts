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
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  markAsNotarized(event: any) {
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
    if (this.data.type === 'Notarized') {
      const loader = this.util.startLoading('Confirming... Please wait');
      let tempFile: any = this.data.screenshot.split(',')[1];
      let fileName: any = event.refCode + '-' + event._id;
      this.dbx.uploadFile(this.path, fileName + '.png', tempFile).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
            this.sb.open('File Successfully Uploaded!', undefined, {
              panelClass: ['success'],
              duration: 1000,
            });
            event.documentStatus = 'Notarized';
            event.screenShots = [res.result];
            console.log(event);
            this.document.update(event, event._id).subscribe(
              (res: any) => {
                console.log(res);
                if (res) {
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
                    .subscribe((res: any) => {
                      if (res) this.dialogRef.close();
                    });
                }
              },
              (err) => {
                console.log(res);
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
      const loader = this.util.startLoading('Confirming... Please wait');
      event.documentStatus = 'Unnotarized';
      event.remark = this.others ? this.others : this.remark;
      this.document.update(event, event._id).subscribe(
        (res: any) => {
          console.log(res);
          if (res) {
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
                if (res) this.dialogRef.close();
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
}
