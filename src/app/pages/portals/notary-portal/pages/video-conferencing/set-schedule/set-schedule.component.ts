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
import { forkJoin } from 'rxjs';

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
    let transTemp: any = [];
    this.data.settings.barangays.forEach((doc: any) => {
      console.log(doc);
      let que: number = 1;
      let queue: number = 1;
      this.data.selected.forEach((el: any) => {
        el._transactions.forEach((trans: any) => {
          trans.queue = que++;
          trans.duration = doc.duration;
          trans._documents[0].queue = queue++;
          trans._documents[0].duration = doc.duration;
        });
      });
      let findTemp: any = this.data.selected.find(
        (o: any) => o._barangay.brgyCode === doc._barangay.brgyCode
      );
      if (findTemp) {
        findTemp.duration = doc.duration;
        console.log(findTemp);
        console.log(this.data);
      }
    });
  }

  computeStartTime(doc: any) {
    console.log(doc);
    var date = new Date(this.schedule);
    var totalDurationToAdd = (doc.queue - 1) * doc.duration;
    date.setMinutes(date.getMinutes() + totalDurationToAdd);
    doc.estimatedStart = date;
    console.log(date);
    return date;
  }
  modelChanged(event: any) {
    console.log(event);
    let tempTime: any = this.formatAMPM(new Date(event));
    let tempDate: any = new Date(event).getTime();
    // let milliSecond: any = tempDate.getMilliseconds();
    console.log(tempDate);
    // console.log(milliSecond);
    console.log(tempTime);
    this.data.settings.barangays.forEach((doc: any) => {
      console.log(doc);
      let findTemp: any = this.data.selected.find(
        (o: any) => o._barangay.brgyCode === doc._barangay.brgyCode
      );
      if (findTemp) {
        findTemp._transactions.forEach((el: any) => {
          el._documents[0].startTime;
        });
        console.log(findTemp);
        console.log(this.data);
      }
    });
  }
  convertMinuteToSecs(value: any) {
    return Math.floor(value / 60) + ':' + (value % 60 ? value % 60 : '00');
  }

  formatAMPM(date: any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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
    let docIds: any = [];
    let tempDocIds: any = [];
    let tempDocs: any = [];
    console.log(this.data.selected);
    this.data.selected.forEach((el: any) => {
      console.log(el);
      idsTemp.push(el._id);
      el._transactions.forEach((trans: any) => {
        tempDocs.push(trans._documents[0]);
        console.log(trans);
        docIds.push(trans._documents[0]._id);
        docLogs.push({
          docDetails: trans._documents[0],
          message: 'Video Conference Scheduled by Notarial Staff',
          _barangay: trans._documents[0]._barangay,
        });
      });
    });
    console.log(docLogs);
    console.log(idsTemp);
    console.log(docIds);
    console.log(tempDocs);
    tempDocIds = [...docIds];
    toSaveData.schedule = new Date(this.schedule);
    toSaveData._folderIds = idsTemp;
    console.log(toSaveData);
    const loader = this.util.startLoading('Saving schedule');

    this.conference.create(toSaveData).subscribe(
      (res: any) => {
        console.log(res);
        let que: number = 1;
        let apiQueries = tempDocs.map((id: any) => {
          return this.api.document.update(
            {
              queue: que++,
              documentLogStatus: 'Video Conference Scheduled by Notarial Staff',
              schedule: new Date(id.estimatedStart),
            },
            id._id
          );
        });
        console.log(apiQueries);
        forkJoin(apiQueries).subscribe(
          (res: any) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
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
