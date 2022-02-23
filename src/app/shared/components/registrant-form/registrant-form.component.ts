import { OtpComponent } from 'src/app/shared/components/otp/otp.component';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { ActionResultComponent } from './../../dialogs/action-result/action-result.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormComponent } from './../form/form.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { REGISTRATION_FORM } from './registrant-form';
import { Section } from 'src/app/models/form.interface';
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
  registrantFromFields: Array<Section> = REGISTRATION_FORM;
  loading: boolean = true;
  brgyInfo: any;
  imageFormValid: boolean = false;
  imageFormDirty: boolean = false;
  saving: boolean = false;
  imgObj: any = {};
  toAddData: any = {};
  toUpdataData: any = {};
  addressTemp: any = {};
  reasonVal: any;
  formInitiated = false;
  fetchingDefaultData: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegistrantFormComponent>,
    private auth: AuthService,
    private dialog: MatDialog,
    private util: UtilService,
    private api: ApiService
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
    console.log(this.brgyInfo._barangay.regCode);

    this.findDefaultValue('barangay');
    this.findDefaultValue('cityMun');
    this.findDefaultValue('province');
    this.findDefaultValue('region');

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

  findDefaultValue(fcname: any) {
    let result: any;
    let findAddress: any = this.registrantFromFields.find(
      (el: any) => el.section === 'Address Information'
    );

    if (findAddress) {
      switch (fcname) {
        case 'barangay':
          let findBrgy: any = findAddress.items.find(
            (o: any) => o.fcname === fcname
          );

          findBrgy.default = this.brgyInfo._barangay.brgyDesc;
          result = findBrgy.default;
          break;
        case 'cityMun':
          let findCity: any = findAddress.items.find(
            (o: any) => o.fcname === fcname
          );

          this.util
            .getRPC('citymuns', {
              group: {
                field: 'citymunCode',
                id: this.brgyInfo._barangay.citymunCode,
              },
            })
            .subscribe((res: any) => {
              console.log(res);
              findCity.default = res.data[0].citymunDesc;
            });

          result = findCity.default;
          break;
        case 'province':
          let findProv: any = findAddress.items.find(
            (o: any) => o.fcname === fcname
          );
          this.util
            .getRPC('provinces', {
              group: {
                field: 'provCode',
                id: this.brgyInfo._barangay.provCode,
              },
            })
            .subscribe((res: any) => {
              console.log(res);
              findProv.default = res.data[0].provDesc;
            });
          result = findProv.default;
          break;
        case 'region':
          let findReg: any = findAddress.items.find(
            (o: any) => o.fcname === fcname
          );
          this.util
            .getRPC('regions', {
              group: {
                field: 'regCode',
                id: this.brgyInfo._barangay.regCode,
              },
            })
            .subscribe((res: any) => {
              if (res) {
                console.log(res);
                findReg.default = res.data[0].regDesc;
                this.formInitiated = true;
              }
            });
          result = findReg.default;
          break;
      }
    }
    console.log(result);
    return result;
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
    const loader = this.util.startLoading('Saving');
    this.saving = true;
    delete this.toAddData.address1;
    delete this.toAddData.address2;
    this.toAddData.address = this.addressTemp;
    this.toAddData.images = this.imgObj;
    this.toAddData.birthDate = new Date(
      this.toAddData.birthDate
    ).toLocaleDateString();
    this.toAddData.mobileNumber = this.data.mobileNumber;
    this.toAddData.type = 'Consumer';
    this.toAddData._barangay = this.brgyInfo._barangay;
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
    delete this.toUpdataData.address1;
    delete this.toUpdataData.address2;
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
}
