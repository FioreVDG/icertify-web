import { BottomSheetComponent } from './../bottom-sheet/bottom-sheet.component';
import { UtilService } from './../../../service/util/util.service';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Column } from 'src/app/models/column.interface';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TableOutput } from 'src/app/models/tableemit.interface';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  checkedRows = new SelectionModel<any>(true, []);
  @Input() dataSource: any = [];
  @Input() checkBox: any;
  @Input() dataLength: number = 0;
  @Input() columns!: Array<Column>;
  @Input() bottomSheet: any;
  @Input() checkBoxDisableField!: any;
  @Input() pagination: any;
  @Output() onRowClick: any = new EventEmitter<any>();
  @Input() filterButtonConfig: any = [];
  duplicateColumns!: Array<Column>;
  @Output() onUpdateTableEmit: any = new EventEmitter<any>();

  @Output() onCheckBoxSelect = new EventEmitter<any>();
  @Input() loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: Array<string> = [];
  keyword: string = '';
  curPageIndex: number = 1;
  constructor(public util: UtilService, private _bs: MatBottomSheet) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    console.log(this.checkBoxDisableField);
    console.log(this.checkBox);
    this.duplicateColumns = JSON.parse(
      JSON.stringify(this.columns ? this.columns : this.defaultColumn())
    );
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
    console.log(this.columns);
    this.columns.forEach((d) => {
      if (d.selected) this.displayedColumns.push(d.path);
    });

    if (this.checkBox) {
      this.displayedColumns.unshift('select');
    }
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
  rowClick(element: any) {
    if (this.bottomSheet) {
      this._bs
        .open(BottomSheetComponent, { data: { config: this.bottomSheet } })
        .afterDismissed()
        .subscribe((res: any) => {
          let event = {
            obj: element,
            action: res,
          };
          this.onRowClick.emit(event);
        });
    } else {
      this.onRowClick.emit(element);
    }
  }
  defaultColumn() {
    return this.filterButtonConfig[0].column;
  }
  onFilterButtonClick(index: any) {
    this.keyword = '';
    this.loading = true;
    this.duplicateColumns = [];
    this.displayedColumns = [];
    this.filterButtonConfig.forEach((i: any) => {
      if (i.label === index) {
        this.checkBox = i.isCheckbox;
        this.duplicateColumns = i.column;
        i.selected = true;
        this.onUpdateTableEmit.emit(i);
      } else {
        i.selected = false;
      }
    });
    // console.log(this.duplicateColumns);
    this.updateBreakpoint();
  }
  onTriggerSearch() {
    this.dataSource = [];
    var fields: Array<string> = [];
    this.duplicateColumns.forEach((c) => {
      if (
        c.path &&
        !['date', 'special'].includes(c.type) &&
        c.path !== '_roleId'
      )
        fields.push(c.path);
      if (c.type === 'special') {
        c.paths?.forEach((p: any) => {
          fields.push(p);
        });
      }
    });
    let toEmit: TableOutput = {
      pageIndex: 0,
      pageSize: 10,
      find: [],
    };
    console.log(this.keyword);
    console.log(this.duplicateColumns);
    console.log(fields);
    if (this.keyword)
      toEmit['filter'] = {
        value: this.keyword,
        fields,
      };
    else {
      toEmit['filter'] = {
        value: '',
        fields,
      };
    }
    if (this.pagination.populate) toEmit['populate'] = this.pagination.populate;
    console.log(this.keyword);
    this.onUpdateTableEmit.emit(toEmit);
  }
  onClickPagination(event: TableOutput) {
    console.log(event);
    event['pageIndex'] = event.pageIndex + 1;
    this.curPageIndex = event.pageIndex;
    this.dataSource = [];
    var fields: Array<string> = [];
    this.duplicateColumns.forEach((c) => {
      if (c.path) fields.push(c.path);
    });
    if (this.keyword)
      event['filter'] = {
        value: this.keyword,
        fields,
      };

    this.pagination.pageIndex = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.onUpdateTableEmit.emit(this.pagination);
  }
  onCheckBoxChange(row: any) {
    this.checkedRows.toggle(row);
    this.onCheckBoxSelect.emit(this.checkedRows.selected);
  }

  checkAll() {
    if (!this.checkBoxDisableField) {
      if (this.checkedRows.selected.length === this.dataSource.length) {
        this.onCheckBoxSelect.emit([]);
        this.checkedRows.clear();
        return;
      }

      this.checkedRows.select(...this.dataSource);
      this.onCheckBoxSelect.emit(this.checkedRows.selected);
    }
  }

  getTextColor(col: Column, value: string) {
    let column: any = col;
    for (let color of column.textColor) {
      if (color.value === value) return color.color;
    }
  }

  checkBoxDisable(col: Column, value: string) {
    let column: any = col;
    for (let valueToDisable of column.CheckboxDisabler) {
      if (valueToDisable === value) return true;
    }
    return false;
  }
}
