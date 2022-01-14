import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { BARANGAY_NAVS } from 'src/app/config/NAVIGATION';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UtilService } from 'src/app/service/util/util.service';

@Component({
  selector: 'app-barangay-portal',
  templateUrl: './barangay-portal.component.html',
  styleUrls: ['./barangay-portal.component.scss'],
})
export class BarangayPortalComponent implements OnInit {
  isExpanded: boolean = false;
  barangayNav = BARANGAY_NAVS;
  me: any;
  loading: boolean = false;
  loggingOut: boolean = false;
  changeLabel = new EventEmitter<boolean>();
  navigationLoading: boolean = false;
  routeLabel: string = '';
  page: any;

  //For Menu

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private util: UtilService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const currRoute = this.router.url.split('/').pop();
    console.log(currRoute);
    let temp: Array<String> = [];
    this.barangayNav.forEach((i: any) => {
      temp.push(i);
    });
    this.page = this.barangayNav.find((o: any) => o.route === currRoute);
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
}
