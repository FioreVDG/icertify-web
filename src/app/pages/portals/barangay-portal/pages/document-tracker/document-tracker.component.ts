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
    populate: [
      {
        field: '_transactionId',
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
      populate: event.populate ? event.populate : [],
    };

    let api: any;
    if (event && event.label === 'Ongoing') {
      query.find = query.find.concat(FIND_ONGOING);
      console.log(query);
      api = this.api.document.getAll(query);
    } else {
      query.find = query.find.concat(FIND_FINISHED);
      api = this.api.document.getAll(query);
    }

    api.subscribe((res: any) => {
      console.log(res);
      if (res.status === 'Success') {
        this.dataSource = res.env.documents;
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
    setTimeout(() => {
      this.loading = false;
      console.log(this.loading);
    }, 1000);
    console.log(event);
  }
  onRowClick(event: any) {}
}
