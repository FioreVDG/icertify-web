import { User } from './../../../models/user.interface';
import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { DocumentLogsViewerComponent } from '../document-logs-viewer/document-logs-viewer.component';
import {
  DOCUMENT_TRACKER_CONFIG,
  FIND_ALL,
  FIND_FINISHED,
  FIND_ONGOING,
  NOTARY_FIND_FINISHED,
  NOTARY_FIND_ONGOING,
  TRACKER_BOTTOMSHEET,
  NOTARY_FIND_ALL,
} from './doc-tracker.config';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-document-tracker-table',
  templateUrl: './document-tracker-table.component.html',
  styleUrls: ['./document-tracker-table.component.scss'],
})
export class DocumentTrackerTableComponent implements OnInit {
  @Input() header: any;
  filtBtnConfig = DOCUMENT_TRACKER_CONFIG;
  selected: Array<any> = [];
  currTable: any;
  loading: boolean = false;
  bsConfig = TRACKER_BOTTOMSHEET;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populates: [
      {
        field: '_documents',
      },
    ],
    bottomSheet: this.bsConfig,
  };
  dataSource = [];
  me: any;
  dataLength: number = 0;

  setting: any;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private util: UtilService,
    private store: Store<{ user: User }>
  ) {
    this.store.select('user').subscribe((res: any) => {
      this.me = res;
    });
  }

  ngOnInit(): void {
    this.getSettings(this.page);
  }

  fetchData(event: any) {
    this.loading = true;
    console.log(event);
    console.log(this.setting);

    let query = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populates ? event.populates : [],
    };
    if (this.header === 'NOTARY') {
      let brgyCodes: any[] = [];
      if (this.setting) {
        brgyCodes = this.setting.barangays.map((el: any) => {
          return el._barangay.brgyCode;
        });
      }
      if (brgyCodes) {
        query.find = query.find.concat({
          field: '_barangay.brgyCode',
          operator: '[in]=',
          value: brgyCodes.join(','),
        });
      }
    } else {
      query.find.push({
        field: '_barangay.brgyCode',
        operator: '=',
        value: this.me._barangay.brgyCode,
      });
    }

    let api: any;
    if (event && event.label === 'Ongoing') {
      query.find =
        this.header === 'BARANGAY'
          ? query.find.concat(FIND_ONGOING)
          : query.find.concat(NOTARY_FIND_ONGOING);
      console.log(query);
      api = this.api.document.getAll(query);
    } else if (event && event.label === 'All') {
      query.find =
        this.header === 'BARANGAY'
          ? query.find.concat(FIND_ALL)
          : query.find.concat(NOTARY_FIND_ALL);
      console.log(query);
      console.log(query);
      api = this.api.document.getAll(query);
    } else if (event && event.label === 'Finished') {
      query.find =
        this.header === 'BARANGAY'
          ? query.find.concat(FIND_FINISHED)
          : query.find.concat(NOTARY_FIND_FINISHED);
      console.log(query);
      api = this.api.document.getAll(query);
    }
    console.log('HERE');
    api?.subscribe(
      (res: any) => {
        // console.log(res);
        if (res.status === 'Success') {
          res.env.documents.forEach((el: any) => {
            el._transactionId._folderId.folderName = el._transactionId._folderId
              ? el._transactionId._folderId.folderName
              : 'Not Batched';

            el.remark = el.remark ? el.remark : 'No remark/s.';
            el._notaryId = el._notaryId ? el._notaryId : this.setting._notaryId;
          });
          this.dataSource = res.env.documents;
          this.dataLength = res.total;
        }
        console.log(this.dataSource);
        this.loading = false;
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
      }
    );
    this.currTable = event.label;
    this.bsConfig = event.bottomSheet;
    console.log(this.bsConfig);
  }

  tableUpdateEmit(event: any) {
    event.label = event.label || this.currTable;

    this.getSettings(event);
    console.log(event);
  }
  getSettings(event: any) {
    console.log('asdasdsd');

    this.loading = true;

    this.store.select('user').subscribe(
      (res: any) => {
        let api = this.api.cluster.getOne('');
        if (this.header === 'NOTARY') {
          api = this.api.cluster.getOneNotary(res._notaryId);
        } else {
          api = this.api.cluster.getOne(res._barangay.brgyCode);
        }

        if (!this.setting) {
          api.subscribe(
            (res: any) => {
              this.setting = res.env.cluster;
              this.fetchData(event);
            },
            (err: any) => {
              this.loading = false;
              console.log(err);
            }
          );
        } else {
          this.fetchData(event);
        }
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'viewDoc':
        this.dialog.open(DocumentLogsViewerComponent, {
          data: { obj: event.obj, header: this.header },
          width: '60vw',
        });
    }
  }
}
