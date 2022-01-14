import { UtilService } from './../../../service/util/util.service';
import { Component, Input, OnInit } from '@angular/core';
import { Column } from 'src/app/models/column.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dataSource: any = [];
  @Input() dataLength: number = 0;
  @Input() columns!: Array<Column>;

  duplicateColumns!: Array<Column>;

  displayedColumns: Array<string> = [];
  constructor(public util: UtilService) {}

  ngOnInit(): void {
    this.duplicateColumns = JSON.parse(JSON.stringify(this.columns));
    this.updateBreakpoint();
  }
  updateBreakpoint() {
    this.displayedColumns = [];
    let w = window.innerWidth;
    var bps: Array<string> = [];

    bps.push('xs');

    if (w > 576) {
      bps.push('sm');
    }

    if (w > 768) {
      bps.push('md');
    }

    if (w > 992) {
      bps.push('lg');
    }

    if (w > 1200) {
      bps.push('xl');
    }

    this.columns = this.duplicateColumns.filter((o) =>
      bps.includes(o.breakpoint)
    );

    this.columns.forEach((d) => {
      if (d.selected) this.displayedColumns.push(d.path);
    });
  }
}
