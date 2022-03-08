import { SUPERADMIN_MENU_COLORS } from './../../../config/USER_MENU';
import { ActionResultComponent } from './../../../shared/dialogs/action-result/action-result.component';
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
import { AuthService } from 'src/app/service/auth/auth.service';
import { SUPERADMIN_MENU } from 'src/app/config/USER_MENU';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { resetUser, setUser } from 'src/app/store/user/user.action';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  //For Menu
  adminMenu = SUPERADMIN_MENU;
  menuColors = SUPERADMIN_MENU_COLORS;

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private util: UtilService,
    private auth: AuthService,
    private store: Store<{ user: User }>,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMe();
    const currRoute = this.router.url.split('/').pop();
    console.log(currRoute);
    let temp: Array<String> = [];
    this.superadminNav.forEach((i: any) => {
      temp.push(i);
    });
    this.page = this.superadminNav.find((o: any) => o.route === currRoute);
    if (this.page) this.routeLabel = this.page.label;
  }

  getMe() {
    this.loading = true;
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
        if (res.env.user.type == 'Admin') {
          this.me = res.env.user;
          this.store.dispatch(setUser({ user: res.env.user }));

          if (!this.me.isMain && this.me._role && this.me._role.access.length) {
            this.superadminNav = this.me._role.access;
            console.log(this.superadminNav);
            this.loading = false;
          } else {
            this.superadminNav = SUPERADMIN_NAVS;
            console.log(this.superadminNav);
            this.loading = false;
          }
        } else {
          this.sb.open(
            'This Account is not an Admin or not recorded to our Database. Redirecting to Login Page...',
            undefined,
            {
              panelClass: ['fail'],
              duration: 5000,
            }
          );
          localStorage.removeItem('SESSION_CSURF_TOKEN');
          localStorage.removeItem('SESSION_AUTH');
          this.store.dispatch(resetUser());
          this.loggingOut = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        }
      },
      (err) => {
        console.log(err);
        if (err) this.checkSession();
      }
    );
  }

  checkSession() {
    let csurf_token = localStorage.getItem('SESSION_CSURF_TOKEN');
    let session_token = localStorage.getItem('SESSION_AUTH');

    console.log(csurf_token, session_token);

    if (csurf_token == null || session_token == null) {
      this.loading = true;
      this.dialog
        .open(ActionResultComponent, {
          data: { msg: 'Log in to continue', button: 'Okay', success: false },
          disableClose: true,
        })
        .afterClosed()
        .subscribe((res: any) => {
          this.router.navigate(['/superadmin-login']);
        });
    }
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

  menuClick(event: any) {
    switch (event) {
      case 'logout':
        this.onLogout();
        break;
      case 'change-password':
        this.changePassword();
        break;
      default:
    }
  }

  changePassword() {}

  onLogout() {
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          isDelete: false,
          isAdd: false,
          isUpdate: false,
          isOthers: true,
          msg: 'logout',
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          localStorage.removeItem('SESSION_CSURF_TOKEN');
          localStorage.removeItem('SESSION_AUTH');
          this.store.dispatch(resetUser());
          this.loggingOut = true;
          setTimeout(() => {
            this.router.navigate(['/superadmin-login']);
          }, 1500);
        }
      });
  }
}
