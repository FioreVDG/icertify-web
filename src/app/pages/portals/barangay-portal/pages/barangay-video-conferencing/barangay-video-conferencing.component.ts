import { ApiService } from 'src/app/service/api/api.service';
import { Component, OnInit } from '@angular/core';
import { CONFERENCE_TABLE } from './config';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ViewBatchTransactionsComponent } from './view-batch-transactions/view-batch-transactions.component';
import { QueryParams } from 'src/app/models/queryparams.interface';

@Component({
  selector: 'app-barangay-video-conferencing',
  templateUrl: './barangay-video-conferencing.component.html',
  styleUrls: ['./barangay-video-conferencing.component.scss'],
})
export class BarangayVideoConferencingComponent implements OnInit {
  columns = CONFERENCE_TABLE;
  loading: boolean = true;
  dataSource = [];
  dataLength: number = 0;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_notaryId',
      },
    ],
  };
  currentTable: any;
  me: any;
  constructor(
    private api: ApiService,
    private store: Store<{ user: User }>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
      this.fetchData(this.page);
    });

    this.getActiveConference();
  }

  fetchData(event: any) {
    console.log(event);
    this.loading = true;

    // event.label = event.label === undefined ? 'For Scheduling' : event.label;

    console.log(event);
    let query = {
      find: [
        {
          field: '_brgyId',
          operator: '=',
          value: this.me._brgyId,
        },
      ],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populate,
    };

    console.log(query);
    this.api.conference.getAll(query).subscribe((res: any) => {
      this.loading = false;
      console.log(res);
      this.dataSource = res.env.conferences;
      this.dataLength = res.total;
    });

    this.currentTable = event.label;
  }

  tableUpdateEmit(event: any) {
    console.log(event);
    event.label = event.label || this.currentTable;
    this.fetchData(event);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onRowClick(event: any) {
    console.log(event);
    this.dialog.open(ViewBatchTransactionsComponent, {
      data: event,
      height: 'auto',
      width: '70%',
    });
  }

  getActiveConference() {
    console.log('check here');
    let query: QueryParams = {
      find: [],
    };
    this.api.room.get(query).subscribe(
      (res: any) => {
        console.log(res.env.room);
        setTimeout(() => {
          this.getActiveConference();
        }, 5000);
      },
      (err) => {
        setTimeout(() => {
          this.getActiveConference();
        }, 5000);
      }
    );
  }
}
