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
import { AnyFn } from '@ngrx/store/src/selector';
import { Cluster } from 'src/app/models/cluster.interface';
import { skip } from 'rxjs/operators';

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
  transactionCount: any;
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
  remainingDocsChecker: any;
  showOverlay: boolean = false;
  settings: any;

  expectedStart: any;
  expectedStartE: any;
  actualStart: any;
  isIndigentJoined: boolean = false;
  nextIndigent: any;
  notarialStatus: any;
  allowance = 180;
  runningDuration: number = 0;
  runningDurInterval: any;
  skipDelay = 10;
  skipDisabled = true;
  skipCount = 0;

  constructor(
    public dialogRef: MatDialogRef<RoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackbar: MatSnackBar,
    public util: UtilService,
    private conference: ConferenceService,
    private agora: AgoraService,
    private dbx: DropboxService,
    private socket: Socket,
    private cluster: Store<{ cluster: Cluster }>,
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
    this.cluster.select('cluster').subscribe((res: Cluster) => {
      this.settings = res;
      this.socketEventHandler();
      this.getExpectedParticipants();
      this.checkDocument();
    });

    this.remainingDocsChecker = setInterval(() => {
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
    this.createSocketRoom();
    console.log(schedule);
    this.currentSchedule = schedule;
    console.log(this.currentSchedule._id);
    this.transactions = [];
    this.currentSchedule._folderIds.forEach((folder: any) => {
      folder._transactions.forEach((transaction: any, index: any) => {
        transaction.que = index + 1;
        this.transactions.push(transaction);
        console.log(this.transactions);
        if (transaction._documents[0].documentStatus === 'Skipped') {
          this.skipCount += 1;
        }
        transaction._documents.forEach((document: any, index: any) => {
          document.que = index + 1;
        });
      });
    });

    this.transactionCount = this.transactions.length;
    console.log(this.transactionCount);
    const loader = this.util.startLoading('Joining please wait...');
    this.getCurrentTransactionQueue(this.transactions);
    setTimeout(() => {
      this.util.stopLoading(loader);
      this.joinRoom = true;
    }, 1500);
  }

  createSocketRoom() {
    this.socket.emit('createRoom', this.me);
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
        console.log(tempRoom);
        this.remoteCallDetails = res.env.room[0].currentTransaction.sender;
        this.currentRoom = res.env.room[0]._id;
        console.log(this.currentRoom);
        let currentExistingTransaction: any = transactions.find(
          (transaction: any) =>
            transaction._documents[0].queue ===
            tempRoom.currentTransaction._documents[0].queue
        );
        if (currentExistingTransaction) {
          console.log(currentExistingTransaction);
          this.currentTransaction = currentExistingTransaction;
          this.currentTransactionIndex =
            parseInt(currentExistingTransaction._documents[0].queue) - 1;
          console.log(this.currentTransactionIndex);
          // this.checkScheduleTime();
          this.selectDocumentToView(this.currentTransaction._documents[0]);
          this.getImages();
          this.initDates();
        }
      } else this.nextTransaction();
    });
    console.log(this.currentTransaction);
  }

  setIndigentJoinDate() {
    this.isIndigentJoined = true;
    console.log('JOINEDDDDDDDDDDDDDD');
  }

  initDates() {
    this.showSkipBtn();
    let duration = 0;

    this.settings.barangays.forEach((el: any) => {
      if (
        el._barangay.brgyCode === this.currentTransaction._barangay.brgyCode
      ) {
        duration = el.duration * 60;
      }
    });

    this.runningDuration = 0;
    this.expectedStart =
      new Date(this.currentTransaction._documents[0].schedule).getTime() / 1000;
    this.expectedStartE = this.expectedStart + this.allowance;
    if (
      parseInt(this.currentTransaction._documents[0].queue) ===
        this.transactionCount ||
      this.currentTransaction._documents[0].documentStatus !==
        'Pending for Notary'
    ) {
      if (this.skipCount > 0) {
        if (
          this.currentDocument.documentStatus === 'Skipped' &&
          this.skipCount === 1
        ) {
          this.nextIndigent = 'N/A';
        } else {
          this.nextIndigent = 'Skipped';
        }
      } else this.nextIndigent = 'N/A';
    } else {
      this.nextIndigent = this.expectedStart + duration;
    }

    if (this.runningDurInterval) clearInterval(this.runningDurInterval);
    console.log(
      this.currentTransaction._documents[0].queue,
      this.transactionCount
    );
    console.log(this.currentTransaction._documents[0].documentStatus);
    console.log('ASDASDSADAASDSADASDASD: ' + this.nextIndigent);

    this.runTimer();
  }

  runTimer() {
    this.runningDurInterval = setInterval(() => {
      this.runningDuration += 1;

      if (!this.isIndigentJoined) {
        this.actualStart = Date.now() / 1000;
        let currTime = this.actualStart;
        if (currTime > this.expectedStartE) {
          this.notarialStatus = 'Delay';
        } else if (
          currTime >= this.expectedStart &&
          currTime <= this.expectedStartE
        ) {
          this.notarialStatus = 'On Time';
        } else if (currTime < this.expectedStart) {
          this.notarialStatus = 'Early';
        }
      }
      console.log(this.runningDuration);
      // console.log('DURATION: ', this.runningDuration);
      // console.log('EXPECTEDSTART: ', this.expectedStart);
      // console.log('NEXT INDIGENT:', this.nextIndigent);
      // if (this.notarialStatus) {
      //   console.log('STATUS:', this.notarialStatus);

      //   console.log('ACTUALSTART: ', this.actualStart);
      // }
    }, 1000);
    // setTimeout(() => {
    //   if (!this.stopTimer) this.runTimer();
    // }, 1000);
  }

  emitJoinRoomSocket(data: any) {
    this.socket.emit('createMeeting', { sched: data, id: this.me._id });
  }
  socketEventHandler() {
    this.socket.fromEvent('createdMeeting').subscribe((res: any) => {
      console.log(res);
    });
    this.socket.fromEvent('triggerScreenshot').subscribe((res: any) => {
      console.log('TRIGGER SCREENSHOT');
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
    });
  }

  checkRemainingDocuments() {
    if (this.joinRoom) {
      let transactionsTemp: any = this.transactions.filter(
        (o: any) =>
          o._documents[0].documentStatus === 'Pending for Notary' ||
          o._documents[0].documentStatus === 'Skipped'
      );
      // console.log(this.currentTransaction);

      if (!transactionsTemp.length) {
        clearInterval(this.remainingDocsChecker);
        this.dialog
          .open(ActionResultComponent, {
            disableClose: true,
            data: {
              msg: 'You have been successfully finished notarizing/unnotarizing documents. Click Leave Now button to end this meeting',
              success: true,
              isOthers: true,
              button: 'Leave Now',
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            console.log(res);
            if (res) {
              this.leaveMeeting('');
            }
          });
      }
      // console.log(this.transactions);
    }
  }

  nextTransaction() {
    this.currentTransactionIndex++;
    this.initiateTransaction();
  }

  openUserDetails() {
    let transactionAdvance: any;
    if (this.currentTransactionIndex !== this.transactions.length - 1)
      transactionAdvance = this.transactions[this.currentTransactionIndex + 1];
    console.log(transactionAdvance);
    console.log(transactionAdvance?._documents[0]?.documentStatus);
    console.log(this.transactions);
    console.log(this.currentTransactionIndex);
    console.log(this.currentTransaction);
    if (this.currentTransactionIndex === this.transactions.length - 1) {
      this.currentTransactionIndex = -1;
      console.log(this.transactions);
    }
    let tempStatus: any = ['Notarized', 'Unnotarized'];
    if (
      tempStatus.includes(transactionAdvance?._documents[0]?.documentStatus)
    ) {
      console.log('tapos na to poooooootang inaaaaaaaaaaaaa');
      this.nextTransaction();
    } else
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
    //CURRENT TRANSACTION HEREEEEEEEEEEEE
    console.log(this.currentTransaction);
    // this.checkScheduleTime();
    this.isIndigentJoined = false;
    this.selectDocumentToView(this.currentTransaction._documents[0]);
    this.getImages();
    this.initDates();

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
      ) {
        image.url = await this.getTempLink(
          this.currentTransaction.sender.images[image.fcname].path_display
        );
      } else {
        delete image.url;
      }

      if (
        image.fcname === 'cert_of_indigency' &&
        this.currentTransaction.sender.images.reason_coi
      ) {
        delete image.url;
        image.loaded = true;
        image.reason_coi = this.currentTransaction.sender.images.reason_coi;
      } else {
        delete image.reason_coi;
      }
    });
    if (this.currentTransaction.videoOfSignature.path_display)
      this.currentTransaction.vidURL = await this.getTempLink(
        this.currentTransaction.videoOfSignature.path_display
      );
    else delete this.currentTransaction.vidURL;

    console.log('CHECK THIS', this._images);
  }

  initiateCounter() {
    this.socket.emit('takeScreenshot', this.me);
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
          this.api.document.skip({}, this.currentDocument._id).subscribe(
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
                      this.isIndigentJoined = false;

                      clearInterval(this.runningDurInterval);
                      this.skipCount += 1;
                      this.actualStart = undefined;
                      this.notarialStatus = undefined;
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
          // this.stopTimer = true;
          clearInterval(this.runningDurInterval);

          this.actualStart = undefined;
          this.notarialStatus = undefined;
          if (this.currentDocument.documentStatus === 'Skipped') {
            this.skipCount -= 1;
          }
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
    if (filtSkip?.length) {
      this.skipDisabled = true;
      this.skipDelay = 0;
    } else {
      this.skipDelay = 10;
      this.skipDisabled = true;

      let interval = setInterval(() => {
        this.skipDelay -= 1;
        if (this.skipDelay <= 0) {
          clearInterval(interval);
          this.skipDisabled = false;
        }
      }, 1000);
    }
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
    // let findFinished: any = this.transactions.filter((el: any) => {
    //   return (el.transactionStatus = 'Pending');
    // });
    this.isIndigentJoined = false;
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
      console.log(this.currentSchedule);
      let getCurrentSchedTemp: any = res.env.schedules.find(
        (o: any) => o._id === this.currentSchedule._id
      );
      console.log(getCurrentSchedTemp);
      if (getCurrentSchedTemp?.conferenceStatus === 'Pending') {
        this.dialogRef.close(true);
        this.util.stopLoading(loader);
        clearInterval(this.runningDurInterval);
        this.skipCount = 0;
        this.actualStart = undefined;
        this.notarialStatus = undefined;
      } else {
        this.room.delete(this.currentRoom).subscribe(
          (res: any) => {
            console.log(res);
            this.util.stopLoading(loader);
            this.dialogRef.close(true);
            clearInterval(this.runningDurInterval);
            this.skipCount = 0;

            this.actualStart = undefined;
            this.notarialStatus = undefined;
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
    });

    // if (findFinished.length) {
    //   this.dialogRef.close(true);
    //   this.util.stopLoading(loader);
    // } else {
    //   this.room.delete(this.currentRoom).subscribe(
    //     (res: any) => {
    //       console.log(res);
    //       this.util.stopLoading(loader);
    //       this.dialogRef.close(true);
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.util.stopLoading(loader);
    //       this.dialog.open(ActionResultComponent, {
    //         data: {
    //           msg: err.error.message || 'Server Error, Please try again!',
    //           success: false,
    //           button: 'Okay',
    //         },
    //       });
    //     }
    //   );
    // }
  }

  expandImg(event: string) {
    console.log(event);
    this.dialog.open(DocumentImageViewerComponent, {
      data: event,
      panelClass: 'dialog-transparent',
    });
  }
  // ngOnDestroy() {
  //   this.socket.removeAllListeners('triggerScreenshot');
  // }
}
