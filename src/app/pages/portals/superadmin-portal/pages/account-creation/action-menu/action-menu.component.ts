import { SELECTIONS } from './selection.config';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent implements OnInit {
  @Output() selectionEmitter = new EventEmitter<any>();
  @Input() brgyDetails: any;
  selectedItem: FormControl = new FormControl(0, [Validators.required]);
  selections = SELECTIONS;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ActionMenuComponent>
  ) {}

  ngOnInit(): void {
    console.log(
      this.data && this.data.userType ? this.data.userType : undefined
    );
    console.log(this.brgyDetails);
  }

  onSelectItem(val: any) {
    this.selectedItem.setValue(val);
    this.selectedItem.markAsDirty();
    let isDirty = this.selectedItem.dirty;
    let isValid = this.selectedItem.valid;
    console.log(val);
    this.selectionEmitter.emit({
      isValid: isValid,
      isDirty: isDirty,
      value: val,
    });
  }
}
