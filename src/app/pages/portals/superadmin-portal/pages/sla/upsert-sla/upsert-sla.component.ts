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
import { SLA_FORM } from './config';

@Component({
  selector: 'app-upsert-sla',
  templateUrl: './upsert-sla.component.html',
  styleUrls: ['./upsert-sla.component.scss'],
})
export class UpsertSlaComponent implements OnInit {
  @ViewChild('sla') sla!: FormComponent;
  slaFormFields: Section[] = JSON.parse(JSON.stringify(SLA_FORM));
  currentType = '';
  loading = false;
  obj: any = {};
  isFormInitiated = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private api: ApiService,
    private util: UtilService,
    private dialogRef: MatDialogRef<UpsertSlaComponent>
  ) {}

  ngOnInit(): void {
    this.obj = this.data;
    console.log(this.obj);
  }

  formInitialized(e: any) {
    console.log(e);
    this.isFormInitiated = true;
  }

  formListener(e: any) {
    console.log(e);
    if (this.currentType != e.type) {
      this.currentType = e.type;
      e._userId = '';
      if (e.type === 'Barangay') {
        this.api.user
          .getAllUser({
            find: [
              {
                field: 'type',
                operator: '=',
                value: 'Barangay',
              },
            ],
          })
          .subscribe((res: any) => {
            console.log(res);
            this.slaFormFields[0].items[1].choices = res.env.users;
            this.slaFormFields[0].items[1].choiceLabel =
              'address.barangay.brgyDesc';
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.obj = e;
            }, 0);
            console.log(this.slaFormFields);
          });
      } else if (e.type === 'Notary') {
        this.api.user
          .getAllUser({
            find: [
              {
                field: 'type',
                operator: '=',
                value: 'Notary',
              },
            ],
          })
          .subscribe((res: any) => {
            console.log(res);
            this.slaFormFields[0].items[1].choices = res.env.users;
            this.slaFormFields[0].items[1].choiceLabel = 'firstName';
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.obj = e;
            }, 0);
            console.log(this.slaFormFields);
          });
      }
    } else {
      this.obj = e;
    }
  }

  addToSLA() {
    console.log(this.obj);
    const loader = this.util.startLoading('Initiating SLA...');
    this.api.sla.create(this.obj).subscribe(
      (res) => {
        this.util.stopLoading(loader);
        this.dialog
          .open(ActionResultComponent, {
            data: {
              msg: `${this.obj.type} SLA successfully initiated.`,
              success: true,
              button: 'Okay',
            },
          })
          .afterClosed()
          .subscribe((res) => {
            if (res) this.dialogRef.close(res);
          });
      },
      (err: any) => {
        this.util.stopLoading(loader);
        this.dialog.open(ActionResultComponent, {
          data: {
            msg: `Error: ${err.error.message}`,
            success: false,
            button: 'Okay',
          },
        });
      }
    );
  }
}
