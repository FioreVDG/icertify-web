import { Component, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { Section } from 'src/app/models/form.interface';
import { User } from 'src/app/models/user.interface';
import { CHOICES_RIDER_DATA } from 'src/app/pages/portals/barangay-portal/pages/batch-delivery-management/mark-as-enroute/config';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ActionResultComponent } from 'src/app/shared/dialogs/action-result/action-result.component';
import { AreYouSureComponent } from 'src/app/shared/dialogs/are-you-sure/are-you-sure.component';
import { MARK_AS_ENROUTE_FORM } from './mark-as-enroute';

@Component({
  selector: 'app-mark-as-enroute',
  templateUrl: './mark-as-enroute.component.html',
  styleUrls: ['./mark-as-enroute.component.scss'],
})
export class MarkAsEnrouteComponent implements OnInit {
  @ViewChild('riderForm') riderForm!: FormComponent;
  loading: boolean = true;
  saving: boolean = false;
  obj: any;
  riderList: any = CHOICES_RIDER_DATA;
  riderObj: any;

  me: any;
  toAddData: any = {};
  markAsEnrouteFormFields: Array<Section> = MARK_AS_ENROUTE_FORM;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MarkAsEnrouteComponent>,
    private api: ApiService,
    private dialog: MatDialog,
    private store: Store<{ user: User }>,
    private util: UtilService
  ) {}
  ngOnDestroy() {
    this.riderList.item = [];
  }
  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
    });
    console.log(this.data);
    this.obj = this.data.selected;
    console.log(this.obj);
    console.log(this.data.selected[0]._id);

    this.data.setting._riders.forEach((i: any) => {
      this.riderList.item.push({
        value: { name: i.firstName + ' ' + i.lastName, id: i._id },
      });
    });

    if (!this.riderList.item.length) {
      this.dialog
        .open(ActionResultComponent, {
          data: {
            msg: `No rider found in this cluster!`,
            success: false,
            button: 'Okay!',
          },
        })
        .afterClosed()
        .subscribe((_) => {
          this.dialogRef.close();
        });
    }
  }

  formInitialized() {}

  formListener(event: any) {
    this.toAddData = { ...event };
  }

  onSelect(event: any) {
    console.log(event);
    this.riderObj = event.id;
  }

  submit() {
    let docLogs: any = [];
    let docIds: any = [];
    let toAdd = {
      _riderFromNotary: this.riderObj,
      _enroutedByNotary: this.me._id,
      datePickedByRiderFromNotary: new Date(),
      dateEnroutedByNotary: new Date(),
      locationStatus: 'Enroute to Barangay',
    };
    console.log(toAdd);
    let enrouteQueries = this.data.selected.map((el: any) => {
      return this.api.folder.enroute(toAdd, el._id);
    });

    for (let item of this.obj) {
      item._transactions.forEach((el: any) => {
        docIds.push(el._documents[0]._id);
        docLogs.push({
          docDetails: el._documents[0],
          message: 'Marked as Enroute to Brgy Hall by Notarial Staff',
          _barangay: el._documents[0]._barangay,
        });
      });
    }

    // this.obj._transactions.forEach((el: any) => {
    //   docLogs.push({
    //     docDetails: el._documents[0],
    //     message: 'Marked as Enroute to Brgy Hall by Notarial Staff',
    //   });
    // });
    console.log(docLogs);
    console.log(enrouteQueries);

    this.dialog
      .open(AreYouSureComponent, {
        data: { msg: 'Mark as Enroute this batch?' },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          const loader = this.util.startLoading('Enrouting...');
          forkJoin(enrouteQueries).subscribe(
            (res) => {
              let apiQueries = docIds.map((id: any) => {
                return this.api.document.update(
                  {
                    documentLogStatus:
                      'Marked as Enroute to Brgy Hall by Notary',
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
                (resp: any) => {
                  console.log(resp);
                },
                (err) => {
                  console.log(err);
                }
              );
              this.util.stopLoading(loader);
              this.dialog
                .open(ActionResultComponent, {
                  data: {
                    msg: `Batches successfully enrouted`,
                    success: true,
                    button: 'Okay',
                  },
                  disableClose: true,
                })
                .afterClosed()
                .subscribe((res: any) => {
                  if (res) this.dialogRef.close(true);
                });
            },
            (err) => {
              this.util.stopLoading(loader);
            }
          );
        }
      });
  }
  close() {
    this.dialogRef.close(false);
  }
}
