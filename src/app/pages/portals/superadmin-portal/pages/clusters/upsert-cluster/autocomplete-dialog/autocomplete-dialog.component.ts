import { MatDialogRef } from '@angular/material/dialog';
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
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete-dialog',
  templateUrl: './autocomplete-dialog.component.html',
  styleUrls: ['./autocomplete-dialog.component.scss'],
})
export class AutocompleteDialogComponent implements OnInit {
  brgyCtrl = new FormControl();
  filteredBarangays: Observable<any[]>;
  constructor(
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
      ],
      filter: {
        value,
        fields: ['address.barangay.brgyDesc'],
      },
    };
    // todo, add interface for response of endpoints
    return this.api.user.getAllUser(query).pipe(
      map((res: any) => {
        console.log(res);
        return res.env.users;
      })
    );
  }

  ngOnInit(): void {}

  displayWith(option: any) {
    if (option) return option.address.barangay.brgyDesc.toUpperCase();
    return '';
  }

  close() {
    this.dialogRef.close(this.brgyCtrl.value);
  }
}
