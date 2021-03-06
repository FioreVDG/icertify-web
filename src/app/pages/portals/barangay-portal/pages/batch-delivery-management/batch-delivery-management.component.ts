import { MarkAsEnrouteComponent } from './mark-as-enroute/mark-as-enroute.component';
import { DropboxService } from './../../../../../service/dropbox/dropbox.service';
import { ActionResultComponent } from './../../../../../shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from './../../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import { ApiService } from './../../../../../service/api/api.service';
import {
  FILT_BTN_CONFIG,
  BATCH_DELIVERY_BOTTOMSHEET,
  ENROUTE_FIND_BATCH,
  FOR_PICKUP,
} from './config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';
import { ViewVideoComponent } from 'src/app/shared/components/view-video/view-video.component';
import { ViewAttachmentsComponent } from 'src/app/shared/components/view-attachments/view-attachments.component';
import { ViewTransactionComponent } from '../../../notary-portal/pages/document-receiving/view-transaction/view-transaction.component';
import { TRANSAC_TABLE_COLUMN } from './batch-folder/config';
import { Find } from 'src/app/models/queryparams.interface';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { UtilService } from 'src/app/service/util/util.service';
import _ from 'lodash';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { Cluster } from 'src/app/models/cluster.interface';

@Component({
  selector: 'app-batch-delivery-management',
  templateUrl: './batch-delivery-management.component.html',
  styleUrls: ['./batch-delivery-management.component.scss'],
})
export class BatchDeliveryManagementComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;
  filtBtnConfig = FILT_BTN_CONFIG;
  isCheckbox: boolean = true;
  selected: any = [];
  currTable: any;
  currPopulate: any;
  loading = true;
  bsConfig = BATCH_DELIVERY_BOTTOMSHEET;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [],
    sort: {
      active: 'updatedAt',
      direction: 'desc',
    },
    bottomSheet: this.bsConfig,
  };
  routeLength = 3;
  dataSource: any[] = [];
  isLimit: any;
  setting: any;
  dataLength: number = 0;
  me: any;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private dbx: DropboxService,
    private util: UtilService,
    private cluster: Store<{ cluster: Cluster }>,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.getSetting();
  }
  getSetting() {
    this.store.select('user').subscribe((me: any) => {
      console.log(me._barangay.brgyCode);
      this.me = me;
      if (!this.setting) {
        this.cluster.select('cluster').subscribe((res: Cluster) => {
          this.setting = res;
          let resp: any = res.barangays.find(
            (i: any) => i._barangay.brgyCode === me._barangay.brgyCode
          );
          this.isLimit = resp.maxDoc;
          console.log(this.isLimit);
          this.fetchData(this.page);
        });

        // this.api.cluster.getOne(me._barangay.brgyCode).subscribe((res: any) => {
        //   console.log(res);
        //   this.setting = res.env.cluster;
        //   let resp: any = res.env.cluster.barangays.find(
        //     (i: any) => i._barangay.brgyCode === me._barangay.brgyCode
        //   );
        //   this.isLimit = resp.maxDoc;
        //   console.log(this.isLimit);

        //   this.fetchData(this.page);
        // });
      } else {
        this.fetchData(this.page);
      }
    });
  }
  fetchData(event: any) {
    this.loading = true;
    console.log(event);

    let qry = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populate ? event.populate : [],
      sort: event.sort,
    };
    if (event.filter) qry.filter = event.filter;

    qry.find.push({
      field: '_barangay.brgyCode',
      operator: '=',
      value: this.me._barangay.brgyCode,
    });
    console.log(qry);

    let api: any;
    if (event && event.label === 'Enroute') {
      qry.find = qry.find.concat(ENROUTE_FIND_BATCH);
      qry.populates.push({ field: '_riderFromBarangay', select: '-__v' });
      api = this.api.transaction.getAllFolder(qry);
    } else {
      qry.find = qry.find.concat(FOR_PICKUP);
      api = this.api.document.getAll(qry);
    }

    api.subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource =
          res.env && res.env.documents ? res.env.documents : res.folders;

        if (res.env) {
          if (this.dataSource.length) {
            this.dataSource.forEach((el: any) => {
              if (el.documentType === 'Others')
                el.documentType = `${el.documentType} (${el.documentTypeSpecific})`;
            });
          }
        }

        this.dataLength = res.total;
        this.loading = false;
        console.log('Here');
      },
      (error: any) => {
        console.log(error);
        this.loading = false;
      }
    );
    this.currTable = event.label;
    this.page.populate = event.populate;
    this.isCheckbox = event.isCheckbox || true;
    this.bsConfig = event.bottomSheet;
  }
  tableUpdateEmit(event: any) {
    this.selected = [];
    event['label'] = event.label || this.currTable;
    // console.log(event.populate);
    this.fetchData(event);
    // this.loading = false;

    // console.log(event);
  }
  onCheckBoxSelect(event: any) {
    //filter duplicates
    event.forEach((i: any) => {
      if (!_.some(this.selected, { _id: i._id })) {
        this.selected.push(i);
      }
    });
    // console.log(this.selected);
  }
  onMark() {
    let ids: any = [];
    console.log(this.selected);
    this.selected.forEach((id: any) => {
      ids.push({ ids: id._transactionId, docDetails: id });
    });
    // ids = ids.join(',');
    // console.log(ids);
    this.dialog
      .open(MarkAsEnrouteComponent, {
        width: '70% ',
        data: { obj: ids, setting: this.setting },
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.appTable?.checkedRows.clear();
          this.fetchData(this.page);
          this.selected = [];
        }
      });
  }
  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'viewDoc':
        this.dialog.open(ViewAttachmentsComponent, {
          data: { documents: [event.obj] },
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
      case 'viewTransac':
        this.onViewTransac(event.obj);
        break;
      case 'viewVid':
        const dialogLoader = this.util.startLoading('Fetching video...');

        this.dbx
          .getTempLink(event.obj._transactionId.videoOfSignature.path_display)
          .subscribe(
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

        break;
      default:
    }
  }

  onMarkButtonClick(event: any) {
    // console.log(event);
    switch (event.action) {
      case 'enroute':
        this.onMark();
        break;

      default:
        break;
    }
  }

  onViewTransac(obj: any) {
    this.dialog.open(ViewTransactionComponent, {
      data: { event: obj, column: TRANSAC_TABLE_COLUMN },
      height: 'auto',
      width: '85%',
      disableClose: true,
    });
    // this.router.navigate([
    //   `/barangay-portal/batch-delivery-management/batch-folder`,
    //   obj._id,
    // ]);
  }

  onRouteActivate() {
    // console.log('Here');
    let count = this.router.url.split('/').length;
    // console.log(count);
    this.routeLength = count;
  }
}
