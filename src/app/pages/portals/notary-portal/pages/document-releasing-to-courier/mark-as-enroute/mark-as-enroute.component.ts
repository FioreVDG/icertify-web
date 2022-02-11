import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Section } from 'src/app/models/form.interface';
import { CHOICES_RIDER_DATA } from 'src/app/pages/portals/barangay-portal/pages/batch-delivery-management/mark-as-enroute/config';
import { ApiService } from 'src/app/service/api/api.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { MARK_AS_ENROUTE_FORM } from './mark-as-enroute';

@Component({
  selector: 'app-mark-as-enroute',
  templateUrl: './mark-as-enroute.component.html',
  styleUrls: ['./mark-as-enroute.component.scss'],
})
export class MarkAsEnrouteComponent implements OnInit {
  @ViewChild('enrouteDetails') enrouteDetails!: FormComponent;
  @ViewChild('riderForm') riderForm!: FormComponent;

  loading: boolean = true;
  saving: boolean = false;
  obj: any;
  riderList: any = CHOICES_RIDER_DATA;
  riderObj: any;

  toAddData: any = {};
  markAsEnrouteFormFields: Array<Section> = MARK_AS_ENROUTE_FORM;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MarkAsEnrouteComponent>,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obj = { ...this.data.selected[0] };
    console.log(this.obj);
    console.log(this.data.selected[0]._id);

    this.data.setting._riders.forEach((i: any) => {
      this.riderList.item.push({
        value: { name: i.firstName + ' ' + i.lastName, id: i._id },
      });
    });
  }

  formInitialized() {}

  formListener(event: any) {
    this.toAddData = { ...event };
  }

  onSelect(event: any) {
    console.log(event);
    this.riderObj = event.id;
  }

  submit() {
    let toAdd = {
      riderNotaryToBarangay: this.riderObj,
      datePickedFromNotary: new Date(),
      locationStatus: 'Enroute to Barangay',
    };
    console.log(toAdd);

    this.dialog
      .open(AreYouSureComponent, {
        data: { msg: 'Mark as received this batch?' },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.api.folder
            .enroute(toAdd, this.data.selected[0]._id)
            .subscribe((res) => {
              this.dialog
                .open(ActionResultComponent, {
                  data: {
                    msg: `${this.data.selected[0].folderName} successfully enrouted`,
                    success: true,
                    button: 'Okay',
                  },
                  disableClose: true,
                })
                .afterClosed()
                .subscribe((res: any) => {
                  if (res) this.dialogRef.close(true);
                });
            });
        }
      });
  }
  close() {
    this.dialogRef.close(false);
  }
}
