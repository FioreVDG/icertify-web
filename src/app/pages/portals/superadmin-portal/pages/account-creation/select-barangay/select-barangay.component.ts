import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/service/util/util.service';
import {
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
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
  @Input() brgys = [];
  @Output() selectedEmitter = new EventEmitter<any>();
  selectedBrgy: any;
  filteredBrgys: Observable<any> | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private util: UtilService,
    private dialogRef: MatDialogRef<SelectBarangayComponent>
  ) {
    this.filteredBrgys = this.barangayForm.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnInit(): void {
    console.log(this.data);
    this.brgys = this.data.brgys;
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
    this.selectedBrgy = event?.option?.value || event;
    this.barangayForm.setValue(brgy.brgyDesc);

    this.selectedEmitter.emit({
      event: event.option?.value,
      isValid: this.barangayForm.valid,
    });
  }
  onClose(option?: any) {
    this.dialogRef.close(option);
  }
}
