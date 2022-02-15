import { UpsertAccountsComponent } from './upsert-accounts/upsert-accounts.component';
import { ApiService } from './../../../../../service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { SelectBarangayComponent } from './select-barangay/select-barangay.component';
import { MatDialog } from '@angular/material/dialog';
import { MENU } from './config';
import { Component, OnInit } from '@angular/core';
import { ActionMenuComponent } from './action-menu/action-menu.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
})
export class AccountCreationComponent implements OnInit {
  menu = MENU;
  brgys = [];
  currRoute: any;
  _brgyId = '';
  _notaryId = '';
  userType = '';

  constructor(
    private dialog: MatDialog,
    private util: UtilService,
    private router: Router,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getListOfBarangay();
    this.onRouteActive();
  }
  onRouteActive() {
    this.currRoute = this.router.url.split('/');
    console.log(this.activatedRoute.snapshot);
    if (this._brgyId || this._notaryId) this.getAccountDetails();
  }

  getAccountDetails() {
    console.log('peeking');
    this.api.user
      .getById(this._brgyId || this._notaryId)
      .subscribe((res: any) => {
        console.log(res);
        console.log('check here');
      });
  }

  ngOnInit(): void {}

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
        step = 2;
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
    });
  }

  openMenu(action: string) {
    console.log(action);
    switch (action) {
      case 'barangay':
        this.dialog
          .open(SelectBarangayComponent, {
            disableClose: true,
            data: { brgys: this.brgys },
          })
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
                  backdropClass: 'bdrop',
                  data: { brgyDtls: res, userType: 'Barangay' },
                })
                .afterClosed()
                .subscribe((res: any) => {
                  console.log(res);
                  this.onRouteActive();
                });
            }
          });
        break;
      case 'icertify':
        this.dialog
          .open(ActionMenuComponent, {
            width: '70%',
            height: '50%',
            panelClass: ['dialog-no-background'],
            disableClose: true,
            backdropClass: 'bdrop',
            data: { userType: 'iCertify' },
          })
          .afterClosed()
          .subscribe((res: any) => {
            console.log(res);
            this.onRouteActive();
          });
        break;
      case 'notary':
        this.router.navigate([
          `${this.currRoute[1]}/account-creation/notarial`,
        ]);
        this.onRouteActive();
        break;
      case 'qclegal':
        this.dialog
          .open(ActionMenuComponent, {
            width: '70%',
            height: '50%',
            panelClass: ['dialog-no-background'],
            disableClose: true,
            backdropClass: 'bdrop',
            data: { userType: 'QCLegal' },
          })
          .afterClosed()
          .subscribe((res: any) => {
            console.log(res);
            this.onRouteActive();
          });
        break;

      default:
        break;
    }
  }
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
}
