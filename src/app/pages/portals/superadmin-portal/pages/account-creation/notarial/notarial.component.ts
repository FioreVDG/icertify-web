import { ApiService } from './../../../../../../service/api/api.service';
import { UpsertNotarialCommissionComponent } from './upsert-notarial-commission/upsert-notarial-commission.component';
import { NOTARIAL } from './config';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notarial',
  templateUrl: './notarial.component.html',
  styleUrls: ['./notarial.component.scss'],
})
export class NotarialComponent implements OnInit {
  column = NOTARIAL;
  dataSource = [];
  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.fetchNotarial();
  }
  openDialog() {
    this.dialog
      .open(UpsertNotarialCommissionComponent)
      .afterClosed()
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  fetchNotarial() {
    this.api.notarial.getAllNotarial().subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.env.notarial;
    });
  }
}
