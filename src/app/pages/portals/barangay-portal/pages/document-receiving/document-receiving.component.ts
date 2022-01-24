import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { Column } from 'src/app/models/column.interface';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { AutoCompleteComponent } from 'src/app/shared/components/auto-complete/auto-complete.component';
import { DOCUMENT_RECEIVING_TABLE, DOC_RECEIVING_BOTTOMSHEET } from './config';
import { ViewDocumentComponent } from 'src/app/shared/components/view-document/view-document.component';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';
import { ViewVideoComponent } from 'src/app/shared/components/view-video/view-video.component';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';

@Component({
  selector: 'app-document-receiving',
  templateUrl: './document-receiving.component.html',
  styleUrls: ['./document-receiving.component.scss'],
})
export class DocumentReceivingComponent implements OnInit {
  dataSource: Array<any> = [];
  columns: Column[] = DOCUMENT_RECEIVING_TABLE;
  bottomSheet: BottomSheetItem[] = DOC_RECEIVING_BOTTOMSHEET;
  dataLength: number = 0;
  page: any = {
    pageSize: 10,
    pageIndex: 1,
  };
  loading: boolean = false;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private util: UtilService,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    this.fetchData(this.page);
  }

  fetchData(event: TableOutput) {
    this.dataSource = [];
    this.loading = true;
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    let query: QueryParams = {
      find: [],
      page: event.pageIndex,
      limit: event.pageSize + '',
      populates: [
        {
          field: '_createdBy',
        },
      ],
    };
    if (event.filter) query.filter = event.filter;
    if (event.sort) {
      query.sort =
        (event.sort.direction === 'asc' ? '' : '-') + event.sort.active;
    }

    this.api.transaction.getAll(query).subscribe(
      (res: any) => {
        // console.log(res);
        this.dataSource = res.env.transactions;
        this.dataLength = res.total;
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'viewDoc':
        this.viewAttachments(event.obj._documents);
        break;
      case 'viewInfo':
        event.obj.sender;
        this.viewPersonalInfo(event.obj.sender);
        break;
      case 'viewVid':
        this.viewVideoOfSigning(event.obj.videoOfSignature.path_display);
        break;
      default:
    }
  }

  viewVideoOfSigning(path_display: string) {
    this.dbx.getTempLink(path_display).subscribe(
      (res: any) => {
        this.dialog.open(ViewVideoComponent, {
          width: '50%',
          disableClose: true,
          data: { video: res.result.link, header: 'Video of Signing' },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewPersonalInfo(obj: any) {
    this.dialog.open(RegistrantFormComponent, {
      data: { header: `View Information`, obj },
      disableClose: true,
      width: 'auto',
      height: 'auto',
    });
  }

  viewAttachments(docs: any) {
    console.log(docs);
    // this.dialog.open(ViewDocumentComponent, {
    //   data: event.obj,
    //   disableClose: true,
    //   width: 'auto',
    //   height: 'auto',
    // });
  }
}
