import { setCluster } from '../../../store/cluster/cluster.action';
import { ApiService } from './../../../service/api/api.service';
import { onMainContentChange } from './../../../animations/sidebar.animation';
import { AreYouSureComponent } from './../../../shared/dialogs/are-you-sure/are-you-sure.component';
import {
  BARANGAY_MENU,
  BARANGAY_MENU_COLORS,
} from './../../../config/USER_MENU';
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
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { resetUser, setUser } from 'src/app/store/user/user.action';
import {
  animateText,
  onSideNavChange,
} from 'src/app/animations/sidebar.animation';
import { NavNode } from 'src/app/models/treesidenav.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';

@Component({
  selector: 'app-barangay-portal',
  templateUrl: './barangay-portal.component.html',
  styleUrls: ['./barangay-portal.component.scss'],
  animations: [onSideNavChange, animateText, onMainContentChange],
})
export class BarangayPortalComponent implements OnInit {
  isExpanded: boolean = false;
  barangayNav: NavNode[] = [];
  me: any;
  loading: boolean = false;
  loggingOut: boolean = false;
  changeLabel = new EventEmitter<boolean>();
  navigationLoading: boolean = false;
  routeLabel: string = '';
  page: any;

  public sideNavState: boolean = false;
  public linkText: boolean = false;
  public main: boolean = false;

  //For Menu
  barangayMenu = JSON.parse(JSON.stringify(BARANGAY_MENU));
  menuColors = JSON.parse(JSON.stringify(BARANGAY_MENU_COLORS));

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private util: UtilService,
    private auth: AuthService,
    private store: Store<{ user: User }>,
    private api: ApiService,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMe();
    const currRoute = this.router.url.split('/').pop();
    console.log(currRoute);
    this.page = JSON.parse(JSON.stringify(BARANGAY_NAVS)).find(
      (o: any) => o.route === currRoute
    );
    console.log(this.page);
    if (this.page) this.routeLabel = this.page.label;
  }

  getMe() {
    this.loading = true;
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
        if (res.env.user.type == 'Barangay') {
          this.me = res.env.user;
          this.store.dispatch(setUser({ user: res.env.user }));
          this.api.cluster.getOne(this.me._barangay.brgyCode).subscribe(
            (res: any) => {
              console.log(res, 'Cluster');
              this.store.dispatch(setCluster({ cluster: res.env.cluster }));
              localStorage.setItem(
                'BARANGAY_INFORMATION',
                JSON.stringify(this.me)
              );
              this.setNavs('');
              this.loading = false;
            },
            (err) => {
              this.setNavs(err.error.message);
              this.loading = false;
            }
          );
        } else {
          this.sb.open(
            'This is not a Barangay Account or not recorded to our Database. Redirecting to Login Page...',
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
        this.loading = false;
      }
    );
  }

  setNavs(error: string) {
    this.barangayNav = [];
    const routes = ['batch-delivery-management', 'new-transaction'];
    if (error === 'Cluster not found!') {
      if (!this.me.isMain && this.me._role && this.me._role.access.length) {
        this.barangayNav = this.me._role.access;
      } else {
        this.barangayNav = JSON.parse(JSON.stringify(BARANGAY_NAVS));
      }
      this.barangayNav.forEach((el: any) => {
        if (routes.includes(el.route)) el.disabled = true;
      });
      console.log(this.barangayNav);
    } else {
      if (!this.me.isMain && this.me._role && this.me._role.access.length) {
        this.barangayNav = this.me._role.access;
      } else {
        this.barangayNav = JSON.parse(JSON.stringify(BARANGAY_NAVS));
      }
      console.log(this.barangayNav);
    }
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
  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;
    this.main = !this.main;

    // setTimeout(() => {
    this.linkText = this.sideNavState;
    // }, 1000);
    this.util.sideNavState$.next(this.sideNavState);
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

  changePassword() {
    this.dialog
      .open(ChangePasswordComponent, {
        disableClose: true,
        width: '300px',
        minWidth: '256px',
        height: 'auto',
      })
      .afterClosed()
      .subscribe((res) => {
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
