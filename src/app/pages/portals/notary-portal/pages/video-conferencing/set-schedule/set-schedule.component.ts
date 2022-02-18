import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from './../../../../../../service/util/util.service';
import { ActionResultComponent } from './../../../../../../shared/dialogs/action-result/action-result.component';
import { FolderService } from './../../../../../../service/api/folder/folder.service';
import { ConferenceService } from './../../../../../../service/api/conference/conference.service';
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
    private conference: ConferenceService,
    private util: UtilService,
    private api: ApiService
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
        this.createSchedule();
      });
  }

  createSchedule() {
    let toSaveData: any = {};
    let idsTemp: any = [];
    let docLogs: any = [];
    this.data.forEach((el: any) => {
      console.log(el);
      idsTemp.push(el._id);
      el._transactions.forEach((trans: any) => {
        docLogs.push({
          docDetails: trans._documents[0],
          message: 'Video Conference Scheduled by Notarial Staff',
        });
      });
    });
    console.log(docLogs);
    toSaveData.schedule = new Date(this.schedule);
    toSaveData._folderIds = idsTemp;
    console.log(toSaveData);
    const loader = this.util.startLoading('Saving schedule');
    this.conference.create(toSaveData).subscribe(
      (res: any) => {
        console.log(res);
        this.api.documentlogs.createDocumentLogsMany(docLogs).subscribe(
          (res: any) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
        this.util.stopLoading(loader);
        if (res) {
          this.dialog
            .open(ActionResultComponent, {
              data: {
                msg: 'Selected Batches has been successfully scheduled!',
                button: 'Okay',
                success: true,
              },
            })
            .afterClosed()
            .subscribe((res: any) => {
              if (res) this.dialogRef.close(res);
            });
        }
      },
      (err) => {
        console.log(err);
        this.util.stopLoading(loader);
        this.dialog.open(ActionResultComponent, {
          data: {
            msg: err.error.message || 'Server Error, Please try again',
            button: 'Okay',
            success: false,
          },
        });
      }
    );
  }
}
