import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ViewAttachmentsComponent } from 'src/app/shared/components/view-attachments/view-attachments.component';
import {
  CHECKBOX_DISABLER,
  FILT_BTN_CONFIG,
  FIND_NOTARIZED,
  FIND_UNNOTARIZED,
} from './config';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;
  isCheckbox: boolean = true;
  filtBtnConfig = FILT_BTN_CONFIG;
  checkBoxDisableField = CHECKBOX_DISABLER;
  selected = [];
  currTable: any;
  currPopulate: any;
  loading = true;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_createdBy',
      },
    ],
  };
  routeLength = 3;
  dataSource = [];
  dataLength: number = 0;
  me: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {}

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
    if (event && event.label === 'Notarized') {
      qry.find = qry.find.concat(FIND_NOTARIZED);
      api = this.api.document.getAll(qry);
    } else if (event && event.label === 'Unnotarized') {
      qry.find = qry.find.concat(FIND_UNNOTARIZED);
      api = this.api.document.getAll(qry);
    } else {
      api = this.api.document.getAll(qry);
    }
    console.log(qry);
    api.subscribe((res: any) => {
      console.log(res);
      if (res.status == 'Success') {
        this.dataSource = res.env.documents;
        this.dataLength = res.total;
      }
      this.loading = false;
    });
    this.currTable = event.label;
    this.page.populate = event.populate;
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

  onCheckBoxClick(event: any) {
    switch (event.action) {
      case 'downloadDocuments':
        this.downloadNotarizedDocuments();
        break;

      case 'downloadScreenshots':
        this.downloadScreenshots();
        break;

      default:
        break;
    }
  }

  onRowClick(event: any) {
    console.log(event);
    if (event.action) {
      switch (event.action) {
        case 'viewDoc':
          this.viewAttachments([event.obj], event.obj.refCode);
          break;
        case 'downloadDoc':
          this.downloadDocu(event.obj.notarizedDocument);
          break;
        default:
      }
    }
  }

  viewAttachments(docs: Array<any>, refCode: string) {
    console.log(docs);
    this.dialog.open(ViewAttachmentsComponent, {
      data: {
        documents: docs,
        refCode: refCode,
      },
      height: 'auto',
      width: '70%',
    });
  }

  onCheckBoxSelect(event: any) {
    console.log(event);
    this.selected = event;
  }

  downloadNotarizedDocuments() {
    let docs: any = [];
    this.selected.forEach((doc: any) => {
      docs.push(doc);
      this.downloadDocu(doc.notarizedDocument);
    });
    console.log(docs);
  }
  downloadScreenshots() {
    let docs: any = [];
    this.selected.forEach((doc: any) => {
      docs.push(doc);
      this.downloadSS(doc);
    });
    console.log(docs);
  }

  downloadDocu(doc: any) {
    this.dbx.getTempLink(doc.dropbox.path_display).subscribe((res: any) => {
      console.log(res);
      window.open(res.result.link, '_blank');
    });
  }

  downloadSS(doc: any) {}
}
