import { setCluster } from './../../../store/cluster/cluster';
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
import { setUser } from 'src/app/store/user/user.action';
import {
  animateText,
  onSideNavChange,
} from 'src/app/animations/sidebar.animation';

@Component({
  selector: 'app-barangay-portal',
  templateUrl: './barangay-portal.component.html',
  styleUrls: ['./barangay-portal.component.scss'],
  animations: [onSideNavChange, animateText, onMainContentChange],
})
export class BarangayPortalComponent implements OnInit {
  isExpanded: boolean = false;
  barangayNav: any[] = [];
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
  barangayMenu = BARANGAY_MENU;
  menuColors = BARANGAY_MENU_COLORS;

  constructor(
    public router: Router,
    private dialog: MatDialog,
    private util: UtilService,
    private auth: AuthService,
    private store: Store<{ user: User }>,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.getMe();
    const currRoute = this.router.url.split('/').pop();
    console.log(currRoute);
    let temp: Array<String> = [];
    this.barangayNav.forEach((i: any) => {
      temp.push(i);
    });
    this.page = this.barangayNav.find((o: any) => o.route === currRoute);
    if (this.page) this.routeLabel = this.page.label;
  }

  getMe() {
    this.loading = true;
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
        this.me = res.env.user;
        this.api.cluster
          .getOne(this.me._barangay.brgyCode)
          .subscribe((res: any) => {
            console.log(res, 'Cluster');
            this.store.dispatch(setCluster({ cluster: res.env.cluster }));
          });
        this.store.dispatch(setUser({ user: res.env.user }));
        localStorage.setItem('BARANGAY_INFORMATION', JSON.stringify(this.me));

        if (!this.me.isMain && this.me._role && this.me._role.access.length) {
          this.barangayNav = this.me._role.access;
          console.log(this.barangayNav);
        } else {
          this.barangayNav = BARANGAY_NAVS;
          console.log(this.barangayNav);
        }

        this.loading = false;
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
          this.loggingOut = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        }
      });
  }
}
