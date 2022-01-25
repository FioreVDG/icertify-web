import { AreYouSureComponent } from './../../../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-schedule',
  templateUrl: './set-schedule.component.html',
  styleUrls: ['./set-schedule.component.scss'],
})
export class SetScheduleComponent implements OnInit {
  schedule: string = '';
  constructor(
    public dialogRef: MatDialogRef<SetScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  setSchedule() {
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          others:
            'Clicking Yes will notify the QC indigents of their video conference schedule for their transactions.',
          isAdd: true,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
