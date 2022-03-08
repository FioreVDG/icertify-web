import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ADDRESS_SELECT } from './../../../pages/portals/superadmin-portal/pages/account-creation/users-table/user-form/user.config';
import { OtpComponent } from 'src/app/shared/components/otp/otp.component';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { ActionResultComponent } from './../../dialogs/action-result/action-result.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormComponent } from './../form/form.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { REGISTRATION_FORM } from './registrant-form';
import { Section } from 'src/app/models/form.interface';
import * as _ from 'lodash';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-registrant-form',
  templateUrl: './registrant-form.component.html',
  styleUrls: ['./registrant-form.component.scss'],
})
export class RegistrantFormComponent implements OnInit {
  @ViewChild('registrantDetails') registrantDetails!: FormComponent;
  registrantFromFields: Array<Section> = JSON.parse(
    JSON.stringify(REGISTRATION_FORM)
  );
  loading: boolean = true;
  brgyInfo: any;
  imageFormValid: boolean = false;
  imageFormDirty: boolean = false;
  imageCOIstatus = '';
  imageReason = '';
  saving: boolean = false;
  imgObj: any = {};
  toAddData: any = {};
  toUpdataData: any = {};
  addressTemp: any = {};
  reasonVal: any;
  formInitiated = false;
  brgyFields = ADDRESS_SELECT;
  brgyForm = this.fb.group({});
  fetchingDefaultData: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegistrantFormComponent>,
    private auth: AuthService,
    private dialog: MatDialog,
    public util: UtilService,
    private api: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data !== null) {
      if (this.data.obj) {
        if (this.data.obj.images.cert_of_indigency === 'Empty')
          delete this.data.obj.images.cert_of_indigency;
        this.toUpdataData = this.data.obj;
        this.imgObj = this.data.obj.images;
        this.addressTemp = this.data.obj.address;
        // this.imgObj.cert_of_indigency = 'Empty';
        console.log(this.imgObj);
      }
      console.log(this.toUpdataData);
      if (this.data.obj?.images?.reason_coi) {
        this.reasonVal = this.data.obj.images.reason_coi;
      }
    }
    let tempInfo: any = localStorage.getItem('BARANGAY_INFORMATION');
    this.brgyInfo = JSON.parse(tempInfo);
    console.log(this.brgyInfo);

    // console.log(this.brgyInfo._barangay.regCode);

    this.initializeBrgyForm();

    let findMobileNum: any;
    this.registrantFromFields.forEach((el: any) => {
      console.log(el);
      const disabledItemHeaders = [
        'Review Details',
        'Registrant Information',
        'View Registration Details',
      ];
      el.items.forEach((item: any) => {
        if (disabledItemHeaders.includes(this.data.header))
          item.disabled = true;
        else item.disabled = false;
      });
      findMobileNum = el.items.find((f: any) => f.fcname === 'mobileNumber');
      console.log(findMobileNum);
      if (findMobileNum && this.data.header === 'Add Indigent') {
        findMobileNum.default = this.data.mobileNumber;
        findMobileNum.disabled = true;
      }
    });
    console.log(this.registrantFromFields);
  }

  checkHeaderDisabler() {
    const disabledItemHeaders = [
      'Review Details',
      'Registrant Information',
      'Edit Registrant Details',
      'View Registration Details',
    ];

    if (disabledItemHeaders.includes(this.data.header)) return true;
    else return false;
  }

  checkImageBtnDisabler() {
    const disabler = [
      'Review Details',
      'Registrant Information',
      'View Registration Details',
    ];
    if (disabler.includes(this.data.header)) return true;
    else return false;
  }

  formInitialized() {
    console.log('Form Initialized!');
    console.log(this.registrantDetails);
  }

  formListener(event: any) {
    console.log(event);
    this.toAddData = { ...event };

    console.log(this.toAddData);
    let address = {
      address1: event.address1,
      address2: event.address2,
      barangay: event.barangay,
      cityMun: event.cityMun,
      province: event.province,
      region: event.region,
    };
    this.addressTemp = address;
    console.log(address);

    if (this.data.header === 'Edit Registrant Details') {
      this.toUpdataData = { ...event };

      let address = {
        address1: event.address1,
        address2: event.address2,
        barangay: event.barangay,
        cityMun: event.cityMun,
        province: event.province,
        region: event.region,
        ...this.brgyForm.value,
      };
      this.addressTemp = address;
      console.log(address);
    }
    console.log(this.toUpdataData);
  }

  imageEmitter(event: any) {
    console.log(event);
    this.imageFormValid = event.formValid;
    this.imageFormDirty = event.formDirty;
    this.imageCOIstatus = event?.COIstatus;
    this.imageReason = event?.reason;
    if (event.formDirty) this.imgObj = event.images;
    if (event.reason && event.reason !== '')
      this.imgObj.reason_coi = event.reason;

    if (event.images?.cert_of_indigency === '')
      event.images.cert_of_indigency = 'Empty';

    if (this.data.header === 'Edit Registrant Details') {
      // this.imgObj =this.data.obj.images;
    }
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    let omitField = ['address1', 'address2'];
    const loader = this.util.startLoading('Saving');
    this.saving = true;
    // delete this.toAddData.address1;
    // delete this.toAddData.address2;
    this.toAddData.address = {
      ...this.brgyForm.value,
      address1: this.toAddData.address1,
      address2: this.toAddData.address2,
    };
    this.toAddData.images = this.imgObj;
    this.toAddData.birthDate = new Date(
      this.toAddData.birthDate
    ).toLocaleDateString();
    this.toAddData.mobileNumber = this.data.mobileNumber;
    this.toAddData.type = 'Consumer';
    this.toAddData._barangay = this.brgyInfo._barangay;
    this.toAddData = _.omit(this.toAddData, omitField);
    console.log(this.toAddData);

    this.auth.registerUser(this.toAddData).subscribe(
      (res: any) => {
        console.log(res);
        this.saving = false;
        let userData = res.env.data;
        if (res) {
          this.util.stopLoading(loader);
          this.dialog
            .open(ActionResultComponent, {
              data: {
                msg: `Account for (+63)${userData.mobileNumber} has been successfully registered.`,
                misc: res.env.password,
                success: true,
                button: 'Start new registration',
              },
              disableClose: true,
            })
            .afterClosed()
            .subscribe((res: any) => {
              if (res) this.dialogRef.close();
            });
        }
      },
      (err) => {
        console.log(err);
        this.saving = false;

        this.util.stopLoading(loader);
        this.dialog.open(ActionResultComponent, {
          data: {
            msg: err.error.message || 'Server Error, Please try again!',
            success: false,
            button: 'Okay',
          },
        });
      }
    );
  }

  updateIndigent() {
    console.log(this.toUpdataData);
    console.log(this.imgObj);
    console.log(this.addressTemp);
    if (this.data.obj.mobileNumber !== this.toUpdataData.mobileNumber) {
      console.log('MAY OTP');
      this.dialog
        .open(OtpComponent, {
          data: { mobileNumber: this.toUpdataData.mobileNumber },
          panelClass: 'dialog-responsive-dark',
          disableClose: true,
        })
        .afterClosed()
        .subscribe((res: any) => {
          if (res) {
            this.proceedUpdating();
          }
        });
    } else {
      this.proceedUpdating();
    }
  }

  proceedUpdating() {
    const loader = this.util.startLoading('Saving');
    // delete this.toUpdataData.address1;
    // delete this.toUpdataData.address2;
    console.log(typeof this.imgObj.cert_of_indigency);
    if (typeof this.imgObj.cert_of_indigency === 'undefined') {
      this.imgObj.cert_of_indigency = 'Empty';
      this.imgObj.reason_coi = this.reasonVal;
      console.log(this.imgObj);
    } else {
      delete this.imgObj.reason_coi;
    }
    this.toUpdataData.address = this.addressTemp;
    this.toUpdataData.images = this.imgObj;
    this.toUpdataData.birthDate = new Date(
      this.toUpdataData.birthDate
    ).toLocaleDateString();
    this.toUpdataData.mobileNumber = this.toUpdataData.mobileNumber;
    console.log(this.toUpdataData);

    this.api.user
      .updateIndigent(this.data.obj._id, this.toUpdataData)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.util.stopLoading(loader);
          this.dialog
            .open(ActionResultComponent, {
              data: {
                msg: 'Registrant details successfully updated!',
                success: true,
                button: 'Okay',
              },
            })
            .afterClosed()
            .subscribe((res: any) => {
              if (res) this.dialogRef.close(true);
            });
        },
        (err) => {
          this.util.stopLoading(loader);
          console.log(err);
          this.dialog.open(ActionResultComponent, {
            data: {
              msg: err.error.message || 'Server error! Please try again.',
              success: false,
              button: 'Okay',
            },
          });
        }
      );
  }
  compareFn(op1: any, op2: any) {
    console.log(op1, op2);
    return op1.id === op2.id;
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

    console.log(this.brgyForm);

    this.getRegions();
  }

  getProvinces(res: any) {
    this.util
      .getRPC('provinces', {
        group: {
          field: 'provCode',
          id: res,
        },
      })
      .subscribe((prov: any) => {
        console.log(prov);
        this.brgyForm.get('province')?.setValue(prov.data[0]);
        console.log(this.brgyForm);
        this.initializedChoices('province', prov.data);
        this.getCities(
          this.checkHeaderDisabler()
            ? this.data.obj.address.cityMun.citymunCode
            : this.brgyInfo._barangay.citymunCode
        );
      });
  }
  getCities(res: any) {
    this.util
      .getRPC('citymuns', {
        group: {
          field: 'citymunCode',
          id: res,
        },
      })
      .subscribe((cityMun: any) => {
        console.log(cityMun);
        this.brgyForm.get('cityMun')?.setValue(cityMun.data[0]);
        console.log(this.brgyForm);
        this.initializedChoices('cityMun', cityMun.data);
        this.getBarangay(
          this.checkHeaderDisabler()
            ? this.data.obj.address.barangay.brgyCode
            : this.brgyInfo._barangay.brgyCode
        );
      });
  }
  getBarangay(res: any) {
    this.util
      .getRPC('barangay', {
        group: {
          field: 'brgyCode',
          id: res,
        },
      })
      .subscribe((brgy: any) => {
        this.brgyForm.get('barangay')?.setValue(brgy.data[0]);
        console.log(this.brgyForm);
        this.initializedChoices('barangay', brgy.data);
        this.formInitiated = true;
      });
  }

  getRegions() {
    this.util
      .getRPC('regions', {
        group: {
          field: 'regCode',
          id: this.checkHeaderDisabler()
            ? this.data.obj.address.region.regCode
            : this.brgyInfo._barangay.regCode,
        },
      })
      .subscribe((regions: any) => {
        this.brgyForm.get('region')?.setValue(regions.data[0]);
        console.log(this.brgyForm);
        this.initializedChoices('region', regions.data);
        this.getProvinces(
          this.checkHeaderDisabler()
            ? this.data.obj.address.province.provCode
            : this.brgyInfo._barangay.provCode
        );
      });
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
}
