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
    private util: UtilService
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
    // console.log(event);
    switch (event.action) {
      case 'viewDoc':
        this.dialog.open(ViewDocumentComponent, {
          data: event.obj,
          disableClose: true,
          width: 'auto',
          height: 'auto',
        });
        break;
      case 'viewInfo':
        this.dialog.open(RegistrantFormComponent, {
          data: { header: `View Information`, obj: event.obj.sender },
          disableClose: true,
          width: 'auto',
          height: 'auto',
        });
        break;
      default:
    }
  }
}
