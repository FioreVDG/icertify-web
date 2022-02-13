import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { CLUSTER_COLUMNS, BOTTOM_SHEET_CONFIG } from './config';
import { ApiService } from 'src/app/service/api/api.service';
import { UpsertClusterComponent } from './upsert-cluster/upsert-cluster.component';

import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.scss'],
})
export class ClustersComponent implements OnInit {
  dataSource = [];
  columns = CLUSTER_COLUMNS;
  dataLength: number = 0;
  bsConfig = BOTTOM_SHEET_CONFIG;
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  loading: boolean = false;
  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.fetchCluster(this.page);
  }

  createCluster() {
    this.dialog
      .open(UpsertClusterComponent, { width: '100%' })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchCluster(this.page);
      });
  }
  fetchCluster(event: any) {
    this.loading = true;
    let qry: QueryParams = {
      find: [
        {
          field: 'status',
          operator: '=',
          value: 'Active',
        },
      ],
      populates: [
        {
          field: '_riders',
        },
        {
          field: '_notaryId',
        },
      ],
      page: event.pageIndex,
      limit: event.pageSize + '',
      filter: event.filter,
    };
    this.api.cluster.getAll(qry).subscribe(
      (res: any) => {
        this.loading = false;
        this.dataSource = res.env.clusters;
        this.dataLength = res.count;
      },
      (err) => {
        this.loading = true;
      }
    );
  }
  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'edit':
        this.dialog
          .open(UpsertClusterComponent, {
            width: '100%',
            data: event.obj,
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) this.fetchCluster(this.page);
          });

        break;
      case 'delete':
        this.dialog
          .open(AreYouSureComponent, {
            data: {
              isDelete: true,
              msg: `delete Cluster: ${event.obj.name}`,
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) {
              this.api.cluster.delete(event.obj._id).subscribe((res: any) => {
                this.dialog.open(ActionResultComponent, {
                  data: {
                    button: 'Ok',
                    msg: `${event.obj.name} is successfully deleted!`,
                    success: true,
                  },
                });
              });
            }
          });

        break;

      default:
        break;
    }
  }
  onTableUpdate(event: any) {
    this.fetchCluster(event);
  }
}
