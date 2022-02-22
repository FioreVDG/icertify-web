import { ActionResultComponent } from './../../../shared/dialogs/action-result/action-result.component';
import { AuthService } from './../../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superadmin-login',
  templateUrl: './superadmin-login.component.html',
  styleUrls: ['./superadmin-login.component.scss'],
})
export class SuperadminLoginComponent implements OnInit {
  hide: boolean = true;
  isLoggingIn: boolean = false;
  isLoggedIn: boolean = false;
  credential = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    let csurf_token = localStorage.getItem('SESSION_CSURF_TOKEN');
    let session_token = localStorage.getItem('SESSION_AUTH');

    if (csurf_token !== null && session_token !== null) {
      this.isLoggingIn = true;
      this.auth.me().subscribe(
        (res: any) => {
          if (res && res.env.user.type === 'Admin') {
            this.isLoggingIn = false;
            this.router.navigate(['/superadmin-portal/account-creation']);
          }
        },
        (err) => {
          console.log(err);
          this.isLoggingIn = false;
        }
      );
    }
  }

  formFieldErrMessage(fcName: string) {
    let formControl = this.credential.controls[fcName];
    if (formControl.hasError('required')) return 'You must enter a value';
    if (formControl.hasError('email')) return 'Invalid email';

    return '';
  }

  login() {
    this.isLoggingIn = true;
    this.auth
      .loginSuperadmin(
        this.credential.value.email,
        this.credential.value.password
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          this.isLoggingIn = false;

          localStorage.setItem('SESSION_CSURF_TOKEN', res.csrf_token);
          localStorage.setItem('SESSION_AUTH', res.token);

          if (res && res.env.user.type === 'Admin') {
            this.router.navigate(['/superadmin-portal/account-creation']);
            this.isLoggedIn = true;
          } else {
            this.dialog
              .open(ActionResultComponent, {
                data: { msg: 'Unauthorized / Login Failed', success: false },
              })
              .afterClosed()
              .subscribe((res: any) => {
                this.isLoggedIn = false;
                this.credential.reset();
              });
          }
        },
        (err) => {
          console.log(err);
          this.isLoggedIn = false;
          this.isLoggingIn = false;
          this.dialog
            .open(ActionResultComponent, {
              data: {
                msg: `${err.error.message} / Login Failed`,
                success: false,
                button: 'Got it!',
              },
            })
            .afterClosed()
            .subscribe((res: any) => {
              this.credential.reset();
            });
        }
      );
  }
}
