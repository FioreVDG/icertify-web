import { QueryParams } from './../../../../../../models/queryparams.interface';
import { FolderService } from './../../../../../../service/api/folder/folder.service';
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
    private dialog: MatDialog,
    private folder: FolderService
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

  updateSchedule() {
    this.data.conferenceSchedule = new Date(this.schedule);
    this.folder.update(this.data, this.data._id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {}
    );
  }
}
