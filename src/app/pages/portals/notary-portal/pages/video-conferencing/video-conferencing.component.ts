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

@Component({
  selector: 'app-video-conferencing',
  templateUrl: './video-conferencing.component.html',
  styleUrls: ['./video-conferencing.component.scss'],
})
export class VideoConferencingComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;
  filterBtnConfig = FILT_BTN;
  isCheckbox: boolean = true;
  selected = [];
  loading: boolean = true;
  dataSource = [];
  dataLength: number = 0;
  currFetch: string = '';
  currentTable: any;
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
  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData(this.page);
  }

  fetchData(event: any) {
    console.log(event);
    this.loading = true;

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

    console.log(query);
    this.api.transaction.getAllFolder(query).subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.folders;
      this.dataLength = res.count;
      this.loading = false;
    });

    this.currentTable = event.label;
    this.isCheckbox = event.isCheckbox || true;
  }

  tableUpdateEmit(event: any) {
    this.selected = [];
    console.log(event);
    event.label = event.label || this.currentTable;
    this.fetchData(event);
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
    console.log(event);
    this.selected = event;
    this.countSelected = event.length;
  }

  onSetSchedule() {
    console.log(this.selected);
    this.dialog
      .open(SetScheduleComponent, {
        data: this.selected,
        height: 'auto',
        width: '30vw',
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
