import { BrgyRoomComponent } from './brgy-room/brgy-room.component';
import { ApiService } from 'src/app/service/api/api.service';
import { Component, OnInit } from '@angular/core';
import {
  FINISHED_FIND,
  PENDING_FIND,
  VIDEO_CONF_BARANGAY_TABLE,
} from './config';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { Cluster } from 'src/app/models/cluster.interface';
import { ViewScreenshotComponent } from 'src/app/shared/components/view-screenshot/view-screenshot.component';

@Component({
  selector: 'app-barangay-video-conferencing',
  templateUrl: './barangay-video-conferencing.component.html',
  styleUrls: ['./barangay-video-conferencing.component.scss'],
})
export class BarangayVideoConferencingComponent implements OnInit {
  filtBtnConfig = VIDEO_CONF_BARANGAY_TABLE;
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
    sort: {
      active: 'dateCreated',
      direction: 'asc',
    },
  };
  currentTable: any;
  me: any;
  settings: any;
  isDisabled: boolean = true;
  indigentDetails: any;
  // TODO: room interface
  activeRooms: Array<any> = [];
  constructor(
    private api: ApiService,
    private cluster: Store<{ cluster: Cluster }>,
    private store: Store<{ user: User }>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
      // this.fetchData(this.page);
    });
    this.cluster.select('cluster').subscribe((res: Cluster) => {
      this.settings = res;
      console.log(res);
      // this.fetchData(event);
      this.getActive = true;
      this.getActiveConference();
    });
    // this.api.cluster
    //   .getOne(this.me._barangay.brgyCode)
    //   .subscribe((res: any) => {
    //     this.settings = res.env.cluster;
    //     console.log(this.settings);
    //     this.getActive = true;
    //     this.getActiveConference();
    //   });
  }

  fetchData(event: any) {
    console.log(event);
    this.loading = true;

    // event.label = event.label === undefined ? 'For Scheduling' : event.label;

    console.log(event);
    let query = {
      find: [
        {
          field: '_barangay.brgyCode',
          operator: '=',
          value: this.me._barangay.brgyCode,
        },
      ],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populate,
    };
    if (event.label === 'Pending') {
      query.find = query.find.concat(PENDING_FIND);
    } else {
      query.find = query.find.concat(FINISHED_FIND);
    }

    if (event.find) query.find = query.find.concat(event.find);

    console.log(query);
    this.api.document.getAll(query).subscribe(
      (res: any) => {
        this.loading = false;
        console.log(res);
        this.dataSource = res.env.documents;
        if (this.dataSource.length) {
          this.dataSource.forEach((el: any) => {
            if (el.documentType === 'Others')
              el.documentType = `${el.documentType} (${el.documentTypeSpecific})`;
          });
        }
        this.dataLength = res.total;
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );

    this.currentTable = event.label;
  }

  tableUpdateEmit(event: any) {
    console.log(event);
    event.label = event.label || this.currentTable;

    this.fetchData(event);
  }

  onRowClick(event: any) {
    console.log('ETO UN', event);
    // this.dialog.open(ViewBatchTransactionsComponent, {
    //   data: event,
    //   height: 'auto',
    //   width: '70%',
    // });

    switch (event.action) {
      case 'join':
        break;
      case 'viewSS':
        this.dialog.open(ViewScreenshotComponent, {
          data: {
            document: event.obj,
          },
          height: 'auto',
          width: '70%',
        });

        break;
      default:
        break;
    }
  }

  getActive = false;
  getActiveConference() {
    console.log('check here');
    let query: QueryParams = {
      find: [
        {
          field: '_notaryId',
          operator: '=',
          value: this.settings?._notaryId?._notaryId,
        },
      ],
    };
    console.log(query);
    this.api.room.get(query).subscribe(
      (res: any) => {
        console.log(res);
        console.log(res.env.room);
        this.indigentDetails = res.env.room[0]?.currentTransaction;
        if (
          res &&
          res.env.room[0] &&
          res.env.room[0].currentTransaction._barangay.brgyCode ===
            this.me._barangay.brgyCode
        )
          this.isDisabled = false;
        else {
          this.isDisabled = true;
        }
        this.activeRooms = res.env.room || [];
        console.log(this.activeRooms);

        if (this.getActive)
          setTimeout(() => {
            this.getActiveConference();
          }, 5000);
      },
      (err) => {
        if (this.getActive)
          setTimeout(() => {
            this.getActiveConference();
          }, 5000);
      }
    );
  }

  enterNow(room: any) {
    this.getActive = false;
    this.api.transaction
      .get(
        {
          find: [],
          populates: [{ field: '_folderId' }, { field: '_documents' }],
        },
        room.currentTransaction._id
      )
      .subscribe(
        (res: any) => {
          console.log('YEY');
          console.log(res);
          res.env.transaction.que = room.que;
          this.dialog
            .open(BrgyRoomComponent, {
              data: {
                obj: res.env.transaction,
                indigentDetails: this.indigentDetails,
                settings: this.settings,
              },
              minHeight: '100vh',
              minWidth: '100vw',
              panelClass: 'dialog-no-padding',
            })
            .afterClosed()
            .subscribe(() => {
              this.getActive = true;
              this.getActiveConference();
            });
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
