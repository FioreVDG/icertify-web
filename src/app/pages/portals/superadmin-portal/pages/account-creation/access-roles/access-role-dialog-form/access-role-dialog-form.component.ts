import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import {
  BARANGAY_NAVS,
  NOTARY_NAVS,
  SUPERADMIN_NAVS,
} from 'src/app/config/NAVIGATION';
import { Section } from 'src/app/models/form.interface';
import { NavNode } from 'src/app/models/treesidenav.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { ROLE_FORM } from './configs';

@Component({
  selector: 'app-access-role-dialog-form',
  templateUrl: './access-role-dialog-form.component.html',
  styleUrls: ['./access-role-dialog-form.component.scss'],
})
export class AccessRoleDialogFormComponent implements OnInit {
  @ViewChild('roleDetails') roleDetails!: FormComponent;
  @ViewChild('stepper') stepper!: MatStepper;
  dialogTitle: string = 'ADD ACCESS ROLE';
  roleFormFields: Section[] = ROLE_FORM;
  Roleinterface: any;
  details: any;
  saving: boolean = false;
  loading: boolean = false;
  accesses: NavNode[] = [];
  accessChanged: boolean = false;
  apiObserver = {
    next: (res: any) => {
      let pastTense = this.data.action.concat(
        this.data.action.endsWith('e') ? 'd' : 'ed'
      );
      this.sb.open(`Successfully ${pastTense} ${this.details.name}!`, 'Okay', {
        duration: 3500,
        panelClass: ['success'],
      });
      this.saving = false;
      this.dialogRef.close('success');
    },
    error: (err: any) => {
      console.log(err);
      this.sb.open(
        'Error: ' + (err.error.message || 'Something went wrong'),
        'Okay',
        {
          duration: 3500,
          panelClass: ['failed'],
        }
      );
      this.saving = false;
    },
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AccessRoleDialogFormComponent>,
    private api: ApiService,
    private dialog: MatDialog,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.data.action === 'update') {
      this.dialogTitle = this.data.type.toUpperCase() + ' DETAILS';
      this.accesses = this.updateValues(
        this.data.navType,
        this.data.form.access
      );
    } else {
      this.accesses = JSON.parse(JSON.stringify(this.data.navType));
    }
    this.Roleinterface = this.data.form;
  }

  formInitialized() {
    this.details = this.data.form;
  }

  formListener(raw: any) {
    if (this.data !== null || this.data !== undefined) {
      this.details = raw;
      if (this.data.action === 'update') this.accessChanged = true;
    }
  }

  resetForm() {
    this.stepper.reset();
    this.roleDetails.form.reset();
    for (let key of Object.keys(this.Roleinterface)) {
      this.roleDetails.form.get(key)?.setValue(this.Roleinterface[key]);
    }
    if (this.data.action === 'update') {
      this.accesses = this.updateValues(
        this.data.navType,
        this.data.form.access
      );
    } else {
      this.accesses = JSON.parse(JSON.stringify(this.data.navType));
    }
    this.accessChanged = false;
  }

  onSubmit() {
    this.dialog
      .open(AreYouSureComponent, {
        data: {
          header: 'Before you proceed...',
          msg: `${this.data.action} role: ${this.details.name}`,
        },
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) this.save();
      });
  }

  save() {
    this.saving = true;
    console.log(this.details);
    let body = {
      name: this.details.name,
      description: this.details.description,
      access: this.accesses,
      _brgyId:
        this.data._brgyId !== 'undefined' ? this.data._brgyId : undefined,
      _notaryId:
        this.data._notaryId !== 'undefined' ? this.data._notaryId : undefined,
      type:
        this.data.accountType === 'iCertify' ? 'Admin' : this.data.accountType,
    };
    console.log(body);
    if (this.data.action == 'add') {
      this.sb.open(`Adding ${this.details.name}...`, undefined);
      this.api.role.create(body).subscribe(this.apiObserver);
    } else if (this.data.action == 'update') {
      this.sb.open(`Saving changes for ${this.details.name}`, undefined);
      this.api.role
        .update(body, this.data.form._id)
        .subscribe(this.apiObserver);
    }
  }

  onClose() {
    if (this.roleDetails.form.dirty || this.accessChanged) {
      let msg_dialog;
      if (this.data.action === 'update') {
        msg_dialog = `stop editing the details of ${this.data.form.name}`;
      } else if (this.data.action === 'add') {
        msg_dialog = `stop adding new role`;
      } else {
        msg_dialog = 'THIS IS $ERROR$! Please Contact the System Administrator';
      }
      this.dialog
        .open(AreYouSureComponent, {
          data: {
            isOthers: true,
            msg: msg_dialog,
          },
        })
        .afterClosed()
        .subscribe((res: boolean) => {
          if (res) this.dialogRef.close();
        });
    } else {
      this.dialogRef.close();
    }
  }

  check(item: NavNode) {
    console.log(item);
    if (item.children && item.children.length) {
      item.children.forEach((child) => {
        child.hasAccess = item.hasAccess;
        this.check(child);
      });
    }
    this.checkMotherAccess(this.accesses);
    // this.accessChanged = true;
    //Check if accessible module has checked values
    if (this.accesses.filter((o) => o.hasAccess === true).length) {
      this.accessChanged = true;
    } else {
      this.accessChanged = false;
    }
  }
  private checkMotherAccess(items: any) {
    items.forEach((item: NavNode) => {
      if (item.children) {
        if (!item.children.filter((c) => c.hasAccess === true).length) {
          item.hasAccess = false;
        }
        this.checkMotherAccess(item.children);
      }
    });
  }

  private updateValues(newObj: NavNode[], oldObj: NavNode[]) {
    const cpyNewObj: NavNode[] = JSON.parse(JSON.stringify(newObj));
    const cpyOldObj: NavNode[] = JSON.parse(JSON.stringify(oldObj));
    for (let old of cpyOldObj) {
      let foundObj = cpyNewObj.find((obj: NavNode) => obj.label === old.label);
      if (foundObj) {
        this.updateChildValues(foundObj, old);
        foundObj.hasAccess = old.hasAccess;
        foundObj = { ...old, ...foundObj };
      }
    }
    return cpyNewObj;
  }
  private updateChildValues(found: NavNode, old: NavNode) {
    if (
      found.children &&
      found.children.length &&
      old.children &&
      old.children.length
    ) {
      for (let child of old.children) {
        let foundChild = found.children.find(
          (cObj: NavNode) => cObj.label === child.label
        );
        if (foundChild) {
          this.updateChildValues(foundChild, child);
          foundChild.hasAccess = child.hasAccess;
          foundChild = { ...child, ...foundChild };
        }
      }
    }
    found = { ...old, ...found };
  }
}
