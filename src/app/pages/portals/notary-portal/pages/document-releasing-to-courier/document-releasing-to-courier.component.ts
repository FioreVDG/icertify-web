import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { ViewTransactionComponent } from '../document-receiving/view-transaction/view-transaction.component';
import {
  DELIVERED_FIND,
  ENROUTE_FIND,
  FOR_PICKUP_FIND,
  NOTARY_DOC_RELEASING_TO_COURIER_CONFIG,
} from './config';

@Component({
  selector: 'app-document-releasing-to-courier',
  templateUrl: './document-releasing-to-courier.component.html',
  styleUrls: ['./document-releasing-to-courier.component.scss'],
})
export class DocumentReleasingToCourierComponent implements OnInit {
  filtBtnConfig = NOTARY_DOC_RELEASING_TO_COURIER_CONFIG;
  isCheckbox: boolean = true;
  checkBoxDisableField = 'Status';
  selected = [];
  currTable: any;
  currPopulate: any;
  loading: boolean = true;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_enrouteBy',
      },
      {
        field: '_receivedBy',
      },
      {
        field: '_receivedByBarangay',
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
      find: [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      populates: event.populate ? event.populate : [],
    };

    if (event.label === 'For Pickup') {
      query.find = FOR_PICKUP_FIND;
    } else if (event.label === 'Enroute') {
      query.find = ENROUTE_FIND;
    } else if (event.label === 'Delivered') {
      query.find = DELIVERED_FIND;
    }

    this.api.transaction.getAllFolder(query).subscribe(
      (res: any) => {
        this.loading = false;
        console.log(res);
        this.dataSource = res.folders;
        this.dataLength = res.count;
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
      data: event,
      height: 'auto',
      width: '70%',
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
      ids.push(id._id);
    });
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          msg: 'Mark as received batch/es?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          let apiQueries = ids.map((id: any) => {
            return this.api.folder.update(
              {
                _enrouteBy: this.me._id,
                location: 'Road',
              },
              id
            );
          });

          forkJoin(apiQueries).subscribe((res: any) => {
            console.log(res);
            this.dialog
              .open(ActionResultComponent, {
                data: {
                  success: true,
                  msg: `Batch/es successfully enrouted.`,
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
}
