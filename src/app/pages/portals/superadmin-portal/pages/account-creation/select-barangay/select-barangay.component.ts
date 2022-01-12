import { MatDialogRef } from '@angular/material/dialog';
import { UtilService } from 'src/app/service/util/util.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-select-barangay',
  templateUrl: './select-barangay.component.html',
  styleUrls: ['./select-barangay.component.scss'],
})
export class SelectBarangayComponent implements OnInit {
  barangayForm = new FormControl('', [Validators.required]);
  brgys = [];
  filteredBrgys: Observable<any> | undefined;
  constructor(
    private util: UtilService,
    private dialogRef: MatDialogRef<SelectBarangayComponent>
  ) {
    this.getListOfBarangay();
    this.filteredBrgys = this.barangayForm.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit(): void {}
  getListOfBarangay() {
    this.util
      .getRPC('barangays', {
        group: {
          field: 'citymunCode',
          id: '137404',
        },
      })
      .subscribe((res: any) => {
        res.data = res.data.sort((a: any, b: any) => {
          if (a.brgyCode < b.brgyCode) {
            return -1;
          }
          if (a.brgyCode > b.brgyCode) {
            return 1;
          }
          return 0;
        });
        this.brgys = res.data;
        console.log(this.brgys);
      });
  }
  private _filter(value: any) {
    if (typeof value !== 'object' && value !== '') {
      return this.brgys.filter((option: any) =>
        option.brgyDesc.toLowerCase().includes(value.toLowerCase())
      );
    }
    return this.brgys;
  }
  onOptionSelect(event: any) {
    let brgy = event?.option?.value || event;
    this.barangayForm.setValue(brgy.brgyDesc);
  }
  onClose(option?: any) {
    this.dialogRef.close(option);
  }
}
