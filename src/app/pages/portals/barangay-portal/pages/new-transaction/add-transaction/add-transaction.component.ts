import { TransactionService } from './../../../../../../service/api/transaction/transaction.service';
import { AreYouSureComponent } from './../../../../../../shared/dialogs/are-you-sure/are-you-sure.component';
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
  step: number = 1;
  documentType: string = '';
  docTypes: Array<string> = [
    'Power of Attorney',
    'Medical Records',
    'Sworn Statements',
    'Affidavit',
    'Deeds',
    'Wills and Trusts',
    'Others',
  ];
  docsArray: Array<any> = [];
  video: string = '';
  videoOfSignature: any;
  brgyId: any;
  refCode: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    private dialog: MatDialog,
    private dbx: DropboxService,
    private transaction: TransactionService
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    let tempInfo: any = localStorage.getItem('BARANGAY_INFORMATION');
    console.log(tempInfo);
    this.brgyId = JSON.parse(tempInfo);
    console.log(this.brgyId);
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
              sender: this.data,
              documentName: res.result.name,
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
        this.videoOfSignature = res.result;
      });
  }

  async getTempLink(data: any) {
    console.log(data);
    const resp = await this.dbx.getTempLink(data).toPromise();
    console.log(resp);
    return resp.result.link;
  }

  submit() {
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          others:
            'Clicking Yes will generate the Transaction Reference Code and the reference code for the document you will submit.',
          isOthers: true,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.saveTransaction();
        }
      });
  }

  saveTransaction() {
    let toSaveData: any = {};
    toSaveData.sender = this.data;
    toSaveData.videoOfSignature = this.videoOfSignature;
    toSaveData.documents = this.docsArray;
    toSaveData._brgyId = this.brgyId._id;

    console.log(toSaveData);
    this.transaction.create(toSaveData).subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          this.step = this.step + 1;
          this.refCode = res.env.transaction.refCode;
        }
      },
      (err) => {
        console.log(err);
        this.dialog.open(ActionResultComponent, {
          data: {
            msg: `${err.error.message}` || 'Server error, Please try again',
            success: false,
            button: 'Okay',
          },
        });
      }
    );
  }
}
