import { AreYouSureComponent } from './../../../../../../../shared/dialogs/are-you-sure/are-you-sure.component';
import { Section } from './../../../../../../../models/form.interface';
import { ApiService } from './../../../../../../../service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import {
  NOTARIAL_FORM,
  PERIOD_OF_VALIDITY,
  HOME_ADDRESS_FIELD,
  IBP_CHAPTER_REGION_PROVINCE,
  OFFICE_ADDRESS_FIELD,
  HOME_ADDRESS_SELECT,
  OFFICE_ADDRESS_SELECT,
} from './config';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AUTO_COMPLETE_FIELDS } from 'src/app/models/auto-complete.interface';

@Component({
  selector: 'app-upsert-notarial-commission',
  templateUrl: './upsert-notarial-commission.component.html',
  styleUrls: ['./upsert-notarial-commission.component.scss'],
})
export class UpsertNotarialCommissionComponent implements OnInit {
  @ViewChild('notarialDetails') notarialDetails!: FormComponent;
  @ViewChild('validityDetails') validityDetails!: FormComponent;
  @ViewChild('homeaddressDetails') homeaddressDetails!: FormComponent;
  @ViewChild('officeaddressDetails') officeaddressDetails!: FormComponent;
  @ViewChild('ibpchapterDetails') ibpchapterDetails!: FormComponent;
  @ViewChild('ibpprovDetails') ibpprovDetails!: FormComponent;
  loading = false;
  saving = false;
  dialogTitle: string =
    this.data && this.data.obj
      ? 'EDIT NOTARIAL COMMISSION'
      : 'ADD NOTARIAL COMMISSION';
  notarialFields: Section[] = NOTARIAL_FORM;
  period_of_validity: Section[] = PERIOD_OF_VALIDITY;
  home_brgyFields = HOME_ADDRESS_SELECT;
  office_brgyFields = OFFICE_ADDRESS_SELECT;
  addrFields: Section[] = HOME_ADDRESS_FIELD;
  officeAddrFields: Section[] = OFFICE_ADDRESS_FIELD;
  homeBrgyForm = this.fb.group({});
  officeBrgyForm = this.fb.group({});
  ibp = this.fb.group({
    ibp_chapter_region: new FormControl('', Validators.required),
    ibp_chapter_city_prov: new FormControl('', Validators.required),
  });
  show = false;
  ibp_chapter = IBP_CHAPTER_REGION_PROVINCE;
  ibp_provinces: AUTO_COMPLETE_FIELDS = {
    title: 'Select IBP City/Province',
    item: [],
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public util: UtilService,
    private api: ApiService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UpsertNotarialCommissionComponent>
  ) {}

  ngOnInit(): void {
    this.getRegions('home');

    this.getRegions('office');
    this.initializeBrgyForm();
    if (this.data && this.data.obj) this.initializeAvailableData();
  }
  getRegions(type?: any) {
    this.util.getRPC('regions', {}).subscribe((regions: any) => {
      this.initializedChoices('region', regions.data, type);
      this.loading = false;
    });
  }
  getProvinces(res: any, type?: any) {
    this.util
      .getRPC('provinces', {
        group: {
          field: 'regCode',
          id: res.regCode,
        },
      })
      .subscribe((prov: any) => {
        console.log(prov);
        this.initializedChoices('province', prov.data, type);
      });
  }
  getCities(res: any, type?: any) {
    this.util
      .getRPC('citymuns', {
        group: {
          field: 'provCode',
          id: res.provCode,
        },
      })
      .subscribe((cityMun: any) => {
        console.log(cityMun);

        this.initializedChoices('cityMun', cityMun.data, type);
      });
  }
  getBarangay(res: any, type?: any) {
    this.util
      .getRPC('barangay', {
        group: {
          field: 'citymunCode',
          id: res.citymunCode,
        },
      })
      .subscribe((brgy: any) => {
        console.log(brgy);

        this.initializedChoices('barangay', brgy.data, type);
      });
  }
  initializeBrgyForm() {
    let temp_home: any = {};

    let temp_brgy: any = {};
    this.home_brgyFields.forEach((field: any) => {
      let required = [];
      if (field.required) {
        required.push(Validators.required);
      }
      temp_home[field.fcname] = new FormControl('', required);
    });
    this.office_brgyFields.forEach((field: any) => {
      let required = [];
      if (field.required) {
        required.push(Validators.required);
      }
      temp_brgy[field.fcname] = new FormControl('', required);
    });

    this.homeBrgyForm = this.fb.group(temp_home);
    this.officeBrgyForm = this.fb.group(temp_brgy);
    //HOME
    this.homeBrgyForm.get('region')?.valueChanges.subscribe((res: any) => {
      this.getProvinces(res, 'home');
    });
    this.homeBrgyForm.get('province')?.valueChanges.subscribe((res: any) => {
      this.getCities(res, 'home');
    });
    this.homeBrgyForm.get('cityMun')?.valueChanges.subscribe((res: any) => {
      this.getBarangay(res, 'home');
    });
    if (this.data && this.data.obj) {
      this.homeBrgyForm.get('region')?.setValue(this.data.obj.address.region);
      this.homeBrgyForm
        .get('province')
        ?.setValue(this.data.obj.address.province);
      this.homeBrgyForm.get('cityMun')?.setValue(this.data.obj.address.cityMun);
      this.homeBrgyForm
        .get('barangay')
        ?.setValue(this.data.obj.address.barangay);
    }
    //OFFICE
    this.officeBrgyForm
      .get('office_region')
      ?.valueChanges.subscribe((res: any) => {
        this.getProvinces(res, 'office');
      });
    this.officeBrgyForm
      .get('office_province')
      ?.valueChanges.subscribe((res: any) => {
        this.getCities(res, 'office');
      });
    this.officeBrgyForm
      .get('office_cityMun')
      ?.valueChanges.subscribe((res: any) => {
        this.getBarangay(res, 'office');
      });
    if (this.data && this.data.obj) {
      this.officeBrgyForm
        .get('office_region')
        ?.setValue(this.data.obj.office_address.office_region);
      this.officeBrgyForm
        .get('office_province')
        ?.setValue(this.data.obj.office_address.office_province);
      this.officeBrgyForm
        .get('office_cityMun')
        ?.setValue(this.data.obj.office_address.office_cityMun);
      this.officeBrgyForm
        .get('office_barangay')
        ?.setValue(this.data.obj.office_address.office_barangay);
    }
  }
  initializedChoices(identifier: string, object: any, type: any) {
    // this.userFormFields[1].items.forEach((i: any) => {
    //   if (i.fcname === identifier) {
    //     i.choices = [];
    //     object.forEach((r: any) => {
    //       i.choices.push(r);
    //     });
    //   }
    // });

    if (type === 'home') {
      this.home_brgyFields.forEach((item: any) => {
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
    if (type === 'office') {
      this.office_brgyFields.forEach((item: any) => {
        // console.log(item);

        if (item.fcname === 'office_' + identifier) {
          item.choices = [];
          item.show = true;
          object.forEach((r: any) => {
            item.choices.push(r);
          });
        }
        // console.log(item.choices);
      });
    }
  }
  formInitialized() {}
  formListener(event: any) {}
  initializeAvailableData() {
    this.ibp.controls['ibp_chapter_region'].setValue(
      this.data.obj['ibp_chapter_region']
    );
    this.ibp.controls['ibp_chapter_city_prov'].setValue(
      this.data.obj['ibp_chapter_city_prov']
    );
  }
  initializeIbpProv(event: any, fcname: string) {
    console.log(event, fcname);
    this.ibp.get(fcname)?.setValue(event);
    if (fcname === 'ibp_chapter_region') {
      this.ibp_provinces.item = [];
      let filter = this.ibp_chapter.item.filter((i) => i.label === event);

      filter.forEach((i) => {
        i.sub_opt?.forEach((sub) => [
          this.ibp_provinces.item.push({ label: sub }),
        ]);
      });
    }
  }
  onSave() {
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          isUpdate: this.data && this.data.obj ? true : false,
          isAdd: this.data && this.data.obj ? false : true,
          msg:
            this.data && this.data.obj
              ? 'Update Notarial Commission'
              : 'Add New Notarial Commission',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.saving = true;
          let toSaveData = {
            ...this.notarialDetails.form.value,
            ...this.validityDetails.form.value,
            ...this.ibp.value,
          };
          toSaveData['address'] = {
            ...this.homeBrgyForm.value,
            ...this.homeaddressDetails.form.value,
          };
          toSaveData['office_address'] = {
            ...this.officeBrgyForm.value,
            ...this.officeaddressDetails.form.value,
          };
          toSaveData['type'] = 'Notary';
          console.log(toSaveData);
          let api = this.api.user.createAdmin(toSaveData);
          if (this.data && this.data.obj) {
            api = this.api.user.updateUser(this.data.obj._id, toSaveData);
          }
          api.subscribe(
            (res: any) => {
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
                  msg: `Error: ${err.error.message}`,
                  button: 'Okay',
                  success: false,
                },
                disableClose: true,
              });
            }
          );
        }
      });
  }
  compareFn(op1: any, op2: any) {
    // console.log(op1, op2);
    return op1.id === op2.id;
  }
}
