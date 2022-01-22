import { NavNode } from 'src/app/models/treesidenav.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/models/column.interface';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { ROLE } from 'src/app/models/role.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { AccessRoleDialogFormComponent } from './access-role-dialog-form/access-role-dialog-form.component';
import { ROLE_BOTTOMSHEET, ROLE_POPULATES, ROLE_TABLE } from './configs';
import {
  BARANGAY_NAVS,
  NOTARY_NAVS,
  SUPERADMIN_NAVS,
} from 'src/app/config/NAVIGATION';

@Component({
  selector: 'app-access-roles',
  templateUrl: './access-roles.component.html',
  styleUrls: ['./access-roles.component.scss'],
})
export class AccessRolesComponent implements OnInit {
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
  constructor(
    private store: Store<{ user: User }>,
    private util: UtilService,
    private router: Router,
    private api: ApiService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountType = this.route.snapshot.paramMap.get('userType');
    // const currRoute = this.router.url.split('/').pop();
    this.store.select('user').subscribe((res: User) => {
      console.log(res);
      this.me = res;
      // let routeAccess = this.util.findAccessRoute(res, currRoute);
      // if (routeAccess && routeAccess.children && routeAccess.children.length) {
      //   this.bottomSheetOptions = routeAccess.children;
      //   this.addBtnAccess =
      //     routeAccess.children.find((o: any) => o.action == 'add')?.hasAccess ||
      //     false;
      // }
    });
    this.fetchData(this.page);
  }

  fetchData(event: TableOutput) {
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
      // res.env.roles.forEach((role: ROLE) => {
      //   this.api.role.checkRoleInUsers(role._id).subscribe((res: any) => {
      //     role['accessCount'] = res.total || '0';
      //   });
      // });
      this.dataSource = res.env.roles;
      this.dataLength = res.total;
      this.loading = false;
    });
  }

  onAdd() {
    let sendData = {
      type: 'role',
      action: 'add',
      form: '',
      navType:
        this.accountType == 'iCertify'
          ? SUPERADMIN_NAVS
          : this.accountType == 'Barangay'
          ? BARANGAY_NAVS
          : NOTARY_NAVS,
    };
    this.saving = true;
    this.dialog
      .open(AccessRoleDialogFormComponent, {
        disableClose: true,
        // width: 'auto',
        panelClass: 'dialog-large',
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
      case 'update':
        let sendData = {
          type: 'role',
          action: event,
          form: '',
          navType:
            this.accountType == 'iCertify'
              ? SUPERADMIN_NAVS
              : this.accountType == 'Barangay'
              ? BARANGAY_NAVS
              : NOTARY_NAVS,
        };
        this.saving = true;
        this.dialog
          .open(AccessRoleDialogFormComponent, {
            disableClose: true,
            // width: 'auto',
            panelClass: 'dialog-large',
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
}
