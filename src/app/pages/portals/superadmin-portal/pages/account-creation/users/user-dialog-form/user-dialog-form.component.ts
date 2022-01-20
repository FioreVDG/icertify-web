import { ActionResultComponent } from './../../../../../../../shared/dialogs/action-result/action-result.component';
import { ApiService } from './../../../../../../../service/api/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UtilService } from './../../../../../../../service/util/util.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Section } from 'src/app/models/form.interface';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { USER_FORM, ADDRESS_SELECT } from './config';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-user-dialog-form',
  templateUrl: './user-dialog-form.component.html',
  styleUrls: ['./user-dialog-form.component.scss'],
})
export class UserDialogFormComponent implements OnInit {
  @ViewChild('userDetails') userDetails!: FormComponent;
  dialogTitle: string = 'ADD USER FORM';
  userFormFields: Section[] = USER_FORM;
  regions = [];
  provinces = [];
  brgyFields = ADDRESS_SELECT;
  brgyForm = this.fb.group({});

  loading = true;
  saving = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public util: UtilService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserDialogFormComponent>
  ) {}

  ngOnInit(): void {
    this.getRegions();
    this.initializeBrgyForm();
  }

  getRegions() {
    this.util.getRPC('regions', {}).subscribe((regions: any) => {
      this.regions = regions.data;
      this.initializedChoices('region', regions.data);
      this.loading = false;
    });
  }
  formInitialized() {
    console.log('Initialized');
    // this.userDetails.form.get('region')?.valueChanges.subscribe((res: any) => {
    //   console.log(res);
    //   this.getProvinces(res);
    // });
  }
  formListener(event: any) {}

  initializedChoices(identifier: string, object: any) {
    // this.userFormFields[1].items.forEach((i: any) => {
    //   if (i.fcname === identifier) {
    //     i.choices = [];
    //     object.forEach((r: any) => {
    //       i.choices.push(r);
    //     });
    //   }
    // });
    this.brgyFields.forEach((item: any) => {
      console.log(item);

      if (item.fcname === identifier) {
        item.choices = [];
        item.show = true;
        object.forEach((r: any) => {
          item.choices.push(r);
        });
      }
      // console.log(item.choices);
    });
  }
  initializeBrgyForm() {
    let temp: any = {};
    this.brgyFields.forEach((field: any) => {
      let required = [];
      if (field.required) {
        required.push(Validators.required);
      }
      temp[field.fcname] = new FormControl('', required);
    });
    this.brgyForm = this.fb.group(temp);
    this.brgyForm.get('region')?.valueChanges.subscribe((res: any) => {
      console.log(res);

      this.getProvinces(res);
    });
    this.brgyForm.get('province')?.valueChanges.subscribe((res: any) => {
      this.getCities(res);
    });
    this.brgyForm.get('cityMun')?.valueChanges.subscribe((res: any) => {
      this.getBarangay(res);
    });
  }
  getProvinces(res: any) {
    this.util
      .getRPC('provinces', {
        group: {
          field: 'regCode',
          id: res.regCode,
        },
      })
      .subscribe((prov: any) => {
        console.log(prov);
        this.provinces = prov.data;
        this.initializedChoices('province', prov.data);
      });
  }
  getCities(res: any) {
    this.util
      .getRPC('citymuns', {
        group: {
          field: 'provCode',
          id: res.provCode,
        },
      })
      .subscribe((cityMun: any) => {
        console.log(cityMun);

        this.initializedChoices('cityMun', cityMun.data);
      });
  }
  getBarangay(res: any) {
    this.util
      .getRPC('barangay', {
        group: {
          field: 'citymunCode',
          id: res.citymunCode,
        },
      })
      .subscribe((brgy: any) => {
        console.log(brgy);

        this.initializedChoices('barangay', brgy.data);
      });
  }
  onSave() {
    this.saving = true;
    let omitField = ['address1', 'address2'];
    let toSaveData = {
      ...this.userDetails.form.value,

      _brgyId:
        this.data._brgyId !== 'undefined' ? this.data._brgyId : undefined,
      _notarialId:
        this.data._notarialId !== 'undefined'
          ? this.data._notarialId
          : undefined,
      type: this.data.type,
    };
    toSaveData['address'] = {
      ...this.brgyForm.value,
      address1: toSaveData.address1,
      address2: toSaveData.address2,
    };

    toSaveData = _.omit(toSaveData, omitField);

    console.log(toSaveData);
    this.api.user.createUser(toSaveData).subscribe(
      (res: any) => {
        console.log(res);
        this.saving = false;
        this.dialog
          .open(ActionResultComponent, {
            data: {
              success: true,
              button: 'Okay',
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            this.dialogRef.close(true);
          });
      },
      (err) => {
        this.saving = false;
        this.dialog.open(ActionResultComponent, {
          data: {
            success: false,
            msg: err.error.message,
          },
        });
      }
    );
  }
}
