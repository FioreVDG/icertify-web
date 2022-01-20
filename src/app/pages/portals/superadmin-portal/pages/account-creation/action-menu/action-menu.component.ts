import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ActionMenuComponent>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
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
        this.router.navigate([`/${type[1]}/account-creation/access-roles`]);
        this.dialogRef.close();
        break;

      default:
        break;
    }
  }
}
