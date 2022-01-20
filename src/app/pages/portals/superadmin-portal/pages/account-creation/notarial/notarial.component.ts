import { ApiService } from './../../../../../../service/api/api.service';
import { UpsertNotarialCommissionComponent } from './upsert-notarial-commission/upsert-notarial-commission.component';
import { NOTARIAL, NOTARIAL_BOTTOMSHEET } from './config';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notarial',
  templateUrl: './notarial.component.html',
  styleUrls: ['./notarial.component.scss'],
})
export class NotarialComponent implements OnInit {
  column = NOTARIAL;
  dataSource = [];
  bottomSheet = NOTARIAL_BOTTOMSHEET;
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  dataLength: number = 0;
  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.fetchNotarial(this.page);
  }
  openDialog() {
    this.dialog
      .open(UpsertNotarialCommissionComponent)
      .afterClosed()
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res) this.fetchNotarial(this.page);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  fetchNotarial(event?: any) {
    let qry: any = {
      find: [
        {
          field: 'type',
          operator: '=',
          value: 'Notary',
        },
        {
          field: 'isMain',
          operator: '=',
          value: true,
        },
      ],
      page: event.pageIndex,
      limit: event.pageSize + '',
      filter: event.filter,
    };
    if (event && event.filter) {
      qry['filter'] = event.filter;
    }
    this.api.user.getAllUser(qry).subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.env.users;
      this.dataLength = res.count;
    });
  }
  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'edit':
        this.dialog
          .open(UpsertNotarialCommissionComponent, {
            data: { obj: event.obj, action: event.action },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) this.fetchNotarial(this.page);
          });
        break;
      case 'delete':
        this.dialog
          .open(AreYouSureComponent, {
            data: { isDelete: true, msg: 'Delete this Notarial Commission' },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res)
              this.api.user.deleteAdmin(event.obj._id).subscribe((res: any) => {
                this.fetchNotarial(this.page);
              });
          });
        break;
      case 'users':
        this.route.navigate([
          'superadmin-portal/account-creation/users',
          { notarialId: event.obj._id, userType: 'Notary' },
        ]);
        break;

      default:
        break;
    }
  }
  onTableUpdate(event: any) {
    console.log(event);
    this.fetchNotarial(event);
  }
}
