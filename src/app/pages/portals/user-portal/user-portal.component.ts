import { AuthService } from './../../../service/auth/auth.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';

import { NOTARY_NAVS } from 'src/app/config/NAVIGATION';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { MatDialog } from '@angular/material/dialog';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { NOTARY_MENU, NOTARY_MENU_COLORS } from 'src/app/config/USER_MENU';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from 'src/app/store/user/user.action';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.scss'],
})
export class UserPortalComponent implements OnInit {
  me!: User;
  loading: boolean = false;
  loggingOut: boolean = false;
  navigationLoading: boolean = false;
  routeLabel: string = '';
  page: any;

  userMenu = NOTARY_MENU;
  menuColors = NOTARY_MENU_COLORS;

  constructor(
    public router: Router,
    public auth: AuthService,
    private dialog: MatDialog,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.getMe();
  }

  getMe() {
    this.loading = true;
    this.auth.me().subscribe(
      (res: any) => {
        console.log(res);
        this.me = res.env.user;
        this.store.dispatch(setUser({ user: res.env.user }));
        localStorage.setItem('USER_INFORMATION', JSON.stringify(this.me));
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
