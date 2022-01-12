import { AreYouSureComponent } from './../../../shared/dialogs/are-you-sure/are-you-sure.component';
import { MatDialog } from '@angular/material/dialog';
import { SUPERADMIN_NAVS } from './../../../config/NAVIGATION';
import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { UtilService } from 'src/app/service/util/util.service';

@Component({
  selector: 'app-superadmin-portal',
  templateUrl: './superadmin-portal.component.html',
  styleUrls: ['./superadmin-portal.component.scss'],
})
export class SuperadminPortalComponent implements OnInit {
  isExpanded: boolean = false;
  superadminNav = SUPERADMIN_NAVS;
  me: any;
  loading: boolean = false;
  loggingOut: boolean = false;
  changeLabel = new EventEmitter<boolean>();
  navigationLoading: boolean = false;
  routeLabel: string = '';
  page: any;

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.onLogout();
    const currRoute = this.router.url.split('/').pop();
    console.log(currRoute);
    let temp: Array<String> = [];
    this.superadminNav.forEach((i: any) => {
      temp.push(i);
    });
    this.page = this.superadminNav.find((o: any) => o.route === currRoute);
    if (this.page) this.routeLabel = this.page.label;
  }

  changeRoute(nav: any) {
    this.navigationLoading = true;
    if (this.router.url.split('/').pop() == nav.route) {
      setTimeout(() => {
        this.navigationLoading = false;
      }, 1000);
    }

    const routeEvent = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          this.navigationLoading = true;
        } else if (event instanceof NavigationEnd) {
          routeEvent.unsubscribe();
          setTimeout(() => {
            this.navigationLoading = false;
          }, 1000);
        }
      }
    );

    this.changeLabel.emit(nav);
    this.routeLabel = nav.label;
  }

  onLogout() {
    this.dialog
      .open(AreYouSureComponent, {
        width: 'auto',
        height: 'auto',
        data: {
          isDelete: false,
          isAdd: false,
          isUpdate: false,
          isOthers: true,
          msg: 'logout',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
        }
      });
  }
}
