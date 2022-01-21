import { ActionResultComponent } from './../../dialogs/action-result/action-result.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/api/user/user.service';
import { Page } from './../../../models/queryparams.interface';
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
  saving: boolean = false;
  imgObj: any = {};
  toAddData: any = {};
  toUpdataData: any = {};
  addressTemp: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegistrantFormComponent>,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    let tempInfo: any = localStorage.getItem('BARANGAY_INFORMATION');
    this.brgyInfo = JSON.parse(tempInfo);
    console.log(this.brgyInfo);
    this.findDefaultValue('barangay');
    this.findDefaultValue('cityMun');
    this.findDefaultValue('province');
    this.findDefaultValue('region');
    // this.toUpdataData = this.data.obj;
    // console.log(this.toUpdataData);
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
          findBrgy.default = this.brgyInfo.address.barangay.brgyDesc;
          result = findBrgy.default;
          break;
        case 'cityMun':
          let findCity: any = findAddress.items.find(
            (o: any) => o.fcname === fcname
          );
          findCity.default = this.brgyInfo.address.cityMun.citymunDesc;
          result = findCity.default;
          break;
        case 'province':
          let findProv: any = findAddress.items.find(
            (o: any) => o.fcname === fcname
          );
          findProv.default = this.brgyInfo.address.province.provDesc;
          result = findProv.default;
          break;
        case 'region':
          let findReg: any = findAddress.items.find(
            (o: any) => o.fcname === fcname
          );
          findReg.default = this.brgyInfo.address.region.regDesc;
          result = findReg.default;
          break;
      }
    }
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
      barangay: this.brgyInfo.address.barangay,
      cityMun: this.brgyInfo.address.cityMun,
      province: this.brgyInfo.address.province,
      region: this.brgyInfo.address.region,
    };
    this.addressTemp = address;
    console.log(address);
  }

  imageEmitter(event: any) {
    console.log(event);
    this.imageFormValid = event.formValid;
    this.imgObj = event.images;
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.saving = true;
    delete this.toAddData.address1;
    delete this.toAddData.address2;
    this.toAddData.address = this.addressTemp;
    this.toAddData.images = this.imgObj;
    this.toAddData.birthDate = new Date(this.toAddData.birthDate);
    this.toAddData.mobileNumber = this.data.mobileNumber;
    console.log(this.toAddData);

    this.auth.registerUser(this.toAddData).subscribe(
      (res: any) => {
        console.log(res);
        this.saving = false;
        let userData = res.env.data;
        if (res) {
          this.dialog
            .open(ActionResultComponent, {
              data: {
                msg: `Account for ${userData.firstName} ${userData.lastName} has been successfully registered.`,
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
}
