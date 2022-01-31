import { UtilService } from './../../../service/util/util.service';
import { ActionResultComponent } from './../../dialogs/action-result/action-result.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OtpService } from 'src/app/service/api/otp/otp.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  otp: string = '';
  show = false;
  verifying = false;
  isTimerOff = true;
  timeLeft = 300;
  interval: any;
  showInterface = false;
  otpFields = [
    {
      type: 'number',
      maxlength: '1',
      required: true,
      fcname: 'otp1',
    },
    {
      type: 'number',
      maxlength: '1',
      required: true,
      fcname: 'otp2',
    },
    {
      type: 'number',
      maxlength: '1',
      required: true,
      fcname: 'otp3',
    },
    {
      type: 'number',
      maxlength: '1',
      required: true,
      fcname: 'otp4',
    },
  ];

  otpVal = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OtpComponent>,
    private otpService: OtpService,
    private sb: MatSnackBar,
    private dialog: MatDialog,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.otpForm();
    this.send();
    this.startTimer();
  }

  otpForm() {
    const otpTemp: any = {};
    this.otpFields.forEach((el) => {
      let validators: any;
      if (el.required) {
        validators = [Validators.required];
      }
      otpTemp[el.fcname] = new FormControl('', validators);
    });
    this.otpVal = this.fb.group(otpTemp);
  }

  submit() {
    this.otp = '';
    this.verifying = true;
    this.otpFields.forEach((el) => {
      this.otp += this.otpVal.getRawValue()[el.fcname].toString();
    });

    console.log(this.otp);
    const loader = this.util.startLoading('Verifying Please wait');
    this.otpService
      .registerCheckOTP({
        mobileNumber: '+63' + this.data.mobileNumber,
        otp: this.otp,
      })
      .subscribe(
        (res) => {
          console.log(res);
          if (!this.data.from_fp) localStorage.removeItem('OTP_TOKEN');
          this.util.stopLoading(loader);
          this.verifying = false;
          this.dialogRef.close(true);
        },
        (err) => {
          this.verifying = false;
          console.log(err);
          this.util.stopLoading(loader);
          this.dialog.open(ActionResultComponent, {
            data: {
              success: false,
              msg: `${err.error.message}`,
              button: 'Okay',
            },
          });
          // this.sb.open(`${err.error.message}`, 'Got it!', {
          //   panelClass: ['failed'],
          // });
        }
      );
  }

  startTimer() {
    this.isTimerOff = false;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.isTimerOff = true;
        this.timeLeft = 300;
      }
    }, 1000);
  }

  resend() {
    this.startTimer();
    this.send();
  }

  otpController(event: any, next: any, prev: any) {
    // console.log(next, prev);
    if (event.target.value.length < 1 && prev) {
      prev.focus();
    } else if (next && event.target.value.length > 0) {
      next.focus();
    } else {
      return;
    }
  }

  send() {
    this.otpService
      .registerSendOTP({ mobileNumber: '+63' + this.data.mobileNumber })
      .subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('OTP_TOKEN', res.token);
        },
        (err) => {
          console.log(err);
          this.dialog.open(ActionResultComponent, {
            data: { msg: err.error.message, success: false, button: 'Okay' },
          });
        }
      );
  }
}
