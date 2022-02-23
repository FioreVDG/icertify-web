import { UtilService } from 'src/app/service/util/util.service';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { RIDER_BS_CONFIG, RIDER_COLUMNS } from './config';
import { UpsertRiderComponent } from './upsert-rider/upsert-rider.component';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.scss'],
})
export class RiderComponent implements OnInit {
  dataSource = [];
  columns = RIDER_COLUMNS;
  dataLength: number = 0;
  bsConfig = RIDER_BS_CONFIG;
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  loading: boolean = false;
  clusters: any[] = [];

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.fetchRiders(this.page);
  }

  fetchRiders(event: any) {
    this.loading = true;
    let query: QueryParams = {
      find: [],
      populates: [{ field: '_clusterId' }],
      page: event.pageIndex,
      limit: event.pageSize + '',
      filter: event.filter,
    };

    this.api.user.getAllRiders(query).subscribe(
      (res: any) => {
        this.loading = false;
        this.dataSource = res.env.ridersFinal;
        this.dataLength = res.total;
        this.fetchClusters();
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  onAdd() {
    this.dialog
      .open(UpsertRiderComponent, {
        data: {
          clusters: this.clusters,
          action: 'create',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.fetchRiders(this.page);
      });
  }

  onRowClick(event: any) {
    switch (event.action) {
      case 'edit':
        this.dialog
          .open(UpsertRiderComponent, {
            data: {
              clusters: this.clusters,
              obj: event.obj,
              action: event.action,
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) this.fetchRiders(this.page);
          });

        break;
      case 'delete':
        this.dialog
          .open(AreYouSureComponent, {
            data: {
              msg:
                'Delete this Rider: ' +
                event.obj.firstName +
                event.obj.lastName,
              isDelete: true,
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              let loader = this.util.startLoading('Deleting...');
              this.api.user.deleteUser(event.obj._id).subscribe((res: any) => {
                if (res) {
                  this.fetchRiders(this.page);
                  this.util.stopLoading(loader);
                }
              });
            }
          });

        break;

      default:
        break;
    }
  }

  onTableUpdate(event: any) {
    this.fetchRiders(event);
  }

  fetchClusters() {
    this.loading = true;
    this.api.cluster.getAll({ find: [] }).subscribe(
      (res: any) => {
        this.clusters = res.env.clusters;
        console.log(this.clusters);
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}
