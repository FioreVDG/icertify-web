import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/models/column.interface';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { User } from 'src/app/models/user.interface';
import { UtilService } from 'src/app/service/util/util.service';
import { ROLE_OPTIONS, ROLE_POPULATES, ROLE_TABLE } from './configs';

@Component({
  selector: 'app-access-roles',
  templateUrl: './access-roles.component.html',
  styleUrls: ['./access-roles.component.scss'],
})
export class AccessRolesComponent implements OnInit {
  columns: Column[] = ROLE_TABLE;
  populate = ROLE_POPULATES;
  bottomSheetOptions = ROLE_OPTIONS;
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
  constructor(
    private store: Store<{ user: User }>,
    private util: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    // this.api.role.get(query).subscribe((res: any) => {
    //   console.log(res);
    //   res.env.roles.forEach((role: ROLE) => {
    //     this.api.role.checkRoleInUsers(role._id).subscribe((res: any) => {
    //       role['accessCount'] = res.total || '0';
    //     });
    //   });
    //   this.dataSource = res.env.roles;
    //   this.dataLength = res.total;
    //   this.loading = false;
    // });
  }
}
