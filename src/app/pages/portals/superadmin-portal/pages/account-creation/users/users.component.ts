import { AreYouSureComponent } from './../../../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { ApiService } from './../../../../../../service/api/api.service';
import { UserDialogFormComponent } from './user-dialog-form/user-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { USERS, USER_BOTTOMSHEET } from './config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  column = USERS;
  bsConfig = USER_BOTTOMSHEET;
  _brgyId: any;
  userType: any;
  _notarialId: any;
  dataSource = [];
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  dataLength: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this._brgyId = this.route.snapshot.paramMap.get('brgyId');
    this._notarialId = this.route.snapshot.paramMap.get('notarialId');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.fetchUser(this.page);
  }
  onAdd() {
    this.dialog
      .open(UserDialogFormComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          _brgyId: this._brgyId,
          _notarialId: this._notarialId,
          type: this.userType,
        },
      })
      .afterClosed()
      .subscribe(
        (res: any) => {
          if (res) this.fetchUser(this.page);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  fetchUser(event?: any) {
    let qry: QueryParams = {
      find: [],
      page: event.pageIndex,
      limit: event.pageSize + '',
      filter: event.filter,
    };

    if (this.userType) {
      qry.find.push({
        field: 'type',
        operator: '=',
        value: this.userType === 'iCertify' ? 'Admin' : this.userType,
      });
    }
    if (this._brgyId && this._brgyId !== 'undefined')
      qry.find.push({ field: '_brgyId', operator: '=', value: this._brgyId });
    if (this._notarialId && this._notarialId !== 'undefined')
      qry.find.push({
        field: '_notarialId',
        operator: '=',
        value: this._notarialId,
      });
    if (event && event.filter) {
      qry['filter'] = event.filter;
    }
    console.log(qry);
    this.api.user.getAllUser(qry).subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.env.users;
      this.dataLength = res.count;
    });
  }
  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'delete':
        this.dialog
          .open(AreYouSureComponent, {
            data: { isDelete: true, msg: 'Delete this User' },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) {
              this.api.user.deleteUser(event.obj._id).subscribe((res: any) => {
                console.log(res);
              });
            }
          });

        break;
      case 'edit':
        this.dialog
          .open(UserDialogFormComponent, {
            data: {
              obj: event.obj,
              action: event.action,
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) {
              this.fetchUser(this.page);
            }
          });
        break;
      default:
        break;
    }
  }
  onTableUpdate(event: any) {
    console.log(event);
    this.fetchUser(event);
  }
}
