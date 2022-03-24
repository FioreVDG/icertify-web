import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Column } from 'src/app/models/column.interface';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { UtilService } from 'src/app/service/util/util.service';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';
import { ViewAttachmentsComponent } from 'src/app/shared/components/view-attachments/view-attachments.component';
import { ViewScreenshotComponent } from 'src/app/shared/components/view-screenshot/view-screenshot.component';
import { ViewVideoComponent } from 'src/app/shared/components/view-video/view-video.component';
import { BrgyRoomComponent } from '../../barangay-video-conferencing/brgy-room/brgy-room.component';
import {
  FOLDER_TRANSACTION_BOTTOMSHEET,
  FOLDER_TRANSACTION_TABLE,
} from './config';

@Component({
  selector: 'app-view-folder-transactions',
  templateUrl: './view-folder-transactions.component.html',
  styleUrls: ['./view-folder-transactions.component.scss'],
})
export class ViewFolderTransactionsComponent implements OnInit {
  dataSource: Array<any> = [];
  columns: Column[] = FOLDER_TRANSACTION_TABLE;
  bottomSheet = FOLDER_TRANSACTION_BOTTOMSHEET;
  dataLength: number = 0;
  page: any = {
    pageSize: 10,
    pageIndex: 1,
  };
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewFolderTransactionsComponent>,
    private api: ApiService,
    private dbx: DropboxService,
    private dialog: MatDialog,
    private util: UtilService
  ) {}
  ngOnInit(): void {
    console.log(this.data);

    this.fetchData(this.page);
  }

  filterColumn() {
    if (this.data.table === 'For Receiving') {
      this.columns.forEach((el: any, index) => {
        if (el.path === '_transactionId._folderId.dateReceivedByBrgy') {
          this.columns[index].selected = false;
        } else {
          this.columns[index].selected = true;
        }
      });
    } else {
      this.columns.forEach((el: any, index) => {
        if (el.path === '_transactionId._folderId.datePickedByRiderFromBrgy') {
          this.columns[index].selected = false;
        } else {
          this.columns[index].selected = true;
        }
      });
    }
  }

  fetchData(event: TableOutput) {
    this.filterColumn();
    this.dataSource = [];
    this.loading = true;
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    let ids: any[] = this.data.event._transactions.map((el: any) => {
      return el._id;
    });

    let query: QueryParams = {
      find: [
        { field: '_transactionId', operator: '[in]=', value: ids.join(',') },
      ],
      page: event.pageIndex,
      limit: event.pageSize + '',
      populates: [],
    };

    if (event.find) query.find = query.find.concat(event.find);
    if (event.filter) query.filter = event.filter;
    if (event.sort) {
      query.sort =
        (event.sort.direction === 'asc' ? '' : '-') + event.sort.active;
    }

    // console.log(query);
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

    // this.api.transaction.getAll(query).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     this.dataSource = res.env.transactions;
    //     this.dataLength = res.total;
    //     this.loading = false;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //     this.loading = false;
    //   }
    // );
  }

  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'startConference':
        this.startConference(event);
        break;
      case 'viewDoc':
        this.viewAttachments(event.obj, event.obj.refCode);
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
      case 'viewSS':
        this.dialog.open(ViewScreenshotComponent, {
          data: {
            document: event.obj,
          },
          height: 'auto',
          width: '70%',
        });

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
      data: { header: `Registrant Information`, obj },
      disableClose: true,
      width: 'auto',
      height: 'auto',
    });
  }

  viewAttachments(docs: Array<any>, refCode: string) {
    console.log(docs);
    this.dialog.open(ViewAttachmentsComponent, {
      data: {
        documents: [docs],
        refCode: refCode,
      },
      height: 'auto',
      width: '70%',
    });
  }
}
