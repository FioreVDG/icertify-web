import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import {
  BARANGAY_FIND,
  NOTARY_FIND,
  SLA_COLUMNS,
  SLA_COLUMNS_CONFIG,
} from './config';
import { ModifyAgreementComponent } from './modify-agreement/modify-agreement.component';
import { UpsertSlaComponent } from './upsert-sla/upsert-sla.component';

@Component({
  selector: 'app-sla',
  templateUrl: './sla.component.html',
  styleUrls: ['./sla.component.scss'],
})
export class SlaComponent implements OnInit {
  selected = [];
  currTable: any;
  currPopulate: any;
  loading = true;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_createdBy',
      },
    ],
    label: 'Barangay',
  };
  routeLength = 3;
  dataSource = [];
  dataLength: number = 0;
  columns = SLA_COLUMNS;
  filtBtnConfig = SLA_COLUMNS_CONFIG;

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData(this.page);
  }

  fetchData(event: any) {
    this.loading = true;
    console.log(event);

    let qry = {
      find: event.find || [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: [
        {
          field: '_createdBy',
        },
        {
          field: '_userId',
        },
      ],
    };
    if (event.filter) qry.filter = event.filter;

    if (event.label === 'Barangay') {
      qry.find = qry.find.concat(BARANGAY_FIND);
    } else if (event.label === 'Notary') {
      qry.find = qry.find.concat(NOTARY_FIND);
    }

    let api = this.api.sla.getAll(qry);

    console.log(qry);
    api.subscribe((res: any) => {
      this.dataSource = res.env.slas;
      this.dataLength = res.count;
      this.loading = false;
    });
    this.currTable = event.label;
    this.page.populate = event.populate;
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

  createSLA() {
    this.dialog
      .open(UpsertSlaComponent, { width: '40rem', disableClose: true })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.fetchData(this.page);
      });
  }

  onRowClick(event: any) {
    this.dialog.open(ModifyAgreementComponent, {
      width: '100%',
      disableClose: true,
      data: event,
    });
  }
}
