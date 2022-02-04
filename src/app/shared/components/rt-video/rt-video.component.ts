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

@Component({
  selector: 'app-rt-video',
  templateUrl: './rt-video.component.html',
  styleUrls: ['./rt-video.component.scss'],
})
export class RtVideoComponent implements OnInit {
  title = 'agorawrtc-demo';
  localCallId = 'agora_local';
  remoteCalls: Array<any> = [];
  @Input() channelName: any;
  @Input() remoteDetails: any;
  @Input() removeArr: Array<any> = [];

  private client!: AgoraClient;
  private localStream!: Stream;
  private token = '';
  public me: any;
  private uid = '';
  // public channelName = '321321321';
  public localAudio = true;
  public localVideo = true;

  @Output() onLeaveMeeting: any = new EventEmitter<any>();
  @Output() removeParticipant: any = new EventEmitter<any>();

  snack: any;
  timeStamp: Date = new Date();
  constructor(
    private ngxAgoraService: NgxAgoraService,
    private api: ApiService,
    private store: Store<{ user: User }>,
    private snackbar: MatSnackBar,
    private socket: Socket,
    private dialog: MatDialog
  ) {
    setInterval(() => {
      this.timeStamp = new Date();
    }, 1);
  }

  ngOnInit(): void {
    console.log(this.channelName);
    this.startConference();
    setInterval(() => {
      console.log(this.remoteCalls);
      console.log(this.remoteDetails);
    }, 3000);
  }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes);
    this.removeOnRemote();
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

  leave() {
    this.client.leave(
      () => {
        this.dialog
          .open(AreYouSureComponent, {
            data: { msg: 'you want to leave', isOthers: true },
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
