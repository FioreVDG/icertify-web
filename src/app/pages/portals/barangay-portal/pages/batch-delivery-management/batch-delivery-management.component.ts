import { ActionResultComponent } from './../../../../../shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from './../../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import { ApiService } from './../../../../../service/api/api.service';
import { FILT_BTN_CONFIG, BATCH_DELIVERY_BOTTOMSHEET } from './config';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewDocumentComponent } from 'src/app/shared/components/view-document/view-document.component';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';

@Component({
  selector: 'app-batch-delivery-management',
  templateUrl: './batch-delivery-management.component.html',
  styleUrls: ['./batch-delivery-management.component.scss'],
})
export class BatchDeliveryManagementComponent implements OnInit {
  filtBtnConfig = FILT_BTN_CONFIG;
  isCheckbox: boolean = true;
  selected = [];
  currTable: any;
  currPopulate: any;
  loading = true;
  bsConfig = BATCH_DELIVERY_BOTTOMSHEET;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_createdBy',
        select: 'firstName,lastName',
      },
    ],
    bottomSheet: this.bsConfig,
  };
  routeLength = 3;
  dataSource = [];
  dataLength: number = 0;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData(this.page);
  }
  fetchData(event: any) {
    console.log(event);

    let qry = {
      find: [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populate,
    };

    console.log(qry);
    let api: any;
    if (event && event.label === 'Enroute') {
      api = this.api.transaction.getAllFolder(qry);
    } else api = this.api.transaction.getAll(qry);

    api.subscribe((res: any) => {
      console.log(res);
      this.dataSource =
        res.env && res.env.transactions ? res.env.transactions : res.folders;
      this.dataLength = res.count;
    });
    this.currTable = event.label;
    this.page.populate = event.populate;
    this.isCheckbox = event.isCheckbox || true;
    this.bsConfig = event.bottomSheet;
  }
  tableUpdateEmit(event: any) {
    event['label'] = event.label || this.currTable;
    console.log(event.populate);
    this.fetchData(event);
    setTimeout(() => {
      this.loading = false;
      console.log(this.loading);
    }, 1000);
    console.log(event);
  }
  onCheckBoxSelect(event: any) {
    console.log(event);
    this.selected = event;
  }
  onMark() {
    let ids: any = [];
    this.selected.forEach((id: any) => {
      ids.push(id._id);
    });
    ids = ids.join(',');
    console.log(ids);
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          msg: 'Enroute this/these transaction/s',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.api.transaction
            .createBatchTransaction(ids)
            .subscribe((res: any) => {
              console.log(res);
              this.dialog
                .open(ActionResultComponent, {
                  data: {
                    success: true,
                    msg: `Batch ${res.env.batched.folderName} successfully marked as enroute!`,
                    button: 'Okay',
                  },
                })
                .afterClosed()
                .subscribe((res: any) => {
                  this.fetchData(this.page);
                  this.selected = [];
                });
            });
        }
      });
  }
  onRowClick(event: any) {
    console.log(event);
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
      case 'viewTransac':
        this.onViewTransac(event.obj);
        break;
      default:
    }
  }

  onViewTransac(obj: any) {
    this.router.navigate([
      `/barangay-portal/batch-delivery-management/batch-folder`,
      obj._id,
    ]);
  }

  onRouteActivate() {
    console.log('Here');
    let count = this.router.url.split('/').length;
    console.log(count);
    this.routeLength = count;
  }
}
