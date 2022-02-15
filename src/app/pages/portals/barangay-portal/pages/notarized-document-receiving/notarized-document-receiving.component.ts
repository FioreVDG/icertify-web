import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import {
  FILT_BTN_CONFIG,
  FIND_FOR_RECEIVING,
  FIND_RECEIVED,
  NOTARIZED_DOCUMENT_RECEIVING_BOTTOMSHEET,
} from './config';
import { ViewFolderTransactionsComponent } from './view-folder-transactions/view-folder-transactions.component';

@Component({
  selector: 'app-notarized-document-receiving',
  templateUrl: './notarized-document-receiving.component.html',
  styleUrls: ['./notarized-document-receiving.component.scss'],
})
export class NotarizedDocumentReceivingComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;
  filtBtnConfig = FILT_BTN_CONFIG;
  isCheckbox: boolean = true;
  selected = [];
  currTable: any;
  currPopulate: any;
  loading = true;
  bsConfig = NOTARIZED_DOCUMENT_RECEIVING_BOTTOMSHEET;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_createdBy',
      },
    ],
    bottomSheet: this.bsConfig,
  };
  routeLength = 3;
  dataSource = [];
  dataLength: number = 0;
  me: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private store: Store<{ user: User }>,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
    });
  }

  fetchData(event: any) {
    this.loading = true;
    console.log(event);

    let qry = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populate ? event.populate : [],
    };
    if (event.filter) qry.filter = event.filter;

    let api: any;
    if (event && event.label === 'For Receiving') {
      qry.find = qry.find.concat(FIND_FOR_RECEIVING);
      qry.find.push({
        field: '_brgyId',
        operator: '=',
        value: this.me._brgyId,
      });
      api = this.api.folder.getAll(qry);
    } else {
      qry.find = qry.find.concat(FIND_RECEIVED);
      qry.find.push({
        field: '_brgyId',
        operator: '=',
        value: this.me._brgyId,
      });
      api = this.api.folder.getAll(qry);
    }

    console.log(qry);
    api.subscribe((res: any) => {
      console.log(res);
      if (res.status == 'Success') {
        this.dataSource = res.env.folders;
        this.dataLength = res.total;
      }
      this.loading = false;
    });
    this.currTable = event.label;
    this.page.populate = event.populate;
    this.isCheckbox = event.isCheckbox || true;
    this.bsConfig = event.bottomSheet;
  }

  tableUpdateEmit(event: any) {
    event['label'] = event.label || this.currTable;
    console.log(event.populate);
    this.fetchData(event);
    setTimeout(() => {
      this.loading = false;
      console.log(this.loading);
    }, 1000);
    console.log(event);
  }
  onCheckBoxSelect(event: any) {
    console.log(event);
    this.selected = event;
  }

  onMark() {
    let ids: any = [];
    let docLogs: any = [];
    this.selected.forEach((id: any) => {
      ids.push(id._id);
      id._transactions.forEach((trans: any) => {
        docLogs.push({
          docDetails: trans._documents[0],
          message: 'Document Received from Notary by Brgy Hall Staff',
        });
      });
    });
    console.log(this.selected);
    console.log(docLogs);
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          msg: 'Mark as received batch/es?',
          isOthers: true,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        const loader = this.util.startLoading('Saving...');
        if (res) {
          let apiQueries = ids.map((id: any) => {
            return this.api.folder.update(
              {
                _receivedByBrgy: this.me._id,
                location: 'Barangay',
                locationStatus: 'Received by Barangay',
                dateReceivedByBrgy: new Date(),
              },
              id
            );
          });

          let smsQueries = ids.map((id: any) => {
            return this.api.sms.sendReleasingNotif({}, id);
          });

          forkJoin(apiQueries).subscribe(
            (res: any) => {
              forkJoin(smsQueries).subscribe(
                (res) => {
                  console.log(res);
                  this.api.documentlogs
                    .createDocumentLogsMany(docLogs)
                    .subscribe(
                      (res: any) => {
                        console.log(res);
                      },
                      (err) => {
                        console.log(err);
                      }
                    );
                  this.util.stopLoading(loader);
                  this.dialog
                    .open(ActionResultComponent, {
                      data: {
                        success: true,
                        msg: `Batch/es successfully marked as received!`,
                        button: 'Okay',
                      },
                    })
                    .afterClosed()
                    .subscribe((res: any) => {
                      this.appTable?.checkedRows.clear();
                      this.selected = [];
                      this.fetchData(this.page);
                    });
                },
                (err) => {
                  console.log(err);
                }
              );
              console.log(res);
            },
            (err: any) => {
              console.log(err.error);
            }
          );
        }
      });
  }

  onCheckBoxButtonClick(event: any) {
    switch (event.action) {
      case 'receive':
        this.onMark();
        break;

      default:
        break;
    }
  }

  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'viewTransac':
        this.dialog.open(ViewFolderTransactionsComponent, {
          data: event,
          height: 'auto',
          width: '70%',
        });
        break;

      default:
        break;
    }
  }
}
