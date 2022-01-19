import { UtilService } from 'src/app/service/util/util.service';
import { ADDRESS_SELECT, NOTARIAL_FORM, PERIOD_OF_VALIDITY } from './config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Section } from 'src/app/models/form.interface';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upsert-notarial-commission',
  templateUrl: './upsert-notarial-commission.component.html',
  styleUrls: ['./upsert-notarial-commission.component.scss'],
})
export class UpsertNotarialCommissionComponent implements OnInit {
  @ViewChild('notarialDetails') notarialDetails!: FormComponent;
  @ViewChild('validityDetails') validityDetails!: FormComponent;
  loading = false;
  saving = false;
  dialogTitle: string = 'ADD NOTARIAL COMMISSION';
  notarialFields: Section[] = NOTARIAL_FORM;
  period_of_validity: Section[] = PERIOD_OF_VALIDITY;
  brgyFields = ADDRESS_SELECT;
  brgyForm = this.fb.group({});
  constructor(private fb: FormBuilder, public util: UtilService) {}

  ngOnInit(): void {
    this.getRegions();
    this.initializeBrgyForm();
  }
  getRegions() {
    this.util.getRPC('regions', {}).subscribe((regions: any) => {
      this.initializedChoices('region', regions.data);
      this.loading = false;
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
  formInitialized() {
    console.log('Initialized');
  }
  formListener(event: any) {}
  onSave() {
    let omitField = ['address1', 'address2'];
    let toSaveData = {
      ...this.notarialDetails.form.value,
      ...this.validityDetails.form.value,
    };
    toSaveData['address'] = {
      ...this.brgyForm.value,
      address1: toSaveData.address1,
      address2: toSaveData.address2,
    };
    console.log(toSaveData);
  }
}
