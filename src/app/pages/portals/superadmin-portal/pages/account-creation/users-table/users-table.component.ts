import { ActionResultComponent } from './../../../../../../shared/dialogs/action-result/action-result.component';
import { UtilService } from './../../../../../../service/util/util.service';
import { QueryParams } from './../../../../../../models/queryparams.interface';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../../../../service/api/api.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { USERS, USER_BOTTOMSHEET } from './user-table.config';
import { UserFormComponent } from './user-form/user-form.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit {
  @Input() brgyDetail: any;
  @Input() header: any;
  column = USERS;
  bsConfig = USER_BOTTOMSHEET;
  loading: boolean = true;
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  dataLength: number = 0;
  dataSource = [];
  accessRoles = [];
  brgyId: any;
  notaryId: any;
  userType: any;
  btnDisabled: boolean = true;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private util: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.brgyId = this.brgyDetail?.brgyCode;
    this.userType = this.header;
    if (this.data.notary) {
      console.log(this.data);
      console.log('GALING SA DIALOGGGGGGG!!!!!!');
      this.userType = this.data.notary.userType;
      this.notaryId = this.data.notary.notaryId;
      this.brgyDetail = this.data.notary.brgyInfo;
      this.brgyId = this.data.notary?.brgyInfo?.brgyCode;
    }
    this.fetchUser(this.page);
    this.getRoles();
    console.log(this.brgyId);
    console.log(this.userType);
    console.log(this.brgyDetail);
  }

  getRoles() {
    let query: any = { find: [] };
    if (this.userType === 'Barangay')
      query.find.push({
        field: '_barangay.brgyCode',
        operator: '=',
        value: this.brgyId,
      });
    if (this.userType === 'iCertify')
      query.find.push({ field: 'type', operator: '=', value: 'Admin' });

    if (this.userType === 'Notary')
      query.find.push(
        { field: 'type', operator: '=', value: 'Notary' },

        { field: '_notaryId', operator: '=', value: this.notaryId }
      );

    console.log(query);
    if (this.userType !== 'QCLegal') {
      this.api.role.getAll(query).subscribe((res: any) => {
        console.log(res);
        if (res.env.roles.length) {
          this.accessRoles = res.env.roles;
          this.btnDisabled = false;
        } else {
          this.btnDisabled = true;
          this.dialog.open(ActionResultComponent, {
            data: {
              msg: 'NO ACCESS ROLE FOUND! Add access role/s first to be able to add user/s Thank you',
              success: false,
              button: 'Okay',
            },
          });
        }
      });
    } else this.btnDisabled = false;
  }

  onAdd() {
    this.dialog
      .open(UserFormComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          initial:
            this.dataSource.length <= 0 && this.userType !== 'Notary'
              ? true
              : false,
          _notaryId: this.notaryId,
          type: this.userType === 'iCertify' ? 'Admin' : this.userType,
          brgyDetail: this.brgyDetail,
          accessRoles: this.accessRoles,
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
              const loader = this.util.startLoading('Deleting...');
              this.api.user.deleteUser(event.obj._id).subscribe((res: any) => {
                console.log(res);
                this.util.stopLoading(loader);
              });
            }
          });

        break;
      case 'edit':
        let query = {
          find: [
            {
              field: '_barangay.brgyCode',
              operator: '=',
              value: this.brgyId,
            },
          ],
        };
        this.api.role.getAll(query).subscribe((res: any) => {
          this.accessRoles = res.env.roles;
          this.dialog
            .open(UserFormComponent, {
              data: {
                obj: event.obj,
                action: event.action,
                accessRoles: this.accessRoles,
              },
            })
            .afterClosed()
            .subscribe((res: any) => {
              if (res) {
                this.fetchUser(this.page);
              }
            });
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

  fetchUser(event?: any) {
    this.loading = true;
    let query: QueryParams = {
      find: [],
      page: event.pageIndex,
      limit: event.pageSize + '',
      filter: event.filter,
    };

    if (this.userType) {
      query.find.push({
        field: 'type',
        operator: '=',
        value: this.userType === 'iCertify' ? 'Admin' : this.userType,
      });
    }
    if (this.brgyId !== 'undefined' && this.userType !== 'iCertify')
      query.find.push({
        field: '_barangay.brgyCode',
        operator: '=',
        value: this.brgyId,
      });
    if (this.notaryId !== 'undefined' && this.userType !== 'iCertify')
      query.find.push(
        {
          field: '_notaryId',
          operator: '=',
          value: this.notaryId,
        },
        {
          field: 'isMain',
          operator: '=',
          value: false,
        }
      );
    if (event && event.filter) {
      query['filter'] = event.filter;
    }
    console.log(query);

    this.api.user.getAllUser(query).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.dataSource = res.env.users;
      this.dataLength = res.count;
    });
  }
}
