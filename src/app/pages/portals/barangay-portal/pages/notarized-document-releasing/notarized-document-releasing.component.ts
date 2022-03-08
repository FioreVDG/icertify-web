import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { UtilService } from 'src/app/service/util/util.service';
import { RegistrantFormComponent } from 'src/app/shared/components/registrant-form/registrant-form.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ViewAttachmentsComponent } from 'src/app/shared/components/view-attachments/view-attachments.component';
import { ViewVideoComponent } from 'src/app/shared/components/view-video/view-video.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import {
  FILT_BTN_CONFIG,
  FIND_FOR_RELEASING,
  FIND_RELEASED,
  NOTARIZED_DOCUMENT_RELEASING_BOTTOMSHEET,
} from './config';

@Component({
  selector: 'app-notarized-document-releasing',
  templateUrl: './notarized-document-releasing.component.html',
  styleUrls: ['./notarized-document-releasing.component.scss'],
})
export class NotarizedDocumentReleasingComponent implements OnInit {
  @ViewChild('table') appTable: TableComponent | undefined;

  filtBtnConfig = FILT_BTN_CONFIG;
  isCheckbox: boolean = true;
  selected = [];
  currTable: any;
  currPopulate: any;
  loading = true;
  bsConfig = NOTARIZED_DOCUMENT_RELEASING_BOTTOMSHEET;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [
      {
        field: '_createdBy',
      },
    ],
    bottomSheet: this.bsConfig,
    label: 'For Releasing',
  };
  routeLength = 3;
  dataSource = [];
  dataLength: number = 0;
  me: any;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private store: Store<{ user: User }>,
    private util: UtilService,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
    });
  }

  fetchData(event: any) {
    this.loading = true;
    console.log(event);

    let qry = {
      find: event.find ? event.find : [],
      page: event.pageIndex || 1,
      limit: (event.pageSize || 10) + '',
      filter: event.filter,
      populates: event.populate ? event.populate : [],
    };
    if (event.filter) qry.filter = event.filter;
    if (this.me) {
      qry.find.push({
        field: '_barangay.brgyCode',
        operator: '=',
        value: this.me._barangay.brgyCode,
      });
    }
    let api: any;
    if (event && event.label === 'For Releasing') {
      qry.find = qry.find.concat(FIND_FOR_RELEASING);
      // qry.find.push({
      //   field: '_barangay.brgyCode',
      //   operator: '=',
      //   value: this.me._barangay.brgyCode,
      // });
      console.log(qry);
      api = this.api.document.getAll(qry);
    } else {
      qry.find = qry.find.concat(FIND_RELEASED);
      // qry.find.push({
      //   field: '_barangay.brgyCode',
      //   operator: '=',
      //   value: this.me._barangay.brgyCode,
      // });
      api = this.api.document.getAll(qry);
    }

    console.log(qry);
    api.subscribe((res: any) => {
      console.log(res);
      if (res.status == 'Success') {
        this.dataSource = res.env.documents;
        this.dataLength = res.total;
      }
      this.loading = false;
    });
    this.currTable = event.label;
    this.page.populate = event.populate;
    this.isCheckbox = event.isCheckbox || true;
    this.bsConfig = event.bottomSheet;
  }

  tableUpdateEmit(event: any) {
    event['label'] = event.label || this.currTable;
    console.log(event.populate);
    this.fetchData(event);
    console.log(event);
  }
  onCheckBoxSelect(event: any) {
    console.log(event);
    this.selected = event;
  }

  onMark() {
    let ids: any = [];
    let docLogs: any = [];
    let docIds: any = [];
    console.log(this.selected);
    this.selected.forEach((id: any) => {
      ids.push(id._transactionId._id);
      docIds.push(id._id);
      docLogs.push({
        docDetails: id,
        message: 'Document Released to Indigent by Brgy Hall Staff',
        _barangay: id._barangay,
      });
    });
    console.log(this.selected);
    console.log(docLogs);
    console.log(ids);

    this.dialog
      .open(AreYouSureComponent, {
        data: {
          msg: 'Mark as released transaction/s?',
          isOthers: true,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          const loader = this.util.startLoading('Saving...');
          let apiQueries = ids.map((id: any) => {
            return this.api.transaction.update(
              {
                _releasedBy: this.me._id,
                dateReleased: new Date(),
                locationStatus: 'Released to Indigent',
              },
              id
            );
          });

          forkJoin(apiQueries).subscribe(
            (res: any) => {
              let apiQueries = docIds.map((id: any) => {
                return this.api.document.update(
                  {
                    documentLogStatus: 'Document Released to Indigent',
                  },
                  id
                );
              });
              forkJoin(apiQueries).subscribe(
                (res: any) => {
                  console.log(res);
                },
                (err: any) => {
                  console.log(err);
                }
              );
              this.api.documentlogs.createDocumentLogsMany(docLogs).subscribe(
                (res: any) => {
                  console.log(res);
                },
                (err) => {
                  console.log(err);
                }
              );
              this.util.stopLoading(loader);
              console.log(res);
              this.dialog
                .open(ActionResultComponent, {
                  data: {
                    success: true,
                    msg: `Transaction/s successfully marked as released!`,
                    button: 'Okay',
                  },
                })
                .afterClosed()
                .subscribe((res: any) => {
                  this.appTable?.checkedRows.clear();

                  this.selected = [];
                  this.fetchData(this.page);
                });
            },
            (err: any) => {
              console.log(err.error);
            }
          );
        }
      });
  }

  onCheckBoxClick(event: any) {
    switch (event.action) {
      case 'release':
        this.onMark();
        break;

      default:
        break;
    }
  }

  onRowClick(event: any) {
    console.log(event);
    switch (event.action) {
      case 'viewDoc':
        this.viewAttachments(event.obj);
        break;
      case 'viewInfo':
        event.obj.sender;
        this.viewPersonalInfo(event.obj.sender);
        break;
      case 'viewVid':
        this.viewVideoOfSigning(
          event.obj._transactionId.videoOfSignature.path_display
        );
        break;
      default:
    }
  }

  viewVideoOfSigning(path_display: string) {
    const dialogLoader = this.util.startLoading('Fetching video...');
    this.dbx.getTempLink(path_display).subscribe(
      (res: any) => {
        this.dialog
          .open(ViewVideoComponent, {
            width: '50%',
            disableClose: true,
            data: { video: res.result.link, header: 'Video of Signing' },
          })
          .afterOpened()
          .subscribe((res) => {
            this.util.stopLoading(dialogLoader);
          });
      },
      (error) => {
        this.util.stopLoading(dialogLoader);
        console.log(error);
      }
    );
  }

  viewPersonalInfo(obj: any) {
    this.dialog.open(RegistrantFormComponent, {
      data: { header: `Review Details`, obj },
      disableClose: true,
      width: 'auto',
      height: 'auto',
    });
  }

  viewAttachments(docs: Array<any>) {
    console.log(docs);
    this.dialog.open(ViewAttachmentsComponent, {
      data: {
        documents: [docs],
      },
      height: 'auto',
      width: '70%',
    });
  }
}
