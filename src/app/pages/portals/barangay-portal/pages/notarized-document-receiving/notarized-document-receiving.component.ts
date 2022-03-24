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
    label: 'For Receiving',
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
        field: '_barangay.brgyCode',
        operator: '=',
        value: this.me._barangay.brgyCode,
      });
      api = this.api.folder.getAll(qry);
    } else {
      qry.find = qry.find.concat(FIND_RECEIVED);
      qry.find.push({
        field: '_barangay.brgyCode',
        operator: '=',
        value: this.me._barangay.brgyCode,
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
    this.appTable?.checkedRows.clear();
    this.fetchData(event);
    console.log(event);
  }
  onCheckBoxSelect(event: any) {
    console.log(event);
    this.selected = event;
  }

  onMark() {
    let ids: any = [];
    let docLogs: any = [];
    let docIds: any = [];
    this.selected.forEach((id: any) => {
      console.log(id);
      ids.push(id._id);
      id._transactions.forEach((trans: any) => {
        docIds.push(trans._documents[0]._id);
        docLogs.push({
          docDetails: trans._documents[0],
          message: 'Document Received from Notary by Brgy Hall Staff',
          _barangay: trans._documents[0]._barangay,
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
        if (res) {
          const loader = this.util.startLoading('Saving...');
          let apiQueries = ids.map((id: any) => {
            console.log(id);
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

          forkJoin(apiQueries).subscribe(
            (res: any) => {
              console.log(res);
              let apiQueries = docIds.map((id: any) => {
                return this.api.document.update(
                  {
                    documentLogStatus:
                      'Document Received from Notary by Brgy Hall Staff',
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
              this.api.documentlogs.createDocumentLogsMany(docLogs).subscribe(
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

              console.log(res);
            },
            (err: any) => {
              this.util.stopLoading(loader);

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
    this.dialog.open(ViewFolderTransactionsComponent, {
      data: { event, table: this.currTable },
      height: 'auto',
      width: '70%',
    });
    // console.log(event);
    // switch (event.action) {
    //   case 'viewTransac':
    //     break;

    //   default:
    //     break;
    // }
  }
}
