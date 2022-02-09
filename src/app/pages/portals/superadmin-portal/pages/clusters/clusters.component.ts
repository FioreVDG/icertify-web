import { UpsertClusterComponent } from './upsert-cluster/upsert-cluster.component';

import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.scss'],
})
export class ClustersComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  createCluster() {
    this.dialog.open(UpsertClusterComponent, { width: '100%' });
  }
}
