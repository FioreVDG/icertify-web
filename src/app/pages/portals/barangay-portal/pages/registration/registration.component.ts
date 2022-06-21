import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QueryParams } from './../../../../../models/queryparams.interface';
import { RegistrantFormComponent } from './../../../../../shared/components/registrant-form/registrant-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/api/user/user.service';
import { UtilService } from 'src/app/service/util/util.service';
import { OtpComponent } from 'src/app/shared/components/otp/otp.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { ApiService } from 'src/app/service/api/api.service';
import { Dropbox } from 'dropbox';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  mobile = new FormGroup({
    number: new FormControl('', [Validators.required, Validators.minLength(9)]),
  });
  verifying: boolean = false;
  constructor(
    private util: UtilService,
    private user: UserService,
    private dialog: MatDialog,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    // this.dbx.getAccess().subscribe((res) => console.log(res));
  }
  numberInputOnly(event: any) {
    return this.util.formNumberInputOnly(event);
  }

  openForm() {
    this.dialog.open(RegistrantFormComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        header: 'Add Indigent',
        mobileNumber: this.mobile.get('number')?.value,
      },
    });
  }

  send() {
    const loader = this.util.startLoading('Sending please wait');
    this.verifying = true;
    this.user
      .checkExistingMobileNumber(this.mobile.get('number')?.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.verifying = false;
          if (res) {
            this.util.stopLoading(loader);
            this.dialog
              .open(OtpComponent, {
                data: { mobileNumber: this.mobile.get('number')?.value },
                panelClass: 'dialog-responsive-dark',
                disableClose: true,
              })
              .afterClosed()
              .subscribe((res: any) => {
                if (res) {
                  this.dialog
                    .open(ActionResultComponent, {
                      data: {
                        msg:
                          'Complete your registration, Please provide first all the basic information to be eligible to start a transaction. Thank you!' ||
                          'Something went wrong! Please try again.',
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
                              mobileNumber: this.mobile.get('number')?.value,
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
          this.util.stopLoading(loader);
          this.dialog.open(ActionResultComponent, {
            data: { msg: err.error.message, success: false, button: 'Okay' },
          });
          this.verifying = false;
        }
      );
  }
}
