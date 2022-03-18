import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { ConferenceService } from './../../../service/api/conference/conference.service';
import { RoomService } from './../../../service/api/room/room.service';
import { MatDialog } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { ApiService } from './../../../service/api/api.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import {
  AgoraClient,
  ClientEvent,
  NgxAgoraService,
  Stream,
  StreamEvent,
} from 'ngx-agora';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreYouSureComponent } from '../../dialogs/are-you-sure/are-you-sure.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rt-video',
  templateUrl: './rt-video.component.html',
  styleUrls: ['./rt-video.component.scss'],
})
export class RtVideoComponent implements OnInit {
  localCallId = 'agora_local';
  remoteCalls: Array<any> = [];
  @Input() channelName: any;
  @Input() remoteDetails: any;
  @Input() removeArr: Array<any> = [];
  @Input() showCounter: any;
  @Input() indigentDetails: any;

  private client!: AgoraClient;
  private localStream!: Stream;
  private token = '';
  public me: any;
  private uid = '';
  public localAudio = true;
  public localVideo = true;

  @Output() setActualDate: any = new EventEmitter<any>();
  @Output() onLeaveMeeting: any = new EventEmitter<any>();
  @Output() kickIndigent: any = new EventEmitter<any>();

  snack: any;
  timeStamp: Date = new Date();
  flagInterval: any;
  constructor(
    private ngxAgoraService: NgxAgoraService,
    private api: ApiService,
    private store: Store<{ user: User }>,
    private snackbar: MatSnackBar,
    private socket: Socket,
    private dialog: MatDialog,
    private room: RoomService,
    private conference: ConferenceService,
    private router: Router
  ) {
    setInterval(() => {
      this.timeStamp = new Date();
    }, 1);
  }

  ngOnInit(): void {
    // console.log(this.channelName);
    // console.log(this.remoteDetails);
    this.startConference();
    this.flagInterval = setInterval(() => {
      this.detailChecker();
    }, 500);
  }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes);
  }

  //CHECK IF TRANSACTION IS DONE...WILL AUTOMATICALLY KICK INDIGENT IF TRANSACTION IS DONE
  detailChecker() {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      // console.log(this.me);
      if (this.me.type !== 'Notary') {
        let settings: any;
        this.api.cluster
          .getOne(this.me._barangay.brgyCode)
          .subscribe((res: any) => {
            if (res) {
              settings = res.env.cluster;
              // console.log(settings);
              let query = {
                find: [
                  {
                    field: '_notaryId',
                    operator: '=',
                    value: settings._notaryId._notaryId,
                  },
                ],
              };
              // console.log(query);
              this.room.get(query).subscribe((res: any) => {
                // console.log(res);
                // console.log(res.env.room[0].currentTransaction);
                let currRoomId: any = res.env.room[0].currentTransaction._id;
                // console.log(currRoomId);
                let querys: any = {
                  find: [
                    {
                      field: '_notaryId',
                      operator: '=',
                      value: settings?._notaryId?._notaryId,
                    },
                  ],
                };
                this.conference.getScheduled(querys).subscribe((resp: any) => {
                  let schedules = resp.env.schedules;
                  // console.log(schedules);
                  if (!schedules.length) {
                    this.leaveNow();
                    clearInterval(this.flagInterval);
                  }
                  // console.log(resp);
                  let findCurrentTransaction: any;
                  let transactions: any = [];

                  schedules.forEach((sched: any) => {
                    // console.log(sched);
                    sched._folderIds.forEach((folder: any) => {
                      // console.log(folder);
                      // transactions = folder._transactions;
                      folder._transactions.forEach((trans: any) => {
                        transactions.push(trans);
                      });
                      // console.log(transactions);
                    });
                  });
                  // console.log(transactions);
                  findCurrentTransaction = transactions.find(
                    (trans: any) => trans._id === currRoomId
                  );
                  if (
                    findCurrentTransaction &&
                    findCurrentTransaction.transactionStatus === 'Done'
                  ) {
                    // console.log(findCurrentTransaction);
                    // console.log(
                    //   'TAPOS NA ITONG TRANSACTION',
                    //   findCurrentTransaction
                    // );
                    clearInterval(this.flagInterval);
                    this.leaveNow();
                  }
                });
              });
            }
          });
      }
    });
  }

  removeOnRemote() {
    this.remoteCalls = [];
    console.log(this.remoteCalls);
  }

  startConference() {
    this.snack = this.snackbar.open('Entering Room...', undefined);
    this.api.agora.getToken(this.channelName).subscribe((res: any) => {
      console.log(
        '][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]',
        res
      );
      if (res) this.token = res.env.token;
      this.store.select('user').subscribe((res: User) => {
        this.me = res;
        console.log(this.me);
        this.uid = res._id;

        this.client = this.ngxAgoraService.createClient({
          mode: 'rtc',
          codec: 'h264',
        });
        this.assignClientHandlers();

        this.localStream = this.ngxAgoraService.createStream({
          streamID: this.uid,
          audio: this.localAudio,
          video: this.localVideo,
          screen: false,
        });
        this.assignLocalStreamHandlers();
        // Join and publish methods added in this step
        this.initLocalStream(() =>
          this.join(
            (uid) => {
              this.publish();
              this.socket.emit('joinMeeting', { data: 'JOINING' });
              this.snack.dismiss();
            },
            (error) => {
              console.error(error);
            }
          )
        );
      });
    });
  }
  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, (evt) => {
      console.log('Publish local stream successfully', evt);
    });

    this.client.on(ClientEvent.Error, (error) => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => {
            console.log('Renewed the channel key successfully.');
          },
          (renewError) => {
            console.error('Renew channel key failed: ', renewError);
          }
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, (evt) => {
      const stream = evt.stream as Stream;
      console.log(
        '[][][][][][][][][][][][][][][][][][][][][][][][][][] Remote Stream added',
        stream
      );
      this.client.subscribe(stream, { audio: true, video: true }, (err) => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, (evt) => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);

      console.log(
        '[][][][][][][][][][][][][][][][][][][][][][][][][][] Remote Stream Subscribed',
        stream
      );
      if (!this.remoteCalls.length) {
        this.setActualDate.emit();
        this.remoteCalls.push({
          id: id,
          hasAudio: true,
          hasVideo: true,
          details: this.remoteDetails,
        });
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, (evt) => {
      console.log(
        '[][][][][][][][][][][][][][][][][][][][][][][][][][] Remote Stream Removed'
      );
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        // this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, (evt) => {
      console.log(
        '[][][][][][][][][][][][][][][][][][][][][][][][][][] PEEER LEAVE'
      );
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(
          (call) => call.id !== `${this.getRemoteId(stream)}`
        );
        console.log(`${evt.uid} left from this channel`);
      }
    });

    //for remote Audio
    this.client.on(ClientEvent.RemoteAudioMuted, (evt) => {
      // console.log('AUDIO MUTED', evt);
      this.remoteCalls.find(
        (o: any) => o.id == `agora_remote-${evt.uid}`
      ).hasAudio = false;
    });

    this.client.on(ClientEvent.RemoteAudioUnmuted, (evt) => {
      // console.log('AUDIO UNMUTED', evt);
      this.remoteCalls.find(
        (o: any) => o.id == `agora_remote-${evt.uid}`
      ).hasAudio = true;
    });
    //end (for remote Audio)

    //for remote Video
    this.client.on(ClientEvent.RemoveVideoMuted, (evt) => {
      console.log('VIDEO MUTED', evt);
      this.remoteCalls.find(
        (o: any) => o.id == `agora_remote-${evt.uid}`
      ).hasVideo = false;
    });
    this.client.on(ClientEvent.RemoteVideoUnmuted, (evt) => {
      console.log('VIDEO UNMUTED', evt);
      this.remoteCalls.find(
        (o: any) => o.id == `agora_remote-${evt.uid}`
      ).hasVideo = true;
    });
    //end (for remote Video)

    //tests
    this.client.on(ClientEvent.VolumeIndicator, (evt) => {
      console.log('TESTESTESTESTESTESTES[][][][][][][][][][][][][][]', evt);
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      // console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      // console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        this.localStream.play(this.localCallId);
        if (onSuccess) {
          onSuccess();
          console.log(this.localStream);
        }
      },
      (err) => {
        // console.error('getUserMedia failed', err);
        this.snack.dismiss();
        this.snackbar.open(
          'Unable to Join. There is error with your video/audio',
          'OK'
        );
      }
    );
  }

  join(
    onSuccess?: (uid: number | string) => void,
    onFailure?: (error: Error) => void
  ): void {
    this.client.join(
      this.token,
      this.channelName,
      this.uid,
      onSuccess,
      onFailure
    );
    console.log(this.client);
    console.log(this.localStream);
  }

  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    this.client.publish(this.localStream, (err) => {
      console.log('Publish local stream error: ' + err);
    });
  }

  leaveNow() {
    clearInterval(this.flagInterval);
    this.client.leave(() => {
      this.localStream.stop();
      // this.localStream.close();
      // this.dialog.open(ActionResultComponent, {
      //   data: {
      //     msg: 'Transaction Completed!',
      //     success: true,
      //     button: 'Okay',
      //   },
      // });
      this.snackbar.open('Your Transaction is Completed!', undefined, {
        panelClass: ['success'],
        duration: 1500,
      });
      this.kickIndigent.emit();
    });
  }

  leave() {
    this.client.leave(
      () => {
        this.dialog
          .open(AreYouSureComponent, {
            data: { msg: 'to leave', isOthers: true },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) {
              this.onLeaveMeeting.emit();
              this.localStream.stop();
              this.localStream.close();
              console.log('Leave channel successfully');
            }
          });
      },
      (err) => {
        console.log('Leave channel failed');
      }
    );
  }

  toggleAudio() {
    if (this.localAudio) {
      this.localStream.muteAudio();
    } else {
      this.localStream.unmuteAudio();
    }
    this.localAudio = !this.localAudio;
    console.log(this.localAudio);
  }
  toggleVideo() {
    if (this.localVideo) {
      this.localStream.muteVideo();
    } else {
      this.localStream.unmuteVideo();
    }
    this.localVideo = !this.localVideo;
    console.log(this.localVideo);
  }
}
