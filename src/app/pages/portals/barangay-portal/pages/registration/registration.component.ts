import { QueryParams } from './../../../../../models/queryparams.interface';
import { RegistrantFormComponent } from './../../../../../shared/components/registrant-form/registrant-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OtpService } from 'src/app/service/api/otp/otp.service';
import { UserService } from 'src/app/service/api/user/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UtilService } from 'src/app/service/util/util.service';
import { OtpComponent } from 'src/app/shared/components/otp/otp.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  mobileNumber: string = '';
  verifying: boolean = false;
  constructor(
    private util: UtilService,
    private auth: AuthService,
    private otp: OtpService,
    private user: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  numberInputOnly(event: any) {
    return this.util.formNumberInputOnly(event);
  }

  openForm() {
    this.dialog.open(RegistrantFormComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        header: 'Add Indigent',
        mobileNumber: this.mobileNumber,
      },
    });
  }

  send() {
    console.log(this.mobileNumber);
    this.verifying = true;
    let query: QueryParams = {
      find: [],
    };
    this.user.checkExistingMobileNumber(this.mobileNumber).subscribe(
      (res: any) => {
        console.log(res);
        this.verifying = false;
        if (res) {
          this.dialog
            .open(OtpComponent, {
              data: { mobileNumber: this.mobileNumber },
              panelClass: 'dialog-responsive-dark',
              disableClose: true,
            })
            .afterClosed()
            .subscribe((res: any) => {
              if (res) {
                this.dialog
                  .open(ActionResultComponent, {
                    data: {
                      msg: 'Complete your registration, Please provide first all the basic information to be eligible to start a transaction. Thank you!',
                      success: true,
                      button: 'Proceed',
                    },
                    disableClose: true,
                  })
                  .afterClosed()
                  .subscribe((res: any) => {
                    if (res) {
                      this.dialog
                        .open(RegistrantFormComponent, {
                          width: 'auto',
                          height: 'auto',
                          data: {
                            header: 'Add Indigent',
                            mobileNumber: this.mobileNumber,
                          },
                          disableClose: true,
                        })
                        .afterClosed()
                        .subscribe((res: any) => {});
                    }
                  });
              }
            });
        }
      },
      (err) => {
        console.log(err);
        this.dialog.open(ActionResultComponent, {
          data: { msg: err.error.message, success: false, button: 'Okay' },
        });
        this.verifying = false;
      }
    );
  }
}
