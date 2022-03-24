import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import {
  MARK_AS_ENROUTE_FORM,
  CHOICES_RIDER_DATA,
  TABLE_CONFIG,
} from './config';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { P } from '@angular/cdk/keycodes';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mark-as-enroute',
  templateUrl: './mark-as-enroute.component.html',
  styleUrls: ['./mark-as-enroute.component.scss'],
})
export class MarkAsEnrouteComponent implements OnInit {
  form = MARK_AS_ENROUTE_FORM;
  riderList: any = CHOICES_RIDER_DATA;
  tableConfig = TABLE_CONFIG;
  riderObj: any;
  saving = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public util: UtilService,
    public dialog: MatDialog,
    private api: ApiService,
    public dialogRef: MatDialogRef<MarkAsEnrouteComponent>,

    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.data.setting._riders.forEach((i: any) => {
      this.riderList.item.push({
        value: { name: i.firstName + ' ' + i.lastName, id: i._id },
      });
    });

    if (!this.riderList.item.length) {
      this.dialog
        .open(ActionResultComponent, {
          data: {
            msg: `No rider found in this cluster!`,
            success: false,
            button: 'Okay!',
          },
        })
        .afterClosed()
        .subscribe((_) => {
          this.dialogRef.close();
        });
    }
  }
  ngOnDestroy() {
    this.riderList.item = [];
  }
  onSelect(event: any) {
    console.log(event);
    this.riderObj = { id: event.id };
  }
  onMark() {
    let ids: any = [];
    let docLogs: any = [];
    let docIds: any = [];
    this.data.obj.forEach((data: any) => {
      console.log(data);
      ids.push(data.ids._id);
      docIds.push(data.docDetails._id);
      docLogs.push({
        docDetails: data.docDetails,
        message: 'Batched and Marked as Enroute to Notary by Brgy Hall Staff',
        _barangay: data.docDetails._barangay,
      });
    });
    ids = ids.join(',');
    console.log(ids);
    console.log(docIds);
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          msg: 'Enroute this/these transaction/s',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.saving = true;
          this.api.transaction
            .createBatchTransaction(ids, this.riderObj)
            .subscribe(
              (res: any) => {
                this.saving = false;
                console.log(res);
                //DOCUMENT LOGS HERE
                console.log(docLogs);

                let apiQueries = docIds.map((id: any) => {
                  return this.api.document.update(
                    {
                      documentLogStatus:
                        'Batched and Marked as Enroute to Notary by Brgy Hall Staff',
                    },
                    id
                  );
                });

                forkJoin(apiQueries).subscribe(
                  (res: any) => {
                    console.log(res);
                  },
                  (err: any) => {
                    console.log(err);
                  }
                );

                //sms
                this.api.sms
                  .sendEnrouteNotif({
                    documentIds: docIds,
                    curDate: new Date(),
                  })
                  .subscribe((res) => {});
                //doclogs
                this.api.documentlogs.createDocumentLogsMany(docLogs).subscribe(
                  (res: any) => {
                    console.log(res);
                  },
                  (err) => {
                    console.log(err);
                  }
                );
                this.dialog
                  .open(ActionResultComponent, {
                    data: {
                      success: true,
                      msg: `Batch ${res.env.batched.folderName} successfully marked as enroute!`,
                      button: 'Okay',
                    },
                  })
                  .afterClosed()
                  .subscribe((res: any) => {
                    console.log(res);
                    if (res) {
                      this.dialogRef.close(true);
                    }
                  });
              },
              (err) => {
                this.saving = false;
                console.log(err);
              }
            );
        }
      });
  }
}
