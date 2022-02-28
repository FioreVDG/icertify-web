import { AreYouSureComponent } from './../../../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import { ApiService } from './../../../../../../service/api/api.service';
import { CounterComponent } from './../../../../../../shared/dialogs/counter/counter.component';
import { ActionResultComponent } from './../../../../../../shared/dialogs/action-result/action-result.component';
import { QueryParams } from './../../../../../../models/queryparams.interface';
import { RoomService } from './../../../../../../service/api/room/room.service';
import { RegistrantFormComponent } from './../../../../../../shared/components/registrant-form/registrant-form.component';
import { MarkAsNotarizedComponent } from './mark-as-notarized/mark-as-notarized.component';
import { USER_INFO } from './config';
import { DropboxService } from './../../../../../../service/dropbox/dropbox.service';
import { AgoraService } from './../../../../../../service/api/agora/agora.service';
import { ConferenceService } from './../../../../../../service/api/conference/conference.service';
import { UtilService } from 'src/app/service/util/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { WebcamInitError } from 'ngx-webcam';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
// import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';
import { DocumentImageViewerComponent } from 'src/app/shared/dialogs/document-image-viewer/document-image-viewer.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  @ViewChild('screen', { static: false }) screen: any;
  screenshot: any;
  // TODO: Create Interface for Schedule
  // TODO: Create Interface for Folder(Batch)
  // TODO: Create Interface for Transactions
  // TODO: Create Interface for Document

  joinRoom: boolean = false;
  locked: boolean = false;

  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 2048 },
    height: { ideal: 876 },
  };
  id: string = '5f927f9772c9250004a83372';
  uid: string = '';
  token: string = '';
  me!: User;
  currentSchedule: any;
  currentTransactionIndex = -1;
  transactions: any = [];
  currentTransaction: any;
  _images: any = [
    {
      label: '1st Valid Government ID',
      fcname: 'government_ID_1',
    },
    {
      label: '2nd Valid Government ID',
      fcname: 'government_ID_2',
    },
    {
      label: 'Certificate of Indigency',
      fcname: 'cert_of_indigency',
    },
  ];
  userInfo = USER_INFO;
  currentDocument: any;
  currentBatch: any;
  currentRoom: any;

  remoteCallDetails: any = {};
  leaveArr: any = [];

  query: QueryParams = { find: [] };

  constructor(
    public dialogRef: MatDialogRef<RoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackbar: MatSnackBar,
    public util: UtilService,
    private conference: ConferenceService,
    private agora: AgoraService,
    private dbx: DropboxService,
    private socket: Socket,
    private store: Store<{ user: User }>,
    private dialog: MatDialog,
    private room: RoomService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.store.select('user').subscribe((res: any) => {
      this.me = res;
    });
    this.socketEventHandler();
    this.getExpectedParticipants();
    this.checkDocument();
    setInterval(() => {
      this.checkRemainingDocuments();
    }, 1000);
  }

  getExpectedParticipants() {
    let query: any = {
      find: [
        {
          field: '_notaryId',
          operator: '=',
          value: this.me._notaryId,
        },
      ],
    };
    this.conference.getScheduled(query).subscribe((res: any) => {
      console.log(res);
      this.data = res.env.schedules;
      this.data.forEach((schedule: any) => {
        let documentCtr = 0;
        schedule._folderIds.forEach((folder: any) => {
          folder._transactions.forEach((transaction: any, index: any) => {
            transaction.que = index + 1;
            documentCtr += transaction._documents.length;
            transaction._documents.forEach((document: any, index: any) => {
              document.que = index + 1;
            });
          });
        });
        schedule['no_of_documents'] = documentCtr;
      });
      console.log(this.data);
    });
  }

  handleInitError(error: WebcamInitError): void {
    console.log(error);
    this.locked = true;
    if (error.message) {
      this.snackbar.open(error.message, 'OKAY');
    } else {
      this.snackbar.open('Unknown Error.', 'OKAY');
    }
  }

  checkDocument() {
    console.log(this.currentDocument);
  }

  joinMeeting(schedule: any) {
    console.log(schedule);
    this.currentSchedule = schedule;
    console.log(this.currentSchedule._id);
    this.transactions = [];
    this.currentSchedule._folderIds.forEach((folder: any) => {
      folder._transactions.forEach((transaction: any, index: any) => {
        transaction.que = index + 1;
        this.transactions.push(transaction);
        console.log(this.transactions);
        transaction._documents.forEach((document: any, index: any) => {
          document.que = index + 1;
        });
      });
    });
    const loader = this.util.startLoading('Joining please wait...');

    this.agora.getToken(schedule._id).subscribe(
      //need na alisin itong agora token
      (res: any) => {
        if (res) {
          console.log(res);
          this.token = res.token;
          // this.emitJoinRoomSocket(this.data);
          this.getCurrentTransactionQueue(this.transactions);
          this.joinRoom = true;
          this.util.stopLoading(loader);
          console.log(this.transactions);
        }
      },
      (err) => {
        console.log(err);
        this.util.stopLoading(loader);
      }
    );
  }

  //Automatically proceed to current queue transaction
  getCurrentTransactionQueue(transactions: Array<any> = []) {
    console.log(transactions);
    let tempRoom: any;
    let notaryQuery: QueryParams = {
      find: [{ field: '_notaryId', operator: '=', value: this.me._id }],
    };
    console.log(notaryQuery);
    this.room.get(notaryQuery).subscribe(async (res: any) => {
      console.log(res);
      if (res.env.room.length) {
        tempRoom = res.env.room[0];
        this.remoteCallDetails = res.env.room[0].currentTransaction.sender;
        this.currentRoom = res.env.room[0]._id;
        let currentExistingTransaction: any = transactions.find(
          (transaction: any) => transaction.que === tempRoom.que
        );
        if (currentExistingTransaction) {
          this.currentTransaction = currentExistingTransaction;
          this.currentTransactionIndex = currentExistingTransaction.que - 1;
          this.selectDocumentToView(this.currentTransaction._documents[0]);
          this.getImages();
        }
      } else this.nextTransaction();
    });
    console.log(this.currentTransaction);
  }

  emitJoinRoomSocket(data: any) {
    this.socket.emit('createMeeting', { sched: data, id: this.me._id });
  }
  socketEventHandler() {
    this.socket.fromEvent('createdMeeting').subscribe((res: any) => {
      console.log(res);
    });
  }

  checkRemainingDocuments() {
    //TODO EXCLUDE FINISHED NOTARY
    // this.transactions = this.transactions.filter(
    //   (o: any) =>
    //     o._documents[0].documentStatus === 'Pending for Notary' ||
    //     o._documents[0].documentStatus === 'Skipped'
    // );
    // this.transactions = this.transactions.forEach((el:any)=>{
    //   el.
    // })
    console.log(this.transactions);
  }

  nextTransaction() {
    this.currentTransactionIndex++;
    this.initiateTransaction();
  }

  openUserDetails() {
    console.log(this.transactions);
    console.log(this.currentTransactionIndex);
    if (this.currentTransactionIndex === this.transactions.length - 1) {
      this.currentTransactionIndex = -1;
    }
    this.dialog
      .open(RegistrantFormComponent, {
        data: {
          header: 'Review Details',
          obj: this.transactions[this.currentTransactionIndex + 1].sender,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          const loader = this.util.startLoading('Loading details...');

          this.currentTransactionIndex++;
          this.currentTransaction =
            this.transactions[this.currentTransactionIndex];

          //DELETE CURRENT ROOM beofre proceeding to the NEXT TRANSACTION
          let notaryQuery: QueryParams = {
            find: [{ field: '_notaryId', operator: '=', value: this.me._id }],
          };
          this.room.get(notaryQuery).subscribe((res: any) => {
            console.log(res);

            this.util.stopLoading(loader);
            if (res && res.env.room.length) {
              this.currentRoom = res.env.room[0]._id;
              const loader2 = this.util.startLoading(
                'Checking room details...'
              );
              this.room.delete(this.currentRoom).subscribe(
                (res: any) => {
                  console.log(res);
                  delete this.remoteCallDetails;
                  this.initiateTransaction();
                  this.util.stopLoading(loader2);
                },
                (err) => {
                  console.log(err);
                  this.util.stopLoading(loader2);
                }
              );
            }
          });
        }
      });
  }

  prevTransaction() {
    this.currentTransactionIndex--;
    this.initiateTransaction();
  }

  async initiateTransaction() {
    const loader = this.util.startLoading('Initiating room details...');
    this.currentTransaction = this.transactions[this.currentTransactionIndex];

    this.selectDocumentToView(this.currentTransaction._documents[0]);
    this.getImages();

    // FOR ROOM HERE
    let notaryQuery: QueryParams = {
      find: [{ field: '_notaryId', operator: '=', value: this.me._id }],
    };
    console.log(notaryQuery);
    this.room.get(notaryQuery).subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          if (res.env.room.length) {
            this.remoteCallDetails = res.env.room[0].currentTransaction.sender;
            this.currentRoom = res.env.room[0]._id;
          }
          console.log('ITO YUNG EXISTING ROOM', res.env.room);

          this.util.stopLoading(loader);
          if (!res.env.room.length) {
            console.log('WALA PANG EXISTING ROOM');
            console.log(this.remoteCallDetails);
            let roomToAdd: any = {};
            roomToAdd.que = this.currentTransaction.que;
            roomToAdd.currentTransaction = this.currentTransaction;
            roomToAdd.currentSchedId = this.currentSchedule._id;

            const loader2 = this.util.startLoading(
              'Fiinalizing room details...'
            );
            this.room.create(roomToAdd).subscribe(
              (res: any) => {
                console.log(res);
                if (res) {
                  this.util.stopLoading(loader2);
                  this.currentRoom = res.env.room._id;
                  this.remoteCallDetails =
                    res.env.room.currentTransaction.sender;
                  console.log(this.remoteCallDetails);

                  console.log(res);
                  console.log('ITO YUNG BAGONG EXISTING ROOM', res.env.room);
                }
              },
              (err) => {
                console.log(err);
                this.util.stopLoading(loader2);
              }
            );
          }
        }
      },
      (err) => {
        console.log(err);
        this.util.stopLoading(loader);
      }
    );
    console.log(this.currentTransaction);
  }

  imageLoaded(index: number) {
    this._images[index].loaded = true;
  }

  selectDocumentToView(event: any) {
    console.log(event);
    this.currentDocument = event;
  }

  async getImages() {
    this._images.forEach(async (image: any) => {
      if (
        this.currentTransaction.sender.images &&
        this.currentTransaction.sender.images[image.fcname]
      )
        image.url = await this.getTempLink(
          this.currentTransaction.sender.images[image.fcname].path_display
        );
      else delete image.url;
    });
    if (this.currentTransaction.videoOfSignature.path_display)
      this.currentTransaction.vidURL = await this.getTempLink(
        this.currentTransaction.videoOfSignature.path_display
      );
    else delete this.currentTransaction.vidURL;

    console.log('CHECK THIS', this._images);
  }

  initiateCounter() {
    this.dialog
      .open(CounterComponent, {
        data: { ctr: 3 },
        panelClass: 'dialog-transparent',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.takeScreenshot();
        }
      });
  }

  skipDocument() {
    console.log(this.currentDocument);
    this.dialog
      .open(AreYouSureComponent, {
        data: { msg: 'skip this document', isOthers: true },
      })
      .afterClosed()
      .subscribe((resp: any) => {
        if (resp) {
          this.api.document
            .skip(this.currentDocument, this.currentDocument._id)
            .subscribe(
              (response: any) => {
                console.log(response);
                if (response) {
                  this.dialog
                    .open(ActionResultComponent, {
                      data: {
                        msg: `Document ${this.currentDocument.refCode}  has been skipped!`,
                        success: true,
                        button: 'Okay',
                      },
                    })
                    .afterClosed()
                    .subscribe((res: any) => {
                      if (res) {
                        this.currentDocument.documentStatus =
                          response.env.document.documentStatus;
                        console.log(this.currentDocument);
                        console.log(this.currentTransaction);
                      }
                    });
                }
              },
              (err) => {
                console.log(err);
                this.dialog.open(ActionResultComponent, {
                  data: {
                    msg: err.error.message || 'Server Error! Please try again',
                    success: true,
                    button: 'Okay',
                  },
                });
              }
            );
        }
      });
  }

  takeScreenshot() {
    const loader = this.util.startLoading('Getting image ready...');
    html2canvas(document.getElementById('screen') || document.body).then(
      (canvas) => {
        // Convert the canvas to blob
        this.screenshot = canvas.toDataURL('image/png');
        this.util.stopLoading(loader);
        this.openNotarizeDialog('Notarized');
      }
    );
  }

  openNotarizeDialog(type: string) {
    this.dialog
      .open(MarkAsNotarizedComponent, {
        data: {
          document: this.currentDocument,
          screenshot: this.screenshot,
          transaction: this.currentTransaction,
          type: type,
        },
        minWidth: '45vw',
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          console.log(this.currentDocument);
          this.currentDocument.documentStatus = res.data;
        }
      });
  }

  checkDocumentStatus() {
    let filtPending: any = this.currentTransaction?._documents.filter(
      (o: any) => o.documentStatus === 'Pending for Notary'
    );
    if (filtPending?.length) return true;
    else return false;
  }

  checkDocumentStatus2() {
    let filtPending: any = this.currentTransaction?._documents.filter(
      (o: any) => o.documentStatus === 'Pending for Notary'
    );
    let filtSkip: any = this.currentTransaction?._documents.filter(
      (o: any) => o.documentStatus === 'Skipped'
    );
    if (filtPending?.length || filtSkip?.length) return true;
    else return false;
  }

  showSkipBtn() {
    let filtSkip: any = this.currentTransaction?._documents.filter(
      (o: any) => o.documentStatus === 'Skipped'
    );
    if (filtSkip?.length) return true;
    else return false;
  }

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx
      .getTempLink(data)
      .toPromise()
      .catch((err: any) => {
        console.log(err);
      });
    console.log(response);
    return response.result.link;
  }

  leaveMeeting(event: any) {
    console.log(event);
    console.log(this.me.type);
    const loader = this.util.startLoading('Leaving...');
    console.log(this.currentRoom);
    this.room.delete(this.currentRoom).subscribe(
      (res: any) => {
        console.log(res);
        this.util.stopLoading(loader);
        this.dialogRef.close(true);
      },
      (err) => {
        console.log(err);
        this.util.stopLoading(loader);
        this.dialog.open(ActionResultComponent, {
          data: {
            msg: err.error.message || 'Server Error, Please try again!',
            success: false,
            button: 'Okay',
          },
        });
      }
    );
  }

  expandImg(event: string) {
    console.log(event);
    this.dialog.open(DocumentImageViewerComponent, {
      data: event,
      panelClass: 'dialog-transparent',
    });
  }
}
