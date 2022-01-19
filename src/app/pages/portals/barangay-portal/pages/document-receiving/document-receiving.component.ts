import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/models/column.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { UtilService } from 'src/app/service/util/util.service';

@Component({
  selector: 'app-document-receiving',
  templateUrl: './document-receiving.component.html',
  styleUrls: ['./document-receiving.component.scss'],
})
export class DocumentReceivingComponent implements OnInit {
  datasource: Array<any> = [];
  columns: Column[] = [];
  dataLenght: number = 0;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private util: UtilService
  ) {}

  ngOnInit(): void {}
}
