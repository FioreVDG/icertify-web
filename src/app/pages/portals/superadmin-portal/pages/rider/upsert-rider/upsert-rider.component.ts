import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Section } from 'src/app/models/form.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { RIDER_FORM } from './config';

@Component({
  selector: 'app-upsert-rider',
  templateUrl: './upsert-rider.component.html',
  styleUrls: ['./upsert-rider.component.scss'],
})
export class UpsertRiderComponent implements OnInit {
  @ViewChild('riderDetails') riderDetails!: FormComponent;
  riderFormFields: Section[] = JSON.parse(JSON.stringify(RIDER_FORM));
  loading = false;
  obj: any;
  isFormInitiated = false;
  saving = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private util: UtilService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UpsertRiderComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    // this.initCluster();
    this.obj = this.data.obj;
  }

  // initCluster() {
  //   this.loading = true;
  //   this.riderFormFields[3].items[0].choices = this.data.clusters;

  //   if (this.riderFormFields[3].items[0].choices?.length) {
  //     this.obj = this.data.obj;
  //   }
  //   this.loading = false;
  // }

  formInitialized(e: any) {
    this.isFormInitiated = true;
  }

  formListener(event: any) {
    console.log(event);
  }

  onSave() {
    let toSaveData: any = {};
    toSaveData = this.riderDetails.form.value;
    delete toSaveData.address;
    toSaveData.address = {
      address1: this.riderDetails.form.controls['address'].value,
    };

    // if (this.data.obj) toSaveData.currentCluster = this.data.obj._clusterId._id;

    console.log(toSaveData);
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          msg: 'Save rider details?',
          isOthers: true,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          const loader = this.util.startLoading('Saving...');
          this.saving = true;
          let api: any;
          let message = '';

          if (this.data.action === 'create') {
            api = this.api.user.createRider(toSaveData);
            message = 'saved';
          } else {
            api = this.api.user.updateUser(this.data.obj._id, toSaveData);
            message = 'updated';
          }
          api.subscribe(
            (res: any) => {
              console.log(res);
              this.util.stopLoading(loader);
              this.saving = false;
              this.dialog
                .open(ActionResultComponent, {
                  data: {
                    success: true,
                    msg: `Rider information successfully ${message}!`,
                    button: 'Nice',
                  },
                })
                .afterClosed()
                .subscribe((res: any) => {
                  this.dialogRef.close(true);
                });
            },
            (err: any) => {
              this.util.stopLoading(loader);
              console.log(err);
            }
          );
        }
      });
  }
  onClose() {
    if (!this.riderDetails.form.pristine) {
      this.dialog
        .open(AreYouSureComponent, {
          data: {
            isOthers: true,
            msg: 'you want to cancel? Clicking "Yes" will not save rider details.',
          },
          disableClose: true,
        })
        .afterClosed()
        .subscribe((res) => {
          if (res) this.dialogRef.close();
        });
    } else {
      this.dialogRef.close();
    }
  }
}
