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
  loading: boolean = true;
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
  dataLength: number = 0;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private util: UtilService
  ) {}

  ngOnInit(): void {}

  fetchData(event: any) {
    this.loading = true;
    console.log(event);

    let query = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populates ? event.populates : [],
    };

    let api: any;
    if (event && event.label === 'Ongoing') {
      query.find =
        this.header === 'BARANGAY'
          ? query.find.concat(FIND_ONGOING)
          : query.find.concat(NOTARY_FIND_ONGOING);
      console.log(query);
      api = this.api.transaction.getAll(query);
    } else if (event && event.label === 'All') {
      query.find =
        this.header === 'BARANGAY'
          ? query.find.concat(FIND_ALL)
          : query.find.concat(NOTARY_FIND_ALL);
      console.log(query);
      console.log(query);
      api = this.api.transaction.getAll(query);
    } else if (event && event.label === 'Finished') {
      query.find =
        this.header === 'BARANGAY'
          ? query.find.concat(FIND_FINISHED)
          : query.find.concat(NOTARY_FIND_FINISHED);
      console.log(query);
      api = this.api.transaction.getAll(query);
    }

    api.subscribe((res: any) => {
      // console.log(res);
      if (res.status === 'Success') {
        res.env.transactions.forEach((el: any) => {
          el.newDocument = el._documents[0];
          el.tempFolderId = el._folderId ? el._folderId : 'Not Batched';
        });
        console.log(res);
        console.log(res.env.transactions);
        this.dataSource = res.env.transactions;
        this.dataLength = res.total;
      }
      this.loading = false;
    });
    this.currTable = event.label;
    this.bsConfig = event.bottomSheet;
    console.log(this.bsConfig);
  }

  tableUpdateEmit(event: any) {
    event.label = event.label || this.currTable;

    this.fetchData(event);
    console.log(event);
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