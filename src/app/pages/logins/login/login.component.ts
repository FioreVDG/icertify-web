import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UtilService } from 'src/app/service/util/util.service';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  isLoggingIn: boolean = false;
  isLoggedIn: boolean = false;
  credential = this.fb.group({
    info: new FormControl('', [Validators.required /* Validators.email*/]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private util: UtilService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    let csurf_token = localStorage.getItem('SESSION_CSURF_TOKEN');
    let session_token = localStorage.getItem('SESSION_AUTH');

    if (csurf_token !== null && session_token !== null) {
      this.isLoggingIn = true;
      this.auth.me().subscribe(
        (res: any) => {
          if (res && res.env.user.type === 'Barangay') {
            this.isLoggingIn = false;
            this.router.navigate(['/barangay-portal/barangay-dashboard']);
          } else if (res && res.env.user.type === 'Notary') {
            this.router.navigate(['/notary-portal/notary-dashboard']);
            this.isLoggedIn = true;
          } else {
            this.dialog
              .open(ActionResultComponent, {
                data: {
                  msg: 'Unauthorized / Login Failed',
                  success: false,
                  button: 'Okay',
                },
              })
              .afterClosed()
              .subscribe((res: any) => {
                this.isLoggingIn = false;
                this.isLoggedIn = false;
                this.credential.reset();
              });
          }
        },
        (err: any) => {
          this.isLoggingIn = false;
        }
      );
    }
  }

  formFieldErrMessage(fcName: string) {
    let formControl = this.credential.controls[fcName];
    if (formControl.hasError('required')) return 'You must enter a value';
    if (formControl.hasError('info')) return 'Invalid email/mobile number';

    return '';
  }

  login() {
    let type = '';
    let body: any = {
      password: this.credential.value.password,
    };
    if (this.util.isEmail(this.credential.value.info)) {
      type = 'barangay';
      body.email = this.credential.value.info;
    } else {
      type = 'consumer';
      body.mobileNumber = this.credential.value.info;
    }

    this.isLoggingIn = true;
    this.auth.login(body, type).subscribe(
      (res: any) => {
        console.log(res);
        this.isLoggingIn = false;

        if (res && res.env.user.type === 'Barangay') {
          this.router.navigate(['/barangay-portal/barangay-dashboard']);
          this.isLoggedIn = true;

          localStorage.setItem('SESSION_CSURF_TOKEN', res.csrf_token);
          localStorage.setItem('SESSION_AUTH', res.token);
        } else if (res && res.env.user.type === 'Notary') {
          this.router.navigate(['/notary-portal/notary-dashboard']);
          this.isLoggedIn = true;

          localStorage.setItem('SESSION_CSURF_TOKEN', res.csrf_token);
          localStorage.setItem('SESSION_AUTH', res.token);
        } else if (res && res.env.user.type === 'Consumer') {
          this.router.navigate(['/user-portal/']);
          this.isLoggedIn = true;

          localStorage.setItem('SESSION_CSURF_TOKEN', res.csrf_token);
          localStorage.setItem('SESSION_AUTH', res.token);
        } else {
          this.dialog
            .open(ActionResultComponent, {
              data: {
                msg: 'Unauthorized / Login Failed',
                success: false,
                button: 'Okay',
              },
            })
            .afterClosed()
            .subscribe((res: any) => {
              this.isLoggedIn = false;
              this.isLoggingIn = false;
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
              button: 'Okay',
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
