import { SelectBarangayComponent } from './select-barangay/select-barangay.component';
import { MatDialog } from '@angular/material/dialog';
import { MENU } from './config';
import { Component, OnInit } from '@angular/core';
import { ActionMenuComponent } from './action-menu/action-menu.component';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
})
export class AccountCreationComponent implements OnInit {
  menu = MENU;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openMenu(action: string) {
    switch (action) {
      case 'barangay':
        this.dialog
          .open(SelectBarangayComponent, { disableClose: true })
          .afterClosed()
          .subscribe((res: any) => {
            console.log(res);
            if (res) {
              this.dialog
                .open(ActionMenuComponent, {
                  width: '70%',
                  height: '50%',
                  panelClass: ['dialog-no-background'],
                  disableClose: true,
                })
                .afterClosed()
                .subscribe((res: any) => {
                  console.log(res);
                });
            }
          });
        break;

      default:
        break;
    }
  }
}
