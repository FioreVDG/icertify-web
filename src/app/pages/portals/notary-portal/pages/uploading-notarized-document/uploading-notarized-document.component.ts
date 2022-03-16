import { UploadNotirizedDocumentComponent } from './upload-notirized-document/upload-notirized-document.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { UtilService } from 'src/app/service/util/util.service';
import { ViewAttachmentsComponent } from 'src/app/shared/components/view-attachments/view-attachments.component';
import { FILT_BTN_CONFIG, FIND_FOR_UPLOADING, FIND_UPLOADED } from './config';
import { Cluster } from 'src/app/models/cluster.interface';

@Component({
  selector: 'app-uploading-notarized-document',
  templateUrl: './uploading-notarized-document.component.html',
  styleUrls: ['./uploading-notarized-document.component.scss'],
})
export class UploadingNotarizedDocumentComponent implements OnInit {
  filtBtnConfig = FILT_BTN_CONFIG;
  tableFlag = false;
  selected = [];
  currTable: any;
  currPopulate: any;
  loading = true;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      // {
      //   field: '_createdBy',
      // },
    ],
    label: 'For Uploading',
  };
  routeLength = 3;
  dataSource = [];
  dataLength: number = 0;
  me: any;
  setting: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private store: Store<{ user: User }>,
    private cluster: Store<{ cluster: Cluster }>,
    private util: UtilService,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
      this.tableUpdateEmit(this.page);
    });
  }

  fetchData(event: any) {
    this.loading = true;
    console.log(event);
    let brgyCodes: any[] = [];
    if (this.setting) {
      brgyCodes = this.setting.barangays.map((el: any) => {
        return el._barangay.brgyCode;
      });
    }
    console.log(this.setting);

    let qry = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populate ? event.populate : [],
    };
    if (event.filter) qry.filter = event.filter;
    let api: any;
    if (brgyCodes) {
      qry.find = qry.find.concat({
        field: '_barangay.brgyCode',
        operator: '[in]=',
        value: brgyCodes.join(','),
      });
    }
    if (event && event.label === 'For Uploading') {
      qry.find = qry.find.concat(FIND_FOR_UPLOADING);
      api = this.api.document.getAll(qry);
    } else {
      qry.find = qry.find.concat(FIND_UPLOADED);
      api = this.api.document.getAll(qry);
    }

    console.log(qry);
    api.subscribe((res: any) => {
      console.log(res);
      if (res.status == 'Success') {
        this.dataSource = res.env.documents;
        if (this.dataSource.length) {
          this.dataSource.forEach((el: any) => {
            if (el.documentType === 'Others')
              el.documentType = `${el.documentType} (${el.documentTypeSpecific})`;
          });
        }

        this.dataLength = res.total;
      }
      this.loading = false;
    });
    this.currTable = event.label;
    this.page.populate = event.populate;
  }

  tableUpdateEmit(event: any) {
    this.loading = true;
    event['label'] = event.label || this.currTable;
    console.log(event.populate);
    this.getSettings(event);
    console.log(event);
  }
  getSettings(event: any) {
    this.store.select('user').subscribe((res: User) => {
      if (!this.setting) {
        // this.api.cluster.getOneNotary(res._notaryId).subscribe((res: any) => {
        //   this.setting = res.env.cluster;
        //   this.addFilterChoices();
        //   this.fetchData(event);
        // });
        this.cluster.select('cluster').subscribe((res: Cluster) => {
          this.setting = res;
          console.log(res);
          this.addFilterChoices();
          this.fetchData(event);
        });
      } else {
        this.fetchData(event);
      }
    });
  }

  addFilterChoices() {
    this.filtBtnConfig.forEach((el: any) => {
      el.column.forEach((col: any) => {
        if (col.path === '_barangay.brgyDesc') {
          let brgyChoices: any[] = [];
          if (this.setting) {
            this.setting.barangays.forEach((barangay: any) => {
              brgyChoices.push(barangay._barangay.brgyDesc);
            });
          }
          console.log(this.setting);
          col.choices = brgyChoices;
        }
      });
    });
    this.tableFlag = true;
  }

  onRowClick(event: any) {
    console.log(event);
    if (this.currTable != 'Uploaded') {
      this.dialog
        .open(UploadNotirizedDocumentComponent, {
          height: 'auto',
          width: '70%',
          data: event,
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.fetchData(this.page);
          }
        });
    } else {
      this.dbx
        .getTempLink(event.notarizedDocument.dropbox.path_display)
        .subscribe((res: any) => {
          console.log(res);
          let fileType = event.dropbox.name.split('.');
          console.log(fileType);
          fileType = fileType[fileType.length - 1].toLowerCase();
          this.dialog.open(ViewAttachmentsComponent, {
            data: {
              documents: [event],
              // obj: event,
              // link: res.result.link,
              // isImg: fileType === 'pdf' ? false : true,
            },
            height: 'auto',
            width: '70%',
          });
        });
    }
  }
}
