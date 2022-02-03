import { ActionResultComponent } from './../../../../../../shared/dialogs/action-result/action-result.component';
import { QueryParams } from './../../../../../../models/queryparams.interface';
import { RoomService } from './../../../../../../service/api/room/room.service';
import { AgoraService } from './../../../../../../service/api/agora/agora.service';
import { UtilService } from './../../../../../../service/util/util.service';
import { ConferenceService } from './../../../../../../service/api/conference/conference.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { WebcamInitError } from 'ngx-webcam';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-brgy-room',
  templateUrl: './brgy-room.component.html',
  styleUrls: ['./brgy-room.component.scss'],
})
export class BrgyRoomComponent implements OnInit {
  joinRoom: boolean = false;
  locked: boolean = false;
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 2048 },
    height: { ideal: 876 },
  };
  uid: string = '';
  token: string = '';
  currentSchedule: any;
  sender: any;
  currentTransactionIndex = -1;
  transactions: any = [];
  schedules: any = [];
  currentScheduleId: any;
  btnDisabled: boolean = true;
  details: any;
  notaryDetails: any;

  filteredSched: any;
  currentRoomDetails: any;
  currDetails: any;
  msg: string = '';

  constructor(
    public dialogRef: MatDialogRef<BrgyRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackbar: MatSnackBar,
    private conference: ConferenceService,
    private util: UtilService,
    private agora: AgoraService,
    private room: RoomService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sender = this.data.obj.sender;
    this.currDetails = this.data.obj;
    this.getExpectedParticipants();
    this.getRoomDetails();
  }

  joinMeeting() {
    const loader = this.util.startLoading('Joining please wait...');
    this.agora.getToken(this.currentScheduleId).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.token = res.token;
        this.joinRoom = true;
        this.util.stopLoading(loader);
      }
    });
  }

  getRoomDetails() {
    const loader = this.util.startLoading('Getting room details...');
    let query: QueryParams = { find: [] };
    this.room.get(query).subscribe(
      (res: any) => {
        console.log(res);

        if (res.env.room.length) {
          this.util.stopLoading(loader);
          res.env.room.forEach((room: any) => {
            this.currentRoomDetails = room;
          });

          this.checkAvailability(this.currentRoomDetails, this.currDetails);
        } else {
          this.util.stopLoading(loader);
          console.log('No active meeting');
          this.msg = 'Conference is empty';
          this.btnDisabled = true;
        }
      },
      (err) => {
        console.log(err);
        this.util.stopLoading(loader);
        this.dialog.open(ActionResultComponent, {
          data: {
            msg: err.error.message || 'Server error, Please try again!',
            button: 'Okay',
          },
        });
      }
    );
  }

  checkAvailability(roomDetail: any, currDetails: any) {
    console.log('CURRENT DATA NI MEETING', roomDetail);
    console.log('CURRENT DATA NG USER NA SASALI', currDetails);
    console.log(currDetails.refCode, roomDetail.currentTransaction.refCode);
    if (
      roomDetail.currentTransaction.refCode === currDetails.refCode &&
      roomDetail.que === currDetails.que
    ) {
      this.msg = 'Click the button to join.';
      this.btnDisabled = false;
    } else {
      this.msg = 'Wait for your turn to join.';
      this.btnDisabled = true;
    }
  }

  getExpectedParticipants() {
    let filtMySched: any;
    let query = {
      find: [],
      populates: [{ field: '_notaryId' }],
    };
    this.conference.getScheduled(query).subscribe((res: any) => {
      console.log(res);
      this.schedules = res.env.schedules;
      console.log(this.schedules);
      this.schedules.forEach((schedule: any) => {
        schedule._folderIds.forEach((folder: any) => {
          console.log(folder);
        });
      });
      filtMySched = this.schedules.filter(
        (o: any) => o._id === this.data.obj._folderId._conferenceId
      );
      if (filtMySched.length) {
        this.currentScheduleId = filtMySched[0]._id;
        this.notaryDetails = filtMySched._notaryId;
        console.log(filtMySched);
      }
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

  onClose() {
    delete this.currentRoomDetails;
    delete this.currDetails;
    this.dialogRef.close();
  }
}
