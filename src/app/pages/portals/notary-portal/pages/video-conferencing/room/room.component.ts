import { AuthService } from './../../../../../../service/auth/auth.service';
import { AgoraService } from './../../../../../../service/api/agora/agora.service';
import { Populate } from 'src/app/models/queryparams.interface';
import { ConferenceService } from './../../../../../../service/api/conference/conference.service';
import { UtilService } from 'src/app/service/util/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { WebcamInitError } from 'ngx-webcam';
import {
  AgoraClient,
  NgxAgoraService,
  Stream,
  ClientEvent,
  StreamEvent,
} from 'ngx-agora';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  joinRoom: boolean = false;
  locked: boolean = false;

  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 2048 },
    height: { ideal: 876 },
  };
  id: string = '5f927f9772c9250004a83372';
  uid: string = '';
  private client!: AgoraClient;
  public localCallId = 'agora_local';
  public remoteCalls: Array<any> = [];
  public hasAudio = true;
  private localStream!: Stream;

  token: string = '';

  constructor(
    public dialogRef: MatDialogRef<RoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackbar: MatSnackBar,
    public util: UtilService,
    private conference: ConferenceService,
    private agora: AgoraService,
    private ngxAgoraService: NgxAgoraService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.getExpectedParticipants();
  }

  getExpectedParticipants() {
    let query = {
      find: [],
    };
    this.conference.getScheduled(query).subscribe((res: any) => {
      console.log(res);
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

  joinMeeting() {
    const loader = this.util.startLoading('Joining please wait...');
    this.agora.getToken(this.id).subscribe(
      (res: any) => {
        console.log(res);
        this.token = res.token;
        if (res) {
          this.auth.me().subscribe((res: any) => {
            this.uid = res.env.user._id;
            this.util.stopLoading(loader);
            // this.startConference();
            console.log(this.uid);
            this.joinRoom = true;
          });
        }
      },
      (err) => {
        console.log(err);
        this.util.stopLoading(loader);
      }
    );
  }

  startConference() {
    this.client = this.ngxAgoraService.createClient({
      mode: 'rtc',
      codec: 'h264',
    });
    this.assignClientHandlers();
    this.localStream = this.ngxAgoraService.createStream({
      streamID: this.uid,
      audio: true,
      video: true,
      screen: false,
    });

    this.assignLocalStreamHandlers();
    this.initLocalStream(() =>
      this.join(
        (uid) => {
          this.publish();
        },
        (error) => {
          console.error(error);
          // this.rejoin();
        }
      )
    );
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, (evt) => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, (error) => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          (renewError) =>
            console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, (evt) => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, (err) => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, (evt) => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, (evt) => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, (evt) => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(
          (call) => call !== `${this.getRemoteId(stream)}`
        );
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        this.localStream.play(this.localCallId);
        if (onSuccess) {
          onSuccess();
        }
      },
      (err) => console.error('getUserMedia failed', err)
    );
  }
  join(
    onSuccess?: (uid: number | string) => void,
    onFailure?: (error: Error) => void
  ): void {
    this.client.join(this.token, this.id, this.uid, onSuccess, onFailure);
  }

  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    this.client.publish(this.localStream, (err) =>
      console.log('Publish local stream error: ' + err)
    );
  }
}
