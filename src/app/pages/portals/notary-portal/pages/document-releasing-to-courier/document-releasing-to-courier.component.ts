import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import _ from 'lodash';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { VIEW_TRANSACTION_TABLE_DOC_RELEASING } from '../document-receiving/view-transaction/config';
import { ViewTransactionComponent } from '../document-receiving/view-transaction/view-transaction.component';
import {
  DELIVERED_FIND,
  DOC_RELEASING_DISABLE_CHECKBOX,
  ENROUTE_FIND,
  FOR_PICKUP_FIND,
  NOTARY_DOC_RELEASING_TO_COURIER_CONFIG,
} from './config';
import { MarkAsEnrouteComponent } from './mark-as-enroute/mark-as-enroute.component';
import { Cluster } from 'src/app/models/cluster.interface';

@Component({
  selector: 'app-document-releasing-to-courier',
  templateUrl: './document-releasing-to-courier.component.html',
  styleUrls: ['./document-releasing-to-courier.component.scss'],
})
export class DocumentReleasingToCourierComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;
  tableFlag = false;
  filtBtnConfig = NOTARY_DOC_RELEASING_TO_COURIER_CONFIG;
  isCheckbox: boolean = true;
  checkBoxDisableField = DOC_RELEASING_DISABLE_CHECKBOX;
  selected: any[] = [];
  currTable: any;
  currPopulate: any;
  loading: boolean = true;
  setting: any;

  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_receivedBy',
      },
      {
        field: '_notaryId',
      },
    ],
    label: 'For Pickup',
  };
  routeLength = 3;
  dataSource = [];
  dataLength: number = 0;
  bsConfig: any;
  me: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private dbx: DropboxService,
    private store: Store<{ user: User }>,
    private cluster: Store<{ cluster: Cluster }>
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
      // this.fetchData(this.page);
      this.tableUpdateEmit(this.page);
    });
  }

  fetchData(event: TableOutput) {
    let brgyCodes: any[] = [];
    if (this.setting) {
      brgyCodes = this.setting.barangays.map((el: any) => {
        return el._barangay.brgyCode;
      });
    }
    this.loading = true;
    console.log(event);

    let query: QueryParams = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      populates: event.populate ? event.populate : [],
    };

    if (event.filter) query.filter = event.filter;
    if (event.sort) {
      query.sort =
        (event.sort.direction === 'asc' ? '' : '-') + event.sort.active;
    }

    if (event.label === 'For Pickup') {
      query.find = query.find.concat(FOR_PICKUP_FIND);
    } else if (event.label === 'Enroute') {
      query.find = query.find.concat(ENROUTE_FIND);
    } else if (event.label === 'Delivered') {
      query.find = query.find.concat(DELIVERED_FIND);
    }
    if (brgyCodes) {
      query.find = query.find.concat({
        field: '_barangay.brgyCode',
        operator: '[in]=',
        value: brgyCodes.join(','),
      });
    }
    console.log(query);

    this.api.transaction.getAllFolder(query).subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = res.folders;
        this.dataLength = res.count;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
    this.currTable = event.label;
    this.page.populate = event.populate ? event.populate : [];

    this.isCheckbox = event.isCheckbox || true;
    this.bsConfig = event.bottomSheet;
  }
  getSettings(event: any) {
    this.store.select('user').subscribe((res: User) => {
      if (!this.setting) {
        // this.api.cluster.getOneNotary(res._notaryId).subscribe((res: any) => {
        //   this.setting = res.env.cluster;
        //   this.addFilterChoices();
        //   this.fetchData(event);
        // });
        this.cluster.select('cluster').subscribe((res: Cluster) => {
          this.setting = res;
          this.addFilterChoices();

          console.log(res);
          this.fetchData(event);
        });
      } else {
        this.fetchData(event);
      }
    });
  }

  addFilterChoices() {
    this.filtBtnConfig.forEach((el: any) => {
      el.column.forEach((col: any) => {
        if (col.path === '_barangay.brgyDesc') {
          let brgyChoices: any[] = [];
          if (this.setting) {
            this.setting.barangays.forEach((barangay: any) => {
              brgyChoices.push(barangay._barangay.brgyDesc);
            });
          }
          console.log(this.setting);
          col.choices = brgyChoices;
        }
      });
    });
    this.tableFlag = true;
  }

  tableUpdateEmit(event: any) {
    event['label'] = event.label || this.currTable;
    console.log(event.populate);
    this.appTable?.checkedRows.clear();
    this.selected = [];
    this.getSettings(event);
    console.log(event);
  }

  onRowClick(event: any) {
    console.log(event);
    this.dialog.open(ViewTransactionComponent, {
      data: { event, column: VIEW_TRANSACTION_TABLE_DOC_RELEASING },
      height: 'auto',
      width: '85%',
      disableClose: true,
    });
  }

  onCheckBoxBtnClick(event: any) {
    switch (event.action) {
      case 'enroute':
        this.onMark();
        break;

      default:
        break;
    }
  }

  onRouteActivate() {
    console.log('Here');
    let count = this.router.url.split('/').length;
    console.log(count);
    this.routeLength = count;
  }

  onCheckBoxSelect(event: any) {
    console.log(event);
    event.forEach((i: any) => {
      if (!_.some(this.selected, { _id: i._id })) {
        this.selected.push(i);
      }
    });
  }

  onMark() {
    let ids: any = [];
    this.selected.forEach((id: any) => {
      ids.push(id);
    });

    this.dialog
      .open(MarkAsEnrouteComponent, {
        data: { selected: ids, me: this.me, setting: this.setting },
        height: 'auto',
        width: '60%',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.fetchData(this.page);
        this.selected = [];
        this.appTable?.checkedRows.clear();
      });

    ///////////////////////
    ///////////////////////
    // this.dialog
    //   .open(AreYouSureComponent, {
    //     data: {
    //       msg: 'Mark as received batch/es?',
    //     },
    //   })
    //   .afterClosed()
    //   .subscribe((res: any) => {
    //     if (res) {
    //       let apiQueries = ids.map((id: any) => {
    //         return this.api.folder.update(
    //           {
    //             _enrouteBy: this.me._id,
    //             location: 'Road',
    //             datePickedFromNotary: new Date(),
    //           },
    //           id
    //         );
    //       });

    //       forkJoin(apiQueries).subscribe((res: any) => {
    //         console.log(res);
    //         this.dialog
    //           .open(ActionResultComponent, {
    //             data: {
    //               success: true,
    //               msg: `Batch/es successfully enrouted.`,
    //               button: 'Okay',
    //             },
    //           })
    //           .afterClosed()
    //           .subscribe((res: any) => {
    //             this.fetchData(this.page);
    //             this.selected = [];
    //           });
    //       });
    //     }
    //   });
  }
}
