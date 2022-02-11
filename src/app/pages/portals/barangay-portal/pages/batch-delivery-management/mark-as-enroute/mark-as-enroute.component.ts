import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { MARK_AS_ENROUTE_FORM, MOCK_RIDER_DATA, TABLE_CONFIG } from './config';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';

@Component({
  selector: 'app-mark-as-enroute',
  templateUrl: './mark-as-enroute.component.html',
  styleUrls: ['./mark-as-enroute.component.scss'],
})
export class MarkAsEnrouteComponent implements OnInit {
  form = MARK_AS_ENROUTE_FORM;
  riderList: any = MOCK_RIDER_DATA;
  tableConfig = TABLE_CONFIG;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public util: UtilService,
    public dialog: MatDialog,
    private api: ApiService,
    private dialogRef: MatDialogRef<MarkAsEnrouteComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onSelect(event: any) {
    console.log(event);
  }
  onMark() {
    let ids: any = [];
    let docLogs: any = [];
    this.data.forEach((id: any) => {
      ids.push(id._id);
      docLogs.push({
        docDetails: id._documents[0],
        message: 'Batched and Marked as Enroute to Notary by Brgy Hall Staff',
      });
    });
    ids = ids.join(',');
    console.log(ids);
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          msg: 'Enroute this/these transaction/s',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.api.transaction
            .createBatchTransaction(ids)
            .subscribe((res: any) => {
              console.log(res);
              //DOCUMENT LOGS HERE
              console.log(docLogs);
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
            });
        }
      });
  }
}
