import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { RegistrantFormComponent } from './../../../../../shared/components/registrant-form/registrant-form.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { QueryParams } from './../../../../../models/queryparams.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OtpService } from 'src/app/service/api/otp/otp.service';
import { UserService } from 'src/app/service/api/user/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UtilService } from 'src/app/service/util/util.service';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
})
export class NewTransactionComponent implements OnInit {
  mobileNumber: string = '';
  verifying: boolean = false;
  isUserVerified: boolean = false;
  details: any;
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

  send() {
    this.verifying = true;
    const query: QueryParams = {
      find: [
        {
          field: 'mobileNumber',
          operator: '=',
          value: this.mobileNumber,
        },
      ],
    };
    this.user.getAllUser(query).subscribe(
      (res: any) => {
        this.verifying = false;
        console.log(res);
        let details: any;

        res.env.users.forEach((el: any) => {
          details = el;
          this.details = details;
        });
        if (!res.env.users.length) {
          this.dialog.open(ActionResultComponent, {
            data: {
              msg: 'Mobile number is not yet registered. Please register first',
              success: false,
              button: 'Okay',
            },
          });
        } else {
          this.dialog
            .open(RegistrantFormComponent, {
              data: {
                header: `Review Details`,
                obj: details,
              },
              disableClose: true,
            })
            .afterClosed()
            .subscribe((res: any) => {
              if (res) {
                this.isUserVerified = true;
              }
            });
        }
      },
      (err) => {
        this.verifying = false;
        this.isUserVerified = false;
        console.log(err);
        this.dialog.open(ActionResultComponent, {
          data: {
            msg:
              err.errror.message || 'Something went wrong. Please try again.',
            success: false,
            button: 'Okay',
          },
        });
      }
    );
  }

  startTransaction() {
    this.dialog
      .open(AddTransactionComponent, {
        width: '75vw',
        height: 'auto',
        data: this.details,
      })
      .afterClosed()
      .subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.isUserVerified = false;
        }
      });
  }
}
