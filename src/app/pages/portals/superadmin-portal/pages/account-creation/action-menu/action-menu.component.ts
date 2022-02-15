import { SELECTIONS } from './selection.config';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() brgyDetails: any;
  selectedItem: FormControl = new FormControl(0, [Validators.required]);
  selections = SELECTIONS;
  @Output() selectionEmitter = new EventEmitter<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ActionMenuComponent>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(
      this.data && this.data.userType ? this.data.userType : undefined
    );
    console.log(this.brgyDetails);
  }

  onSelectAccessLevel(val: any) {
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

  redirectTo(route: any) {
    let type = this.router.url.split('/');
    let userType =
      this.data && this.data.userType ? this.data.userType : undefined;
    let brgyId =
      this.data && this.data.brgyDtls && this.data.brgyDtls.brgyCode
        ? this.data.brgyDtls.brgyCode
        : undefined;
    switch (route) {
      case 0:
        this.router.navigate([
          `/${type[1]}/account-creation/users`,
          { brgyId, userType },
        ]);
        this.dialogRef.close();
        break;

      case 1:
        this.router.navigate([
          `/${type[1]}/account-creation/access-roles`,
          { brgyId, userType },
        ]);
        this.dialogRef.close();
        break;

      default:
        break;
    }
  }
}
