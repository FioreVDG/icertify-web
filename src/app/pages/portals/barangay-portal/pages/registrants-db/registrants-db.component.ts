import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import {
  REGISTRANT_FILT_BTN_CONFIG,
  REGISTRANT_BOTTOMSHEET,
  FIND_WITHOUT_CERTIFICATE,
  FIND_COMPLETE,
} from './registrant.config';

@Component({
  selector: 'app-registrants-db',
  templateUrl: './registrants-db.component.html',
  styleUrls: ['./registrants-db.component.scss'],
})
export class RegistrantsDbComponent implements OnInit {
  filtBtnConfig = REGISTRANT_FILT_BTN_CONFIG;
  selected: Array<any> = [];
  currTable: any;
  loading: boolean = true;
  bsConfig = REGISTRANT_BOTTOMSHEET;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [],
    bottomSheet: this.bsConfig,
    label: 'W/O Certificate of Indigency',
  };
  dataSource = [];
  dataLength: number = 0;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private util: UtilService
  ) {}

  ngOnInit(): void {}

  fetchData(event: any) {
    this.loading = true;
    console.log(event);

    let query: any = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      populate: event.populate ? event.populate : [],
    };
    if (event.filter) query.filter = event.filter;

    let api: any;

    console.log(query);
    if (event && event.label === 'W/O Certificate of Indigency') {
      query.find = query.find.concat(FIND_WITHOUT_CERTIFICATE);

      api = this.api.user.getAllIndigent(query);
    } else {
      query.find = query.find.concat(FIND_COMPLETE);

      api = this.api.user.getAllIndigent(query);
    }

    api.subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.dataSource = res.env.usersFinal;
        this.dataLength = res.total;
      }
      this.loading = false;
    });
    this.currTable = event.label;
    this.bsConfig = event.bottomSheet;
    console.log(this.bsConfig);
  }

  tableUpdateEmit(event: any) {
    event.label = event.label || this.currTable;

    this.fetchData(event);
    console.log(event);
  }

  onRowClick(event: any) {
    console.log(event);
    if (event.obj.images.cert_of_indigency === 'Empty')
      delete event.obj.images.cert_of_indigency;

    switch (event.action) {
      case 'editRegistrant':
        this.dialog
          .open(RegistrantFormComponent, {
            data: { obj: event.obj, header: 'Edit Registrant Details' },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) this.fetchData(this.page);
          });
        break;

      case 'deleteRegistrant':
        this.dialog
          .open(AreYouSureComponent, {
            data: {
              msg: `delete ${event.obj.firstName} ${event.obj.lastName}`,
              isDelete: true,
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) this.deleteIndigent(event.obj._id);
          });
        break;

      case 'viewRegistrant':
        this.dialog.open(RegistrantFormComponent, {
          data: { obj: event.obj, header: 'View Registration Details' },
        });
    }
  }

  deleteIndigent(id: string) {
    console.log(id);
    const loader = this.util.startLoading('Deleting Please wait');
    this.api.user.deleteUser(id).subscribe(
      (res: any) => {
        this.util.stopLoading(loader);
        console.log(res);
        this.dialog
          .open(ActionResultComponent, {
            data: {
              msg: 'Registrant successfully deleted!',
              button: 'Okay',
              success: true,
            },
          })
          .afterClosed()
          .subscribe((res: any) => {
            if (res) this.fetchData(this.page);
          });
      },
      (err) => {
        console.log(err);
        this.util.stopLoading(loader);
        this.dialog.open(ActionResultComponent, {
          data: {
            msg: err.error.message || 'Server error, Please try again',
            button: 'Okay',
            success: false,
          },
        });
      }
    );
  }
}
