import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api/api.service';
import { AddRiderComponent } from './add-rider/add-rider.component';
import { ASSIG_BARANGAY_TO_RIDER_FORM } from './config';

@Component({
  selector: 'app-assigning-barangay-to-rider',
  templateUrl: './assigning-barangay-to-rider.component.html',
  styleUrls: ['./assigning-barangay-to-rider.component.scss'],
})
export class AssigningBarangayToRiderComponent implements OnInit {
  loading: boolean = false;
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  dataSource: any[] = [];
  dataLength: number = 0;
  columns = ASSIG_BARANGAY_TO_RIDER_FORM;

  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData(this.page);
  }

  fetchData(event: any) {}

  onAdd() {
    this.dialog.open(AddRiderComponent, {
      disableClose: true,
      data: {},
      height: 'auto',
      width: '100%',
    });
  }
}
