import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Dropbox } from 'dropbox';
import { Column } from 'src/app/models/column.interface';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { ViewAttachmentsComponent } from '../view-attachments/view-attachments.component';
import { VIEW_DOC_TABLE } from './config';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss'],
})
export class ViewDocumentComponent implements OnInit {
  dataSource: Array<any> = [];
  columns: Column[] = VIEW_DOC_TABLE;
  dataLength: number = 0;
  page: any = {
    pageSize: 10,
    pageIndex: 1,
  };
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewDocumentComponent>,
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

    let query: QueryParams = {
      find: [
        {
          field: '_transactionId',
          operator: '=',
          value: this.data._id,
        },
      ],
      page: event.pageIndex,
      limit: event.pageSize + '',
    };
    if (event.filter) query.filter = event.filter;
    if (event.sort) {
      query.sort =
        (event.sort.direction === 'asc' ? '' : '-') + event.sort.active;
    }

    this.api.document.getAll(query).subscribe(
      (res: any) => {
        this.dataSource = res.env.documents;
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
    // console.log(event);
    this.dbx.getTempLink(event.dropbox.path_display).subscribe((res: any) => {
      console.log(res);
      this.dialog.open(ViewAttachmentsComponent, {
        data: { link: res.result.link },
        height: 'auto',
        width: '70%',
      });
    });
  }
}
