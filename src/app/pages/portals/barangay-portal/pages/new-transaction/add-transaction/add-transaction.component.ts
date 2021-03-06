import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
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
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit {
  step: number = 1;
  curDocType: string = '';
  documentType: string = '';
  others: string = '';
  docTypes: Array<string> = [
    'Special Power of Attorney (SPA)',
    'Affidavit',
    'Brgy. Compromise Agreement',
    'Quitclaim',
    'Others',
  ];
  docsArray: Array<any> = [];
  video: string = '';
  videoOfSignature: any;
  brgyId: any;
  refCode: any;
  docs: Array<any> = [];
  notaryName: string = '';
  me: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    private dialog: MatDialog,
    private dbx: DropboxService,
    private transaction: TransactionService,
    private util: UtilService,
    private api: ApiService,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    let tempInfo: any = localStorage.getItem('BARANGAY_INFORMATION');
    console.log(tempInfo);
    this.brgyId = JSON.parse(tempInfo);
    console.log(this.brgyId);

    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      if (!this.notaryName) {
        this.api.cluster
          .getOne(this.me._barangay.brgyCode)
          .subscribe((res: any) => {
            console.log(res);
            this.notaryName = `Atty. ${res.env.cluster._notaryId.firstName} ${res.env.cluster._notaryId.lastName}`;
          });
      }
    });
  }

  eventSelection(event: any) {
    this.data.curDocType = event;
  }

  closeDialog() {
    if (this.docsArray.length) {
      this.dialog
        .open(AreYouSureComponent, {
          data: { msg: 'cancel adding new transaction', isOthers: true },
        })
        .afterClosed()
        .subscribe((res: any) => {
          if (res) this.dialogRef.close();
        });
    } else this.dialogRef.close();
  }

  formatName() {
    let formattedName = '';
    let fullName = this.data.firstName + '_' + this.data.lastName;
    let date = new Date().toISOString().replace(/T.*/, '').split('-').join('-');
    let time = Date.now();
    let docTypeSpecific = this.others !== '' ? `(${this.others})` : '';

    formattedName =
      fullName +
      '_' +
      this.data.curDocType +
      docTypeSpecific +
      '_' +
      date +
      '_' +
      time;
    return formattedName;
  }

  upload() {
    console.log(this.docsArray.length);
    if (this.docsArray.length === 1) {
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
            name: this.formatName(),
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
              name: res.result.name,
              fileExtension: res.result.name.split('.')[1],
              dropbox: res.result,
              documentTypeSpecific: this.others,
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

  deleteDoc(doc: any) {
    console.log(doc);
    this.dialog
      .open(AreYouSureComponent, {
        data: { msg: `remove ${doc.documentType}`, isDelete: true },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.docsArray = this.docsArray.filter(
            (o: any) => o.documentType !== doc.documentType
          );
        }
      });
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
        if (res) {
          this.video = '';
          this.video = await this.getTempLink(res.result.path_display);
          this.videoOfSignature = res.result;
          console.log(this.video);
        }
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
    if (!this.data.images.cert_of_indigency)
      toSaveData.sender.images.delayedCOI = true;
    toSaveData.sender._senderId = this.data._id;
    toSaveData.videoOfSignature = this.videoOfSignature;
    toSaveData.documents = this.docsArray;
    toSaveData._barangay = this.brgyId._barangay;
    toSaveData._senderId = this.data._id;

    console.log(toSaveData);
    const loader = this.util.startLoading();
    this.transaction.create(toSaveData).subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          this.step = this.step + 1;
          this.refCode = res.env.transaction.refCode;
          this.docs = res.env.documents;

          this.dialog.open(ActionResultComponent, {
            data: {
              msg: `${this.refCode} successfully submitted!`,
              success: true,
              button: 'Okay',
            },
          });
          console.log(this.docs[0]);
          let smsData = {
            mobileNumber: `+63${this.data.mobileNumber}`,
            message: this.messageFormat(this.docs[0]),
          };

          //FOR DOCUMENT LOGS
          let docLogs: any = {};
          this.docsArray[0]._documentId = res.env.documents[0]._id;
          this.docsArray[0].refCode = res.env.transaction.refCode;
          console.log(this.docsArray[0]);
          docLogs.docDetails = this.docsArray[0];
          docLogs.message = 'Received by Brgy Hall Staff';
          docLogs._barangay = res.env.transaction._barangay;
          this.api.documentlogs.createDocumentLogs(docLogs).subscribe(
            (res: any) => {
              console.log(res);

              this.api.sms.send(smsData).subscribe(
                (res) => {
                  console.log(res);
                  this.util.stopLoading(loader);
                },
                (err) => {
                  console.log(err);
                  this.util.stopLoading(loader);
                }
              );
            },
            (err) => console.log(err)
          );
        }
      },
      (err) => {
        console.log(err);
        this.util.stopLoading(loader);
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

  messageFormat(document: any) {
    return `iCertify Successful Transaction\n\nGood day ${
      document.sender.firstName
    },\nThe document you submmitted has been succesfully received on ${new Date(
      document.createdAt
    ).toLocaleString()}.\n\nYour Document reference code is ${
      document.refCode
    }\nPlease wait for the schedule  of your videoconference with ${
      this.notaryName
    } as part of the RON process of the document that you have submitted.\n\nYou can track your document through this link: http://www.trackmydocument.com\n\nFor more information, contact iCertify: 09123456789 Thank you. `;
  }
}
