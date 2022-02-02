import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Column } from 'src/app/models/column.interface';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { RoomComponent } from 'src/app/pages/portals/notary-portal/pages/video-conferencing/room/room.component';
import { ApiService } from 'src/app/service/api/api.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';
import { ViewAttachmentsComponent } from 'src/app/shared/components/view-attachments/view-attachments.component';
import { ViewVideoComponent } from 'src/app/shared/components/view-video/view-video.component';
import { BrgyRoomComponent } from '../brgy-room/brgy-room.component';
import {
  BATCH_TRANSACTION_BOTTOMSHEET,
  BATCH_TRANSACTION_TABLE,
} from './config';

@Component({
  selector: 'app-view-batch-transactions',
  templateUrl: './view-batch-transactions.component.html',
  styleUrls: ['./view-batch-transactions.component.scss'],
})
export class ViewBatchTransactionsComponent implements OnInit {
  dataSource: Array<any> = [];
  columns: Column[] = BATCH_TRANSACTION_TABLE;
  bottomSheet = BATCH_TRANSACTION_BOTTOMSHEET;
  dataLength: number = 0;
  page: any = {
    pageSize: 10,
    pageIndex: 1,
  };
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewBatchTransactionsComponent>,
    private api: ApiService,
    private dbx: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.fetchData(this.page);
  }

  fetchData(event: TableOutput) {
    this.dataSource = [];
    this.loading = true;
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    let folderIds: any[] = [];
    this.data._folderIds.forEach((folders: any) => {
      folderIds.push(folders._id);
    });

    let query: QueryParams = {
      find: [
        { field: '_folderId', operator: '[in]=', value: folderIds.toString() },
      ],
      page: event.pageIndex,
      limit: event.pageSize + '',
      populates: [{ field: '_folderId' }, { field: '_documents' }],
    };
    if (event.filter) query.filter = event.filter;
    if (event.sort) {
      query.sort =
        (event.sort.direction === 'asc' ? '' : '-') + event.sort.active;
    }

    this.api.transaction.getAll(query).subscribe(
      (res: any) => {
        console.log(res);
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
      case 'startConference':
        this.startConference(event);
        break;
      case 'viewDoc':
        this.viewAttachments(event.obj._documents, event.obj.refCode);
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

  startConference(selected: any) {
    this.dialog.open(BrgyRoomComponent, {
      data: selected,
      minHeight: '100vh',
      minWidth: '100vw',
      panelClass: 'dialog-no-padding',
    });
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
}
