import { AreYouSureComponent } from './../../../../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { Section } from 'src/app/models/form.interface';
import { ROLE } from 'src/app/models/role.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { ADDRESS_SELECT, ROLE_ACCESS, USER_FORM } from './user.config';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @ViewChild('userDetails') userDetails!: FormComponent;
  @ViewChild('roleDetails') roleDetails!: FormComponent;

  dialogTitle: string = `${
    this.data && this.data.obj ? 'Update User' : 'Add User'
  }`;
  userFormFields: Section[] = USER_FORM;
  roleFormFields: Section[] = ROLE_ACCESS;
  regions = [];
  provinces = [];
  selectedAccessRole: any = [];
  brgyFields = ADDRESS_SELECT;
  brgyForm = this.fb.group({});
  RoleInterface = this.data && this.data.obj ? this.data.obj._role : {};
  loading = true;
  saving = false;
  formInitiated = false;
  loadingContent: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public util: UtilService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    this.getRegions();
    this.initializeBrgyForm();
    this.initRoles();
  }

  getRegions() {
    this.util.getRPC('regions', {}).subscribe((regions: any) => {
      this.regions = regions.data;
      this.initializedChoices('region', regions.data);
      this.loading = false;
    });
  }

  initRoles() {
    this.roleFormFields[0].items[0].choices = this.data.accessRoles;
  }
  roleFormListener(raw: any) {
    console.log(raw, 'OIFAHS');
    console.log(this.roleDetails.form.valid);
  }

  formInitialized() {
    console.log('Initialized');
    this.formInitiated = true;
  }
  formListener(event: any) {
    console.log(event);
  }

  initializedChoices(identifier: string, object: any) {
    this.brgyFields.forEach((item: any) => {
      console.log(item);

      if (item.fcname === identifier) {
        item.choices = [];
        item.show = true;
        object.forEach((r: any) => {
          item.choices.push(r);
        });
      }
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
      this.getProvinces(res);
    });
    this.brgyForm.get('province')?.valueChanges.subscribe((res: any) => {
      this.getCities(res);
    });
    this.brgyForm.get('cityMun')?.valueChanges.subscribe((res: any) => {
      this.getBarangay(res);
    });
    if (this.data && this.data.obj) {
      this.brgyForm.get('region')?.setValue(this.data.obj.address.region);
      this.brgyForm.get('province')?.setValue(this.data.obj.address.province);
      this.brgyForm.get('cityMun')?.setValue(this.data.obj.address.cityMun);
      this.brgyForm.get('barangay')?.setValue(this.data.obj.address.barangay);
    }
  }

  getProvinces(res: any) {
    this.loadingContent = true;
    this.util
      .getRPC('provinces', {
        group: {
          field: 'regCode',
          id: res.regCode,
        },
      })
      .subscribe((prov: any) => {
        this.loadingContent = false;
        console.log(prov);
        this.provinces = prov.data;
        this.initializedChoices('province', prov.data);
      });
  }
  getCities(res: any) {
    this.loadingContent = true;
    this.util
      .getRPC('citymuns', {
        group: {
          field: 'provCode',
          id: res.provCode,
        },
      })
      .subscribe((cityMun: any) => {
        this.loadingContent = false;

        this.initializedChoices('cityMun', cityMun.data);
      });
  }
  getBarangay(res: any) {
    this.loadingContent = true;
    this.util
      .getRPC('barangay', {
        group: {
          field: 'citymunCode',
          id: res.citymunCode,
        },
      })
      .subscribe((brgy: any) => {
        this.loadingContent = false;
        // console.log(brgy);

        this.initializedChoices('barangay', brgy.data);
      });
  }

  submit() {
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          msg: this.data.obj ? 'update user' : 'add new user',
          isOthers: true,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.onSave();
      });
  }

  onSave() {
    this.saving = true;
    let omitField = ['address1', 'address2'];
    let toSaveData = {
      ...this.userDetails.form.value,

      _barangay:
        this.data.brgyDetail !== 'undefined' ? this.data.brgyDetail : undefined,
      _notaryId:
        this.data._notaryId !== 'undefined' ? this.data._notaryId : undefined,
      type: this.data.type,
      _role:
        this.roleDetails && this.roleDetails.form
          ? this.roleDetails.form.value._role
          : undefined,
    };
    toSaveData['address'] = {
      ...this.brgyForm.value,
      address1: toSaveData.address1,
      address2: toSaveData.address2,
    };

    toSaveData = _.omit(toSaveData, omitField);

    console.log(toSaveData);
    const loader = this.util.startLoading('Saving...');
    let api = this.api.user.createUser(toSaveData);
    if (this.data.initial) api = this.api.user.createAdmin(toSaveData);
    if (this.data.obj)
      api = this.api.user.updateUser(this.data.obj._id, toSaveData);
    api.subscribe(
      (res: any) => {
        console.log(res);
        this.saving = false;
        this.util.stopLoading(loader);
        this.dialog
          .open(ActionResultComponent, {
            data: {
              success: true,
              msg: this.data.obj
                ? 'User updated Successfully!'
                : 'New user added successfully!',
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
        this.util.stopLoading(loader);
        this.dialog.open(ActionResultComponent, {
          data: {
            success: false,
            msg: err.error.message,
            button: 'Okay',
          },
        });
      }
    );
  }
  compareFn(op1: any, op2: any) {
    return op1.id === op2.id;
  }
  disAbler() {
    console.log(this.data);
    if (
      (this.data &&
        this.data.initial &&
        this.data.type &&
        this.data.type === 'QCLegal') ||
      (this.data &&
        this.data.initial &&
        this.data.obj &&
        this.data.obj.type === 'QCLegal')
    ) {
      console.log('WITHOUT ROLES');
      if (this.userDetails.form.valid && this.brgyForm.valid) {
        return false;
      } else return true;
    } else if (
      (this.data &&
        this.data.initial &&
        this.data.type &&
        this.data.type !== 'QCLegal') ||
      (this.data &&
        this.data.initial &&
        this.data.obj &&
        this.data.obj.type !== 'QCLegal')
    ) {
      if (this.userDetails.form.valid && this.brgyForm.valid) {
        return false;
      } else return true;
    } else {
      if (
        (this.data && this.data.type && this.data.type !== 'QCLegal') ||
        (this.data && this.data.obj && this.data.obj.type !== 'QCLegal')
      ) {
        if (
          this.userDetails.form.valid &&
          this.brgyForm.valid &&
          this.roleDetails.form.valid
        ) {
          return false;
        } else return true;
      } else {
        if (this.userDetails.form.valid && this.brgyForm.valid) {
          return false;
        } else return true;
      }
    }
  }
}
