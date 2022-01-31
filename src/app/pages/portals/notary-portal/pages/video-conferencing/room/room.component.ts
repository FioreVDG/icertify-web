import { AuthService } from './../../../../../../service/auth/auth.service';
import { AgoraService } from './../../../../../../service/api/agora/agora.service';
import { Populate } from 'src/app/models/queryparams.interface';
import { ConferenceService } from './../../../../../../service/api/conference/conference.service';
import { UtilService } from 'src/app/service/util/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { WebcamInitError } from 'ngx-webcam';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
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

  constructor(
    public dialogRef: MatDialogRef<RoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackbar: MatSnackBar,
    public util: UtilService,
    private conference: ConferenceService,
    private agora: AgoraService,
    private auth: AuthService,
    private socket: Socket,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.socketEventHandler();
    this.getExpectedParticipants();
    this.store.select('user').subscribe((res: any) => {
      this.me = res;
    });
  }

  getExpectedParticipants() {
    let query = {
      find: [],
    };
    this.conference.getScheduled(query).subscribe((res: any) => {
      console.log(res);
      this.data = res.env.schedules;
      this.data.forEach((schedule: any) => {
        let documentCtr = 0;
        schedule._folderIds.forEach((folder: any) => {
          folder._transactions.forEach((transaction: any) => {
            documentCtr += transaction._documents.length;
          });
        });
        schedule['no_of_documents'] = documentCtr;
      });
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

  joinMeeting(schedule: any) {
    console.log(schedule);
    this.currentSchedule = schedule;
    this.transactions = [];
    this.currentSchedule._folderIds.forEach((folder: any) => {
      folder._transactions.forEach((transaction: any) => {
        this.transactions.push(transaction);
      });
    });
    const loader = this.util.startLoading('Joining please wait...');
    this.agora.getToken(schedule._id).subscribe(
      (res: any) => {
        console.log(res);
        this.token = res.token;
        this.emitJoinRoomSocket(this.data);
        this.nextTransaction();
        this.joinRoom = true;
        this.util.stopLoading(loader);
        console.log(this.transactions);
      },
      (err) => {
        console.log(err);
        this.util.stopLoading(loader);
      }
    );
  }

  emitJoinRoomSocket(data: any) {
    this.socket.emit('createMeeting', { sched: data, id: this.me._id });
  }
  socketEventHandler() {
    this.socket.fromEvent('createdMeeting').subscribe((res: any) => {
      console.log(res);
    });
  }

  nextTransaction() {
    this.currentTransactionIndex++;
    this.currentTransaction = this.transactions[this.currentTransactionIndex];
    console.log(this.currentTransaction);
  }
}
