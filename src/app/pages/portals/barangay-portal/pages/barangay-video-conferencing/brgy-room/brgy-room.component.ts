import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebcamInitError } from 'ngx-webcam';

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
  currentTransactionIndex = -1;
  transactions: any = [];
  currentTransaction: any;
  constructor(
    public dialogRef: MatDialogRef<BrgyRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  joinMeeting(schedule: any) {
    console.log(schedule);
    this.currentSchedule = schedule;
    this.transactions = [];
    this.currentSchedule._folderIds.forEach((folder: any) => {
      folder._transactions.forEach((transaction: any) => {
        this.transactions.push(transaction);
      });
    });
    // const loader = this.util.startLoading('Joining please wait...');
    // this.agora.getToken(schedule._id).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     this.token = res.token;
    //     this.emitJoinRoomSocket(this.data);
    //     this.nextTransaction();
    //     this.joinRoom = true;
    //     this.util.stopLoading(loader);
    //     console.log(this.transactions);
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.util.stopLoading(loader);
    //   }
    // );
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
}
