import { DocumentLogsViewerComponent } from './../../../../../shared/components/document-logs-viewer/document-logs-viewer.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import {
  DOCUMENT_TRACKER_CONFIG,
  FIND_ONGOING,
  TRACKER_BOTTOMSHEET,
  FIND_FINISHED,
} from './doc-tracker.config';
@Component({
  selector: 'app-document-tracker',
  templateUrl: './document-tracker.component.html',
  styleUrls: ['./document-tracker.component.scss'],
})
export class DocumentTrackerComponent implements OnInit {
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
    label: 'Ongoing',
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
      query.find = query.find.concat(FIND_ONGOING);
      console.log(query);
      api = this.api.transaction.getAll(query);
    } else {
      query.find = query.find.concat(FIND_FINISHED);
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
        res.env.transactions = res.env.transactions.filter(
          (o: any) => o.tempFolderId !== 'Not Batched'
        );
        console.log(res.env.transactions);
        this.dataSource = res.env.transactions;
        this.dataLength = res.env.transactions.length;
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
    setTimeout(() => {
      this.loading = false;
      console.log(this.loading);
    }, 1000);
    console.log(event);
  }
  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'viewDoc':
        this.dialog.open(DocumentLogsViewerComponent, {
          data: event.obj,
          width: '60vw',
        });
    }
  }
}
