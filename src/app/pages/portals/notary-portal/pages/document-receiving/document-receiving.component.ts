import { UtilService } from './../../../../../service/util/util.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import {
  FOR_RECEIVING_FIND,
  NOTARY_DOC_RECEIVING_FILT_CONFIG,
  RECEIVED_FIND,
} from './config';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TRANSAC_TABLE_COLUMN } from '../../../barangay-portal/pages/batch-delivery-management/batch-folder/config';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-document-receiving',
  templateUrl: './document-receiving.component.html',
  styleUrls: ['./document-receiving.component.scss'],
})
export class DocumentReceivingComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;
  tableFlag = false;
  filtBtnConfig = NOTARY_DOC_RECEIVING_FILT_CONFIG;
  isCheckbox: boolean = true;
  selected = [];
  currTable: any;
  currPopulate: any;
  loading: boolean = true;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_batchedBy',
      },
      {
        field: '_riderFromBarangay',
      },
      {
        field: '_receivedByNotary',
      },
      {
        field: '_notaryId',
      },
    ],
    label: 'For Receiving',
  };
  routeLength = 3;
  dataSource = [];
  dataLength: number = 0;
  bsConfig: any;
  me: any;
  settings: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private util: UtilService,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.tableUpdateEmit(this.page);
  }
  addFilterChoices() {
    this.filtBtnConfig.forEach((el: any) => {
      el.column.forEach((col: any) => {
        if (col.path === '_barangay.brgyDesc') {
          let brgyChoices: any[] = [];
          if (this.settings) {
            this.settings.barangays.forEach((barangay: any) => {
              brgyChoices.push(barangay._barangay.brgyDesc);
            });
          }
          console.log(this.settings);
          col.choices = brgyChoices;
        }
      });
    });
    this.tableFlag = true;
  }

  getSettings(event: any) {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      if (!this.settings) {
        this.api.cluster
          .getOneNotary(this.me._notaryId)
          .subscribe((res: any) => {
            this.settings = res.env.cluster;
            this.addFilterChoices();
            this.fetchData(event);
          });
      } else {
        this.fetchData(event);
      }
    });
  }

  fetchData(event: TableOutput) {
    this.loading = true;
    console.log(event);
    let brgyCodes: any[] = [];
    if (this.settings) {
      brgyCodes = this.settings.barangays.map((el: any) => {
        return el._barangay.brgyCode;
      });
    }

    console.log(brgyCodes);
    let query: QueryParams = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      populates: event.populate ? event.populate : [],
    };

    if (event.label === 'Received') {
      query.find = query.find.concat(RECEIVED_FIND);
    } else {
      query.find = query.find.concat(FOR_RECEIVING_FIND);
    }
    if (event.filter) query.filter = event.filter;
    if (event.sort) {
      query.sort =
        (event.sort.direction === 'asc' ? '' : '-') + event.sort.active;
    }
    if (brgyCodes) {
      query.find = query.find.concat({
        field: '_barangay.brgyCode',
        operator: '[in]=',
        value: brgyCodes.join(','),
      });
    }
    console.log(query);
    this.api.transaction.getAllFolder(query).subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.folders;
      this.dataLength = res.total;
      this.loading = false;
    });
    this.currTable = event.label;
    this.page.populate = event.populate ? event.populate : [];

    this.isCheckbox = event.isCheckbox || true;
    this.bsConfig = event.bottomSheet;
  }

  tableUpdateEmit(event: any) {
    event['label'] = event.label || this.currTable;
    this.getSettings(event);
  }

  onRowClick(event: any) {
    console.log(event);
    this.dialog.open(ViewTransactionComponent, {
      data: { event, column: TRANSAC_TABLE_COLUMN },
      height: 'auto',
      width: '85%',
      disableClose: true,
    });
  }

  onCheckBoxBtnClick(event: any) {
    switch (event.action) {
      case 'receive':
        this.onMark();
        break;

      default:
        break;
    }
  }

  onRouteActivate() {
    console.log('Here');
    let count = this.router.url.split('/').length;
    console.log(count);
    this.routeLength = count;
  }

  onCheckBoxSelect(event: any) {
    console.log(event);
    this.selected = event;
  }

  onMark() {
    let ids: any = [];
    let docLogs: any = [];
    let docIds: any = [];
    console.log(this.selected);
    this.selected.forEach((id: any) => {
      ids.push(id._id);
      console.log(id);
      id._transactions.forEach((el: any) => {
        console.log(el);
        docIds.push(el._documents[0]._id);
        docLogs.push({
          docDetails: el._documents[0],
          message: 'Received by Notarial Staff',
          _barangay: el._barangay,
        });
      });
      console.log(docLogs);
    });
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
            return this.api.folder.update(
              {
                dateReceivedByNotary: new Date(),
                _receivedByNotary: this.me._id,
                _notaryId: this.me._notaryId,
                location: 'Notary',
                locationStatus: 'Received by Notary',
                folderStatus: 'For Scheduling',
              },
              id
            );
          });

          forkJoin(apiQueries).subscribe(
            (res: any) => {
              console.log(docLogs);
              let apiQueries = docIds.map((id: any) => {
                return this.api.document.update(
                  {
                    documentLogStatus: 'Received by Notarial Staff',
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
              console.log(res);
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
                  this.fetchData(this.page);
                  this.selected = [];
                });
            },
            (err: any) => {
              console.log(err.error);
            }
          );
        }
      });
  }
}
