import { Component, OnInit } from '@angular/core';
import { FILT_BTN } from './config';

@Component({
  selector: 'app-barangay-video-conferencing',
  templateUrl: './barangay-video-conferencing.component.html',
  styleUrls: ['./barangay-video-conferencing.component.scss'],
})
export class BarangayVideoConferencingComponent implements OnInit {
  filterBtnConfig = FILT_BTN;
  loading: boolean = true;
  dataSource = [];
  dataLength: number = 0;
  page = {
    pageSize: 10,
    pageIndex: 1,
    populate: [],
  };
  currentTable: any;
  constructor() {}

  ngOnInit(): void {
    this.fetchData(this.page);
  }

  fetchData(event: any) {
    console.log(event);
  }

  tableUpdateEmit(event: any) {
    console.log(event);
    event.label = event.label || this.currentTable;
    this.fetchData(event);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
