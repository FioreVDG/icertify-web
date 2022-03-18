import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { Column } from 'src/app/models/column.interface';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { AutoCompleteComponent } from 'src/app/shared/components/auto-complete/auto-complete.component';
import {
  DOCUMENT_RECEIVING_TABLE,
  DOC_RECEIVING_BOTTOMSHEET,
  DOC_RECEIVING_FIND,
} from './config';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';
import { ViewVideoComponent } from 'src/app/shared/components/view-video/view-video.component';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { forkJoin } from 'rxjs';
import { ViewAttachmentsComponent } from 'src/app/shared/components/view-attachments/view-attachments.component';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { Cluster } from 'src/app/models/cluster.interface';

@Component({
  selector: 'app-document-receiving',
  templateUrl: './document-receiving.component.html',
  styleUrls: ['./document-receiving.component.scss'],
})
export class DocumentReceivingComponent implements OnInit {
  settings: any;
  me: any;
  dataSource: any[] = [];
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
    private dbx: DropboxService,
    private store: Store<{ user: User }>,
    private cluster: Store<{ cluster: Cluster }>
  ) {}

  ngOnInit(): void {
    this.getSettings(this.page);
  }

  getSettings(event: any) {
    this.loading = true;
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      if (!this.settings) {
        // this.api.cluster
        //   .getOne(this.me._barangay.brgyCode)
        //   .subscribe((res: any) => {
        //     this.settings = res.env.cluster;
        //     console.log(this.settings);
        //     this.fetchData(event);
        //   });

        this.cluster.select('cluster').subscribe((res: Cluster) => {
          this.settings = res;
          console.log(res);
          this.fetchData(event);
        });
      } else {
        this.fetchData(event);
      }
    });
  }
  //ssadasdsadsadsadsadsad

  fetchData(event: TableOutput) {
    this.dataSource = [];
    // this.loading = true;
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    let query: QueryParams = {
      find: event.find ? event.find : [],
      page: event.pageIndex,
      limit: event.pageSize + '',
      populates: [],
    };
    query.find = query.find.concat(DOC_RECEIVING_FIND);
    if (event.filter) query.filter = event.filter;
    if (event.sort) {
      query.sort =
        (event.sort.direction === 'asc' ? '' : '-') + event.sort.active;
    }
    if (this.me)
      query.find.push({
        field: '_barangay.brgyCode',
        operator: '=',
        value: this.me._barangay.brgyCode,
      });
    console.log(query);

    this.api.document.getAll(query).subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = res.env.documents;
        if (this.dataSource.length) {
          this.dataSource.forEach((el: any) => {
            if (el.documentType === 'Others')
              el.documentType = `${el.documentType} (${el.documentTypeSpecific})`;
          });
        }
        this.dataLength = res.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
  onRowClick(event: any) {
    // console.log(event);
    switch (event.action) {
      case 'viewDoc':
        this.viewAttachments([event.obj]);
        break;
      case 'viewInfo':
        event.obj.sender;
        this.viewPersonalInfo(event.obj.sender);
        break;
      case 'viewVid':
        this.viewVideoOfSigning(
          event.obj._transactionId.videoOfSignature.path_display
        );
        break;
      default:
    }
  }

  viewVideoOfSigning(path_display: string) {
    const dialogLoader = this.util.startLoading('Fetching video...');

    this.dbx.getTempLink(path_display).subscribe(
      (res: any) => {
        this.dialog
          .open(ViewVideoComponent, {
            width: '50%',
            disableClose: true,
            data: { video: res.result.link, header: 'Video of Signing' },
          })
          .afterOpened()
          .subscribe((res) => {
            this.util.stopLoading(dialogLoader);
          });
      },
      (error) => {
        this.util.stopLoading(dialogLoader);
        console.log(error);
      }
    );
  }

  viewPersonalInfo(obj: any) {
    this.dialog.open(RegistrantFormComponent, {
      data: { header: `Registrant Information`, obj: obj },
      disableClose: true,
      width: 'auto',
      height: 'auto',
    });
  }

  viewAttachments(docs: Array<any>) {
    console.log(docs);
    this.dialog.open(ViewAttachmentsComponent, {
      data: {
        documents: docs,
      },
      height: 'auto',
      width: '70%',
    });
  }
}
