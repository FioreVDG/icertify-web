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
import jsPDF from 'jspdf';

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
    populate: [],
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
        case 'downloadSS':
          this.downloadSS(event.obj);
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

  font = {
    size: {
      h1: 13,
      h2: 12,
      h3: 11,
      h4: 10,
      h5: 9,
      small: 8,
    },
    type: {
      bold: 'bold',
      italic: 'italic',
      normal: 'normal',
      bolditalic: 'bolditalic',
    },
  };
  downloadSS(data: any) {
    console.log(data);
    const doc = new jsPDF('p', 'in', [8.5, 14]);
    const pageWidth = doc.internal.pageSize.getWidth();
    const borderWidth = pageWidth - 1;
    let ySpacing = 0;

    doc.setFontSize(this.font.size.h1);
    doc.setFont('Times', this.font.type.bold);

    ySpacing += 0.6;
    doc.text('iCertify VIDEO CONFERENCE SCREENSHOT', pageWidth / 2, ySpacing, {
      align: 'center',
    });

    doc.setFontSize(this.font.size.h2);
    doc.setFont('Times', this.font.type.normal);

    ySpacing += 0.4;
    doc.text('QC Indigent: ', borderWidth - 6.5, ySpacing);
    doc.text(
      data.sender.firstName + ' ' + data.sender.lastName,
      borderWidth - 3.6,
      ySpacing
    );
    ySpacing += 0.2;
    doc.text('Notary: ', borderWidth - 6.5, ySpacing);
    doc.text(
      data._notaryId.firstName + ' ' + data._notaryId.lastName,
      borderWidth - 3.6,
      ySpacing
    );
    ySpacing += 0.2;
    doc.text(
      'Date and Time of Video Conference: ',
      borderWidth - 6.5,
      ySpacing
    );
    doc.text(
      data.sender.firstName + ' ' + data.sender.lastName,
      borderWidth - 3.6,
      ySpacing
    );
    ySpacing += 0.2;
    doc.text('Barangay: ', borderWidth - 6.5, ySpacing);
    doc.text(
      data.sender.firstName + ' ' + data.sender.lastName,
      borderWidth - 3.6,
      ySpacing
    );
    // for (let screenshot of data.screenShots)

    doc.save('test.pdf');
  }
}
