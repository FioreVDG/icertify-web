import { UtilService } from './../../../../../service/util/util.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import {
  FOR_RECEIVING_FIND,
  NOTARY_DOC_RECEIVING_FILT_CONFIG,
  RECEIVED_FIND,
} from './config';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { VIEW_TRANSACTION_TABLE } from './view-transaction/config';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@Component({
  selector: 'app-document-receiving',
  templateUrl: './document-receiving.component.html',
  styleUrls: ['./document-receiving.component.scss'],
})
export class DocumentReceivingComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;

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
        field: '_receivedByNotary',
      },
      {
        field: '_notaryId',
      },
    ],
  };
  routeLength = 3;
  dataSource = [];
  dataLength: number = 0;
  bsConfig: any;
  me: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private dbx: DropboxService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.auth.me().subscribe((res: any) => {
      this.me = res.env.user;
      console.log(this.me);
    });
    this.fetchData(this.page);
  }

  fetchData(event: TableOutput) {
    this.loading = true;
    console.log(event);

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

    this.api.transaction.getAllFolder(query).subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.folders;
      this.dataLength = res.count;
      this.loading = false;
    });
    this.currTable = event.label;
    this.page.populate = event.populate ? event.populate : [];

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

  onRowClick(event: any) {
    console.log(event);
    this.dialog.open(ViewTransactionComponent, {
      data: { event, column: VIEW_TRANSACTION_TABLE },
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
    console.log(this.selected);
    this.selected.forEach((id: any) => {
      ids.push(id._id);
      console.log(id);
      id._transactions.forEach((el: any) => {
        console.log(el);
        docLogs.push({
          docDetails: el._documents[0],
          message: 'Received by Notarial Staff',
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
