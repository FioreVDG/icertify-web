import { ActivatedRoute } from '@angular/router';
import { QueryParams } from './../../../../../../models/queryparams.interface';
import { ApiService } from './../../../../../../service/api/api.service';
import { Component, OnInit } from '@angular/core';
import { BATCH_DELIVERY_BOTTOMSHEET, TRANSAC_TABLE_COLUMN } from './config';
import { MatDialog } from '@angular/material/dialog';
import { ViewDocumentComponent } from 'src/app/shared/components/view-document/view-document.component';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';

@Component({
  selector: 'app-batch-folder',
  templateUrl: './batch-folder.component.html',
  styleUrls: ['./batch-folder.component.scss'],
})
export class BatchFolderComponent implements OnInit {
  loading = true;
  column = TRANSAC_TABLE_COLUMN;
  bsConfig = BATCH_DELIVERY_BOTTOMSHEET;
  dataSource = [];
  folderId: any;
  dataLength: number = 0;
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.folderId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log(this.folderId);
    this.fetchData(this.page);
  }
  fetchData(event: any) {
    let qry: QueryParams = {
      find: [{ field: '_folderId', operator: '=', value: this.folderId }],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      populates: [
        {
          field: '_createdBy',
          select: 'firstName,lastName',
        },
      ],
    };

    this.api.transaction.getAll(qry).subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.env.transactions;
      this.dataLength = res.total;
    });
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
