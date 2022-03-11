import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueryParams } from 'src/app/models/queryparams.interface';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  map,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './../../../../../../../service/api/api.service';
import { FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete-dialog',
  templateUrl: './autocomplete-dialog.component.html',
  styleUrls: ['./autocomplete-dialog.component.scss'],
})
export class AutocompleteDialogComponent implements OnInit {
  brgyCtrl = new FormControl();
  selectedBarangays: any[] = [];
  filteredBarangays: Observable<any[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private dialogRef: MatDialogRef<AutocompleteDialogComponent>
  ) {
    this.filteredBarangays = this.brgyCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this._filter(val || '');
      })
    );
  }

  private _filter(value: string): Observable<any[]> {
    var query: QueryParams = {
      find: [
        {
          value: 'Barangay',
          field: 'type',
          operator: '=',
        },
        {
          value: true,
          field: 'isMain',
          operator: '=',
        },
        {
          field: '_barangay.brgyCode',
          operator: '[nin]=',
          value: this.selectedBarangays.join(','),
        },
        {
          value: 'null',
          field: '_clusterId',
          operator: '[eq]=',
        },
      ],
      filter: {
        value,
        fields: ['_barangay.brgyDesc'],
      },
    };
    // todo, add interface for response of endpoints

    // Todo filter CLUSTERED barangays
    return this.api.user.getAllUser(query).pipe(
      map((res: any) => {
        console.log(res);
        let users = res.env.users;
        if (this.data) {
          if (this.data.objBarangay.length) {
            this.data.objBarangay.forEach((el: any, index: number) => {
              if (!this.selectedBarangays.includes(el._barangay.brgyCode)) {
                console.log('test: ' + el._barangay);
                users.push(el);
              }
            });
          }
        }
        console.log(users);
        return users;
      })
    );
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.barangays.length) {
      for (const barangay of this.data.barangays) {
        if (barangay._barangay)
          this.selectedBarangays.push(barangay._barangay.brgyCode);
        console.log(this.selectedBarangays);
      }
    }

    // this.getClusters();
  }

  displayWith(option: any) {
    if (option) return option._barangay.brgyDesc.toUpperCase();
    return '';
  }

  close() {
    this.dialogRef.close(this.brgyCtrl.value);
  }

  // getClusters() {
  //   this.api.cluster.getAll({ find: [] }).subscribe((res: any) => {
  //     console.log(res);

  //     if (res.env.clusters.length) {
  //       for (let cluster of res.env.clusters) {
  //       }
  //     }
  //   });
  // }
}
