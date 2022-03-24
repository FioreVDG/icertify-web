import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ActionResultComponent } from '../../dialogs/action-result/action-result.component';
import { AreYouSureComponent } from '../../dialogs/are-you-sure/are-you-sure.component';
import { RegistrantFormComponent } from '../registrant-form/registrant-form.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePassForm = this.fb.group(
    {
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.matchPassword('newPassword', 'confirmPassword'),
    }
  );

  hideCurPass: boolean = true;
  hideNewPass: boolean = true;
  hideConfirmPass: boolean = true;
  saving: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegistrantFormComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  close() {
    if (this.changePassForm.pristine) this.dialogRef.close();
    else {
      this.dialog
        .open(AreYouSureComponent, {
          data: { isOther: true, msg: 'close? Input data will not be saved!' },
          disableClose: true,
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) this.dialogRef.close();
        });
    }
  }

  save() {
    let toSaveData = this.changePassForm.getRawValue();
    console.log(toSaveData);
    this.saving = true;
    this.auth.changePassword(toSaveData).subscribe(
      (res) => {
        console.log(res);
        this.saving = false;
        this.dialog
          .open(ActionResultComponent, {
            data: {
              msg: 'Successfully saved! You will be redirected to login page',
              success: true,
              button: 'Okay',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            this.saving = false;
            this.dialogRef.close(true);
          });
      },
      (err: any) => {
        this.dialog
          .open(ActionResultComponent, {
            data: {
              msg: `${err.error.message}`,
              success: false,
              button: 'Okay',
            },
            disableClose: true,
          })
          .afterClosed()
          .subscribe((res) => {
            this.saving = false;
            this.changePassForm.reset();
          });
      }
    );
  }

  matchPassword(newPassword: string, confirmPassword: string) {
    return (fb: FormGroup) => {
      const newPasswordControl = fb.controls[newPassword];
      const confirmPasswordControl = fb.controls[confirmPassword];

      if (!newPasswordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (newPasswordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }

  get changePassControl() {
    return this.changePassForm.controls;
  }
}
