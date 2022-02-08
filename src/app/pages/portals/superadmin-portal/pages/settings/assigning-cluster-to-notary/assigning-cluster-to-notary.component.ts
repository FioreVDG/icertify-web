import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import { AddClusterComponent } from './add-cluster/add-cluster.component';
import { CLUSTER_ASSIG_COLUMNS } from './config';

@Component({
  selector: 'app-assigning-cluster-to-notary',
  templateUrl: './assigning-cluster-to-notary.component.html',
  styleUrls: ['./assigning-cluster-to-notary.component.scss'],
})
export class AssigningClusterToNotaryComponent implements OnInit {
  loading: boolean = false;
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  dataSource: any[] = [];
  dataLength: number = 0;
  columns = CLUSTER_ASSIG_COLUMNS;

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData(this.page);
  }

  fetchData(event: any) {}

  onAdd() {
    this.dialog.open(AddClusterComponent, {
      disableClose: true,
      data: {},
      height: 'auto',
      width: '100%',
    });
  }
}
