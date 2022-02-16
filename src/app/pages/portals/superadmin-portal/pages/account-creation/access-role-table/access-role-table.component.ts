import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  BARANGAY_NAVS,
  NOTARY_NAVS,
  SUPERADMIN_NAVS,
} from 'src/app/config/NAVIGATION';
import { Column } from 'src/app/models/column.interface';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { ROLE } from 'src/app/models/role.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { AccessRoleFormComponent } from './access-role-form/access-role-form.component';
import {
  ROLE_BOTTOMSHEET,
  ROLE_POPULATES,
  ROLE_TABLE,
} from './access-role.config';

@Component({
  selector: 'app-access-role-table',
  templateUrl: './access-role-table.component.html',
  styleUrls: ['./access-role-table.component.scss'],
})
export class AccessRoleTableComponent implements OnInit {
  @Input() detailBrgy: any;
  @Input() userType: any;
  columns: Column[] = ROLE_TABLE;
  populate = ROLE_POPULATES;
  bsConfig = ROLE_BOTTOMSHEET;
  dataSource: Array<any> = [];
  dataLength: number = 0;
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  loading: boolean = false;
  saving: boolean = false;
  me: any;

  addBtnAccess: Boolean = true;
  accountType: any;
  brgyId: any;
  notaryId: any;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.detailBrgy);
    console.log(this.data);
    this.brgyId = this.detailBrgy?.brgyCode;
    if (this.data.notary) {
      console.log('GALING SA DIALOGGGGGGG!!!!!!');
      this.userType = this.data.notary.userType;
      this.notaryId = this.data.notary.notaryId;
      this.detailBrgy = this.data.notary.brgyInfo;
      this.brgyId = this.data.notary.brgyInfo.brgyCode;
    }
    this.fetchData(this.page);
  }

  fetchData(event: any) {
    this.loading = true;
    this.dataSource = [];
    this.page.pageIndex = event.pageIndex;
    this.page.pageSize = event.pageSize;
    let query: QueryParams = {
      find: [],
      populates: this.populate,
      page: event.pageIndex,
      limit: event.pageSize + '',
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
      query.find.push({
        field: '_notaryId',
        operator: '=',
        value: this.notaryId,
      });
    if (event.sort) {
      query.sort =
        (event.sort.direction === 'asc' ? '' : '-') + event.sort.active;
    }
    if (event.filter) {
      query.filter = event.filter;
    }
    console.log(query);
    this.api.role.getAll(query).subscribe((res: any) => {
      console.log(res);
      res.env.roles.forEach((role: ROLE) => {
        this.api.role.checkRoleInUsers(role._id).subscribe((res: any) => {
          role['accessCount'] = res.total || '0';
        });
      });
      this.dataSource = res.env.roles;
      this.dataLength = res.total;
      this.loading = false;
    });
  }

  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'delete':
        this.dialog
          .open(AreYouSureComponent, {
            data: {
              isDelete: true,
              msg: 'Delete the Role:' + event.obj.name,
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) {
            }
          });

        break;
      case 'update':
        let sendData = {
          type: 'role',
          action: event.action,
          form: event.obj,
          navType:
            this.accountType == 'iCertify'
              ? SUPERADMIN_NAVS
              : this.accountType == 'Barangay'
              ? BARANGAY_NAVS
              : NOTARY_NAVS,
        };
        this.saving = true;
        this.dialog
          .open(AccessRoleFormComponent, {
            disableClose: true,
            width: '55vw',
            data: sendData,
          })
          .afterClosed()
          .subscribe((res: string) => {
            if (res) {
              this.fetchData(this.page);
              this.saving = false;
            }
          });

        break;

      default:
        break;
    }
  }

  onAdd() {
    let sendData = {
      type: 'role',
      action: 'add',
      form: '',
      brgyDetails: this.detailBrgy,
      _notaryId: this.notaryId,
      accountType: this.userType,
      navType:
        this.userType == 'iCertify'
          ? SUPERADMIN_NAVS
          : this.userType == 'Barangay'
          ? BARANGAY_NAVS
          : NOTARY_NAVS,
    };
    this.saving = true;
    this.dialog
      .open(AccessRoleFormComponent, {
        disableClose: true,
        width: '55vw',
        data: sendData,
      })
      .afterClosed()
      .subscribe((res: string) => {
        if (res) {
          this.fetchData(this.page);
          this.saving = false;
        }
      });
  }
}
