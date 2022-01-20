import { ApiService } from './../../../../../service/api/api.service';
import { FILT_BTN_CONFIG } from './config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch-delivery-management',
  templateUrl: './batch-delivery-management.component.html',
  styleUrls: ['./batch-delivery-management.component.scss'],
})
export class BatchDeliveryManagementComponent implements OnInit {
  filtBtnConfig = FILT_BTN_CONFIG;
  loading = true;
  page = {
    pageSize: 10,
    pageIndex: 1,
  };
  dataSource = [];
  dataLength: number = 0;
  constructor(private api: ApiService) {}

  ngOnInit(): void {}
  fetchData() {}
  tableUpdateEmit(event: any) {
    setTimeout(() => {
      this.loading = false;
      console.log(this.loading);
    }, 3000);
    console.log(event);
  }
}
