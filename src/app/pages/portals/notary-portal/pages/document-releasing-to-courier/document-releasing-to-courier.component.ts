import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
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

@Component({
  selector: 'app-document-releasing-to-courier',
  templateUrl: './document-releasing-to-courier.component.html',
  styleUrls: ['./document-releasing-to-courier.component.scss'],
})
export class DocumentReleasingToCourierComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;
  filtBtnConfig = NOTARY_DOC_RELEASING_TO_COURIER_CONFIG;
  isCheckbox: boolean = true;
  checkBoxDisableField = DOC_RELEASING_DISABLE_CHECKBOX;
  selected = [];
  currTable: any;
  currPopulate: any;
  loading: boolean = true;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_receivedBy',
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
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    this.auth.me().subscribe((res: any) => {
      this.me = res.env.user;
      console.log(this.me);
    });

    this.fetchData(this.page);
  }

  fetchData(event: TableOutput) {
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

  onRowClick(event: any) {
    console.log(event);
    this.dialog.open(ViewTransactionComponent, {
      data: { event, column: VIEW_TRANSACTION_TABLE_DOC_RELEASING },
      height: 'auto',
      width: '85%',
      disableClose: true,
    });
  }

  onRouteActivate() {
    console.log('Here');
    let count = this.router.url.split('/').length;
    console.log(count);
    this.routeLength = count;
  }

  onCheckBoxSelect(event: any) {
    console.log(event);
    this.selected = event;
  }

  onMark() {
    let ids: any = [];
    this.selected.forEach((id: any) => {
      ids.push(id);
    });

    this.dialog
      .open(MarkAsEnrouteComponent, {
        data: { selected: ids, me: this.me },
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
