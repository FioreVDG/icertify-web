import { AuthService } from './../../../../../../service/auth/auth.service';
import { AgoraService } from './../../../../../../service/api/agora/agora.service';
import { Populate } from 'src/app/models/queryparams.interface';
import { ConferenceService } from './../../../../../../service/api/conference/conference.service';
import { UtilService } from 'src/app/service/util/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { WebcamInitError } from 'ngx-webcam';

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

  token: string = '';

  constructor(
    public dialogRef: MatDialogRef<RoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackbar: MatSnackBar,
    public util: UtilService,
    private conference: ConferenceService,
    private agora: AgoraService,
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
}
