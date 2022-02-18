import { PdfService } from './../../../service/pdf/pdf.service';
import { ViewProofOfIdentityComponent } from './../view-proof-of-identity/view-proof-of-identity.component';
import { ViewScreenshotComponent } from './../view-screenshot/view-screenshot.component';
import { QueryParams } from './../../../models/queryparams.interface';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { ViewAttachmentsComponent } from '../view-attachments/view-attachments.component';
import {
  FILT_BTN_CONFIG,
  FIND_ALL,
  FIND_NOTARIZED,
  FIND_UNNOTARIZED,
  NOTARY_FILT_BTN_CONFIG,
  NOTARY_FIND_NOTARIZED,
  NOTARY_FIND_UNNOTARIZED,
} from './transaction-history.config';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { UtilService } from 'src/app/service/util/util.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelService } from 'src/app/service/excel/excel.service';

@Component({
  selector: 'app-transaction-history-table',
  templateUrl: './transaction-history-table.component.html',
  styleUrls: ['./transaction-history-table.component.scss'],
})
export class TransactionHistoryTableComponent implements OnInit {
  @Input() header: any;
  isCheckbox: boolean = true;
  filtBtnConfig: any;
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
    private dbx: DropboxService,
    private store: Store<{ user: User }>,
    public util: UtilService,
    public snackbar: MatSnackBar,
    private excel: ExcelService,
    private pdf: PdfService
  ) {}

  ngOnInit(): void {
    console.log(this.header);
    if (this.header == 'NOTARY') {
      this.filtBtnConfig = NOTARY_FILT_BTN_CONFIG;
    } else {
      this.store.select('user').subscribe((me: any) => {
        console.log(me);
        this.me = me;
      });
      this.filtBtnConfig = FILT_BTN_CONFIG;
    }
  }

  fetchData(event: any) {
    this.loading = true;
    console.log(event);

    let qry: QueryParams = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populate ? event.populate : [],
    };
    if (event.filter) qry.filter = event.filter;

    let api: any;
    if (this.header == 'NOTARY') {
      if (event.label === 'Notarized') {
        qry.find = qry.find.concat(NOTARY_FIND_NOTARIZED);
        api = this.api.document.getAll(qry);
      } else if (event.label === 'Unnotarized') {
        qry.find = qry.find.concat(NOTARY_FIND_UNNOTARIZED);
        api = this.api.document.getAll(qry);
      } else {
        qry.find = qry.find.concat(FIND_ALL);
        api = this.api.document.getAll(qry);
      }
    } else {
      if (event.label === 'Notarized') {
        qry.find = qry.find.concat(FIND_NOTARIZED);
        qry.find.push({
          field: '_barangay.brgyCode',
          operator: '=',
          value: this.me._barangay.brgyCode,
        });
        api = this.api.document.getAll(qry);
      } else if (event.label === 'Unnotarized') {
        qry.find = qry.find.concat(FIND_UNNOTARIZED);
        api = this.api.document.getAll(qry);
      } else {
        qry.find = qry.find.concat(FIND_ALL);
        api = this.api.document.getAll(qry);
      }
    }
    console.log(qry);
    api.subscribe((res: any) => {
      console.log(res);
      if (res.status == 'Success') {
        this.dataSource = res.env.documents;
        this.getImgLink();
        this.checkCertificateOfIndigency();
        this.dataLength = res.total;
        console.log(this.dataSource);
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
    console.log(event);
  }

  checkCertificateOfIndigency() {
    this.dataSource.forEach((docObj: any) => {
      docObj.sender.images['COIstatus'] = docObj.sender.images.reason_coi
        ? 'To Follow'
        : 'Uploaded';
    });
  }

  getImgLink() {
    this.dataSource.forEach((docObj: any) => {
      docObj['temp'] = {};
      for (let s of docObj.screenShots) {
        this.dbx.getTempLink(s.path_display).subscribe((res: any) => {
          let temp = [];
          temp.push(res.result.link);
          docObj.temp['screenShots'] = temp;
        });
      }
    });
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
        case 'viewSS':
          this.viewScreenshots(event.obj);
          break;
        case 'viewPOI':
          this.viewProofOfIdentity(event.obj);
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

  viewScreenshots(doc: any) {
    console.log(doc);
    this.dialog.open(ViewScreenshotComponent, {
      data: {
        document: doc,
      },
      height: 'auto',
      width: '70%',
    });
  }

  viewProofOfIdentity(doc: any) {
    console.log(doc);
    this.dialog.open(ViewProofOfIdentityComponent, {
      data: {
        document: doc,
        header: 'View Registration Details',
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

  downloadSS(data: any) {
    console.log(data);
    this.pdf.generateScreenShotPDF(data);
  }

  onDownloadExcelBtn(event: any) {
    console.log(event);
    var sb = this.snackbar.open('Exporting File. Please wait...', '', {
      verticalPosition: 'bottom',
    });
    let api: any;
    if (this.header == 'NOTARY') {
      if (event.label === 'Notarized') {
        event.query.find = event.query.find.concat(NOTARY_FIND_NOTARIZED);
        api = this.api.document.getAll(event.query);
      } else if (event.label === 'Unnotarized') {
        event.query.find = event.query.find.concat(NOTARY_FIND_UNNOTARIZED);
        api = this.api.document.getAll(event.query);
      } else {
        event.query.find = event.query.find.concat(FIND_ALL);
        api = this.api.document.getAll(event.query);
      }
    } else {
      if (event.label === 'Notarized') {
        event.query.find = event.query.find.concat(FIND_NOTARIZED);
        event.query.find.push({
          field: '_barangay.brgyCode',
          operator: '=',
          value: this.me._barangay.brgyCode,
        });
        api = this.api.document.getAll(event.query);
      } else if (event.label === 'Unnotarized') {
        event.query.find = event.query.find.concat(FIND_UNNOTARIZED);
        api = this.api.document.getAll(event.query);
      } else {
        event.query.find = event.query.find.concat(FIND_ALL);
        api = this.api.document.getAll(event.query);
      }
    }
    api.subscribe(
      (res: any) => {
        console.log(res);
        var json: any = [];
        res.env.documents.forEach((doc: any) => {
          var exlObj: any = {};
          event.columns.forEach((col: any) => {
            if (col.type == 'text') {
              exlObj[col.title] = this.util.deepFind(doc, col.path);
            }
            if (col.type == 'special') {
              let spArray = [];
              for (let c of col.paths) {
                spArray.push(this.util.deepFind(doc, c));
              }
              console.log(spArray);
              exlObj[col.title] = spArray.join(' ');
            }
            if (col.type == 'date') {
              exlObj[col.title] =
                new Date(this.util.deepFind(doc, col.path)).toDateString() +
                ' - ' +
                new Date(this.util.deepFind(doc, col.path)).toLocaleTimeString(
                  'en-US'
                );
            }
          });
          json.push(exlObj);
        });
        this.excel.exportAsExcelFile(json, new Date().toDateString());
        sb.dismiss();
      },
      (err: any) => {
        sb.dismiss();
        this.snackbar.open(
          'Something went wrong before downloading. Please try again later',
          'Okay',
          {
            verticalPosition: 'bottom',
            duration: 4000,
          }
        );
      }
    );
  }
}