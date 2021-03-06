import { DropboxService } from './../../../../../../service/dropbox/dropbox.service';
import { ActivatedRoute } from '@angular/router';
import { QueryParams } from './../../../../../../models/queryparams.interface';
import { ApiService } from './../../../../../../service/api/api.service';
import { Component, OnInit } from '@angular/core';
import { BATCH_DELIVERY_BOTTOMSHEET, TRANSAC_TABLE_COLUMN } from './config';
import { MatDialog } from '@angular/material/dialog';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';
import { ViewVideoComponent } from 'src/app/shared/components/view-video/view-video.component';
import { ViewAttachmentsComponent } from 'src/app/shared/components/view-attachments/view-attachments.component';
import { UtilService } from 'src/app/service/util/util.service';

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
    private dialog: MatDialog,
    private dbx: DropboxService,
    private util: UtilService
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
        },
        { field: '_documents' },
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
        this.dialog.open(ViewAttachmentsComponent, {
          data: { documents: event.obj._documents },
          disableClose: true,
          width: '70%',
          height: 'auto',
        });
        break;
      case 'viewInfo':
        this.dialog.open(RegistrantFormComponent, {
          data: { header: `Registrant Information`, obj: event.obj.sender },
          disableClose: true,
          width: 'auto',
          height: 'auto',
        });
        break;
      case 'viewVid':
        const dialogLoader = this.util.startLoading('Fetching video...');
        this.dbx.getTempLink(event.obj.videoOfSignature.path_display).subscribe(
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
            console.log(error);
            this.util.stopLoading(dialogLoader);
          }
        );

        break;
      default:
    }
  }
}
