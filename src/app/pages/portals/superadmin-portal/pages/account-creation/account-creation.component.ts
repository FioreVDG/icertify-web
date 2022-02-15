import { UpsertAccountsComponent } from './upsert-accounts/upsert-accounts.component';
import { UtilService } from 'src/app/service/util/util.service';
import { MatDialog } from '@angular/material/dialog';
import { MENU } from './config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
})
export class AccountCreationComponent implements OnInit {
  menu = MENU;
  brgys: Array<any> = [];
  loading: boolean = false;

  constructor(private dialog: MatDialog, private util: UtilService) {}

  ngOnInit(): void {
    this.getListOfBarangay();
  }

  getListOfBarangay() {
    this.loading = true;
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
        this.loading = false;
        this.brgys = res.data;
        console.log(this.brgys);
      });
  }

  _openMenu(action: string) {
    console.log(action);
    let step = 0;
    let userType: string = '';
    let header: string = '';
    switch (action) {
      case 'barangay':
        step = 1;
        userType = 'Barangay';
        header = 'Barangay Hall';
        break;
      case 'icertify':
        step = 2;
        userType = 'iCertify';
        header = 'iCertify Admin';
        break;
      case 'notary':
        step = 0;
        userType = 'Notary';
        header = 'Notary';
        break;
      case 'qclegal':
        step = 3;
        userType = 'QCLegal';
        header = 'QC Legal Department';
        break;
    }
    this.dialog.open(UpsertAccountsComponent, {
      data: {
        step: step,
        brgys: this.brgys,
        userType: userType,
        header: header,
      },
      minWidth: '50vw',
      minHeight: 'auto',
      disableClose: true,
    });
  }
}
