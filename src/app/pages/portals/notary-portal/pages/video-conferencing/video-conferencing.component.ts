import { Store } from '@ngrx/store';
import { RoomComponent } from './room/room.component';
import { SetScheduleComponent } from './set-schedule/set-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './../../../../../service/api/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FILT_BTN } from './config';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ViewTransactionComponent } from '../document-receiving/view-transaction/view-transaction.component';
import { VIEW_TRANSACTION_TABLE } from '../document-receiving/view-transaction/config';
import { TRANSAC_TABLE_COLUMN } from '../../../barangay-portal/pages/batch-delivery-management/batch-folder/config';
import { User } from 'src/app/models/user.interface';
import _ from 'lodash';

@Component({
  selector: 'app-video-conferencing',
  templateUrl: './video-conferencing.component.html',
  styleUrls: ['./video-conferencing.component.scss'],
})
export class VideoConferencingComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;
  filterBtnConfig = FILT_BTN;
  isCheckbox: boolean = true;
  selected: any = [];
  loading: boolean = true;
  dataSource = [];
  dataLength: number = 0;
  currFetch: string = '';
  currentTable: any;
  limit: any;
  disabler: boolean = false;
  notaryName: string = '';

  settings: any;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_receivedByNotary',
        select: 'firstName,lastName',
      },
      {
        field: '_transactions',
        select: '-__v',
      },
    ],
  };
  pageLeave = {
    pageSize: 10,
    pageIndex: 1,
    label: 'Scheduled',
    populate: [
      {
        field: '_receivedByNotary',
        select: 'firstName,lastName',
      },
      {
        field: '_transactions',
        select: '-__v',
      },
    ],
  };
  countSelected: any;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.getSettings();
  }

  getSettings() {
    this.store.select('user').subscribe((res: User) => {
      this.api.cluster.getOneNotary(res._notaryId).subscribe((res: any) => {
        console.log(res);
        this.settings = res.env.cluster;
        this.limit = res.env.cluster.totals.maxDoc;
        this.fetchData(event);
        console.log(res);
        this.notaryName = `${res.env.cluster._notaryId.firstName} ${res.env.cluster._notaryId.middleName} ${res.env.cluster._notaryId.lastName}`;
      });
    });
  }

  fetchData(event: any) {
    console.log(event);
    this.loading = true;
    let brgyCodes: any[] = [];
    if (this.settings) {
      brgyCodes = this.settings.barangays.map((el: any) => {
        return el._barangay.brgyCode;
      });
    }

    event.label = event.label === undefined ? 'For Scheduling' : event.label;

    console.log(event);
    let query = {
      find: [
        {
          field: 'folderStatus',
          operator: '=',
          value: event.label,
        },
      ],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populate,
    };
    if (brgyCodes) {
      query.find = query.find.concat({
        field: '_barangay.brgyCode',
        operator: '[in]=',
        value: brgyCodes.join(','),
      });
    }

    console.log(query);
    this.api.transaction.getAllFolder(query).subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.folders;
      this.dataLength = res.total;
      this.limit = res.total;
      this.loading = false;
      let countArr: any = [];
      this.dataSource.forEach((data: any) => {
        countArr.push(data.transactionCount);
      });
      console.log(countArr);
      this.countSelected = countArr.reduce((a: any, b: any) => {
        return a + b;
      }, 0);
      if (this.limit > this.countSelected) {
        this.disabler = true;
        console.log(this.disabler);
      }
      console.log(this.countSelected);
      console.log(this.disabler);
      console.log(this.limit);
    });

    this.currentTable = event.label;
    this.isCheckbox = event.isCheckbox || true;
  }

  tableUpdateEmit(event: any) {
    this.selected = [];
    console.log(event);
    event.label = event.label || this.currentTable;
    this.getSettings();
  }

  onRowClick(event: any) {
    this.dialog.open(ViewTransactionComponent, {
      data: { event, column: TRANSAC_TABLE_COLUMN },
      height: 'auto',
      width: '85%',
      disableClose: true,
    });
  }
  onCheckBoxBtnClick(event: any) {
    switch (event.action) {
      case 'schedule':
        this.onSetSchedule();
        break;

      default:
        break;
    }
  }

  onCheckBoxSelect(event: any) {
    // console.log(event);
    event.forEach((i: any) => {
      if (!_.some(this.selected, { _id: i._id })) {
        this.selected.push(i);
      }
    });
    // console.log(this.selected);
    // this.selected = event;
    // this.countSelected = event.length;
  }

  onSetSchedule() {
    console.log(this.selected);
    this.dialog
      .open(SetScheduleComponent, {
        data: { selected: this.selected, notary: this.notaryName },
        height: 'auto',
        minWidth: '50vw',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.appTable?.checkedRows.clear();
          this.fetchData(this.page);
        }
      });
  }
  onCreateMeeting() {
    this.dialog
      .open(RoomComponent, {
        data: this.selected,
        minHeight: '100vh',
        minWidth: '100vw',
        panelClass: 'dialog-no-padding',
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchData(this.pageLeave);
        }
      });
  }
}
