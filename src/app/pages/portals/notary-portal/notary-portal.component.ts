import { setCluster } from './../../../store/cluster/cluster';
import { ApiService } from './../../../service/api/api.service';
import { AuthService } from './../../../service/auth/auth.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { NOTARY_NAVS } from 'src/app/config/NAVIGATION';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { MatDialog } from '@angular/material/dialog';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { NOTARY_MENU, NOTARY_MENU_COLORS } from 'src/app/config/USER_MENU';
import { Store } from '@ngrx/store';
import { resetUser, setUser } from 'src/app/store/user/user.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notary-portal',
  templateUrl: './notary-portal.component.html',
  styleUrls: ['./notary-portal.component.scss'],
})
export class NotaryPortalComponent implements OnInit {
  isExpanded: boolean = false;
  notaryNav: any[] = [];
  me!: User;
  navigation: any;
  loading: boolean = false;
  loggingOut: boolean = false;
  changeLabel = new EventEmitter<boolean>();
  navigationLoading: boolean = false;
  routeLabel: string = '';
  page: any;

  //For Menu
  notaryMenu = NOTARY_MENU;
  menuColors = NOTARY_MENU_COLORS;

  constructor(
    public router: Router,
    public auth: AuthService,
    private dialog: MatDialog,
    private store: Store<{ user: User }>,
    private api: ApiService,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMe();
    const currRoute = this.router.url.split('/').pop();
    console.log(currRoute);
    let temp: Array<String> = [];
    this.notaryNav.forEach((i: any) => {
      temp.push(i);
    });

    this.page = this.notaryNav.find((o: any) => o.route === currRoute);
    if (this.page) this.routeLabel = this.page.label;
  }

  getMe() {
    this.loading = true;
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
        if (res.env.user.type) {
          this.me = res.env.user;
          this.api.cluster
            .getOneNotary(this.me._notaryId)
            .subscribe((res: any) => {
              console.log(res);
              this.store.dispatch(setCluster({ cluster: res.env.cluster }));
            });
          this.store.dispatch(setUser({ user: res.env.user }));
          localStorage.setItem('BARANGAY_INFORMATION', JSON.stringify(this.me));

          if (!this.me.isMain && this.me._role && this.me._role.access.length) {
            this.notaryNav = this.me._role.access;
          } else {
            this.notaryNav = NOTARY_NAVS;
          }

          this.loading = false;
        } else {
          this.sb.open(
            'This is not a Notary Account or not recorded to our Database. Redirecting to Login Page...',
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
          this.router.navigate(['/login']);
        });
    }
  }

  changeRoute(nav: any) {
    if (this.router.url.split('/').pop() == nav.route) {
      setTimeout(() => {
        this.navigationLoading = false;
      }, 1000);
    } else {
      this.navigationLoading = true;
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
            this.router.navigate(['/login']);
          }, 1500);
        }
      });
  }
}
