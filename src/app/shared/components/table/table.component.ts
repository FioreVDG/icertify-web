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
import { QueryParams } from 'src/app/models/queryparams.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  checkedRows = new SelectionModel<any>(true, []);
  @Input() dataSource: any = [];
  @Input() isLimit: any;
  @Input() countSelected: any;
  @Input() isDisabled: boolean = false;
  @Input() checkBox: any;
  @Input() dataLength: number = 0;
  @Input() columns!: Array<Column>;
  @Input() bottomSheet: any;
  @Input() checkBoxDisableField!: any;
  @Input() pagination: any;
  @Input() filterButtonConfig: any = [];
  @Input() buttonConfig: any = {};
  @Input() uniqueCheckbox: any = false;
  @Input() loading = false;
  @Input() hideSearch = false;
  @Input() downloadExcelBtn = false;
  @Input() disableDownloadBtns = false;
  @Output() onDownloadExcelBtn = new EventEmitter<any>();
  @Output() onCheckBoxBtnClick: any = new EventEmitter<any>();
  @Output() onRowClick: any = new EventEmitter<any>();
  @Output() onCheckBoxSelect = new EventEmitter<any>();
  @Output() onUpdateTableEmit: any = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: Array<string> = [];
  keyword: string = '';
  curPageIndex: number = 1;
  duplicateColumns!: Array<Column>;
  find: any;
  label: any;
  @Input() hasFilter: boolean = false;

  constructor(
    public util: UtilService,
    private _bs: MatBottomSheet,
    public snackbar: MatSnackBar
  ) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    console.log(this.pagination, 'INIT');
    console.log(this.dataSource);
    console.log(this.filterButtonConfig);
    if (this.filterButtonConfig) {
      this.filterButtonConfig.forEach((i: any, index: any) => {
        if (index === 0) {
          this.label = i.label;
          this.checkBox = i.isCheckbox;
          this.columns = i.column;
          this.bottomSheet = i.bottomSheet;
          this.buttonConfig.checkBoxBtnConfig = i.checkBoxBtns;
          i.selected = true;
          let findFilterExist = i.column.find(
            (col: any) => col.useAsFilter === true
          );
          if (findFilterExist) this.hasFilter = true;
          i.page = this.pagination.pageIndex;
          i.limit = this.pagination.pageSize;
          this.onUpdateTableEmit.emit(i);
        } else {
          i.selected = false;
        }
      });
      console.log(this.filterButtonConfig);
    }
    this.duplicateColumns = JSON.parse(
      JSON.stringify(this.columns ? this.columns : this.defaultColumn())
    );
    this.updateBreakpoint();
    console.log(this.columns);
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

    // setTimeout(() => {
    //   this.loading = false;
    // }, 500);
  }
  rowClick(element: any) {
    console.log(element);
    if (this.bottomSheet && this.bottomSheet.length) {
      let filteredBS: any[] = [];
      this.bottomSheet.forEach((bs: any, index: number) => {
        if (bs.showIf) {
          let cond = bs.showIf.split('/');
          console.log(cond);
          let elVal = element[cond[0]];
          let operand = cond[1];
          let value =
            cond[2] == 'null'
              ? null
              : cond[2] == 'undefined'
              ? undefined
              : cond[2] == '1'
              ? 1
              : cond[2] == '0'
              ? 0
              : cond[2];
          console.log(elVal, operand, value);
          switch (operand) {
            case '=':
              if (elVal == value) {
                filteredBS.push(bs);
              }
              break;
            case '!=':
              if (elVal !== value) {
                filteredBS.push(bs);
              }

              break;
            case '<':
              if (elVal < value) {
                filteredBS.push(bs);
              }
              break;
            case '>':
              if (Array.isArray(elVal)) {
                if (elVal.length > value) {
                  filteredBS.push(bs);
                }
              } else {
                if (elVal > value) {
                  filteredBS.push(bs);
                }
              }
              break;
            default:
              break;
          }
        } else {
          filteredBS.push(bs);
        }
      });
      if (filteredBS.length) {
        this._bs
          .open(BottomSheetComponent, {
            data: { config: filteredBS },
            panelClass: 'btm-darken',
          })
          .afterDismissed()
          .subscribe((res: any) => {
            let event = {
              obj: element,
              action: res,
            };
            this.onRowClick.emit(event);
          });
      } else {
        let event = { obj: element, action: 'no_action_avail' };
        this.onRowClick.emit(event);
      }
    } else {
      this.onRowClick.emit(element);
    }
  }
  defaultColumn() {
    return this.filterButtonConfig[0].column;
  }
  onFilterButtonClick(index: any) {
    console.log(this.pagination, 'FUNCTION');
    this.pagination.pageIndex = 1;
    this.pagination.pageSize = 10;
    this.loading = true;
    this.dataSource = [];
    this.keyword = '';
    this.duplicateColumns = [];
    this.displayedColumns = [];
    this.filterButtonConfig.forEach((i: any) => {
      if (i.label === index) {
        this.label = i.label;
        this.checkBox = i.isCheckbox;
        this.columns = i.column;
        this.bottomSheet = i.bottomSheet;
        this.buttonConfig.checkBoxBtnConfig = i.checkBoxBtns;
        i.selected = true;
        let findFilterExist = i.column.find(
          (col: any) => col.useAsFilter === true
        );
        if (findFilterExist) this.hasFilter = true;
        else this.hasFilter = false;
        console.log(i);
        this.onUpdateTableEmit.emit(i);
      } else {
        i.selected = false;
      }
    });
    this.duplicateColumns = JSON.parse(
      JSON.stringify(this.columns ? this.columns : this.defaultColumn())
    );
    this.checkedRows.clear();
    // console.log(this.duplicateColumns);
    this.updateBreakpoint();
  }

  checkBoxBtnClick(action: any) {
    this.onCheckBoxBtnClick.emit({
      selected: this.checkedRows.selected,
      action,
    });
  }

  onTriggerSearch(toFind?: any) {
    this.dataSource = [];
    var fields: Array<string> = [];
    this.duplicateColumns.forEach((c) => {
      if (
        c.path &&
        !['date', 'special', 'count'].includes(c.type) &&
        c.path !== '_role' &&
        !c.isVirtual
      )
        fields.push(c.path);
      if (c.type === 'special') {
        c.paths?.forEach((p: any) => {
          fields.push(p);
        });
      }
    });
    this.find = toFind;
    let toEmit: TableOutput = {
      pageIndex: 0,
      pageSize: 10,
      find: toFind ? toFind : [],
    };

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
    // console.log(this.keyword);
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
    this.pagination['filter'] = event['filter'];
    this.pagination['label'] = this.label;

    this.onUpdateTableEmit.emit(this.pagination);
  }
  onCheckBoxChange(row: any) {
    // console.log(row);
    this.checkedRows.toggle(row);
    this.onCheckBoxSelect.emit(this.checkedRows.selected);
  }
  onCheckBoxChangeUnique(row: any) {
    if (!this.checkedRows.selected.includes(row)) {
      this.checkedRows.clear();
    }
    this.checkedRows.toggle(row);

    this.onCheckBoxSelect.emit(this.checkedRows.selected);
  }

  onCheckBoxClick(row: any) {
    if (this.uniqueCheckbox) {
      this.onCheckBoxChangeUnique(row);
    } else {
      this.onCheckBoxChange(row);
    }
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
    } else {
      const numSelected = this.checkedRows.selected.length;
      const numSelectedMinusDisabled = this.dataSource.filter((row: any) => {
        return (
          row[this.checkBoxDisableField.column] !==
          (this.checkBoxDisableField.value == 'null'
            ? null
            : this.checkBoxDisableField.value == 'undefined'
            ? undefined
            : this.checkBoxDisableField.value)
        );
      }).length;

      if (numSelected === numSelectedMinusDisabled) {
        this.onCheckBoxSelect.emit([]);
        this.checkedRows.clear();
        return;
      } else {
        this.dataSource.forEach((row: any) => {
          if (
            row[this.checkBoxDisableField.column] !==
            (this.checkBoxDisableField.value == 'null'
              ? null
              : this.checkBoxDisableField.value == 'undefined'
              ? undefined
              : this.checkBoxDisableField.value)
          )
            this.checkedRows.select(row);
        });
        this.onCheckBoxSelect.emit(this.checkedRows.selected);
      }
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
  autoCheck(row: any, index: any) {
    // console.log(row, index);
    if (this.isLimit && index + 1 <= this.isLimit) {
      this.checkedRows.select(row);
      this.onCheckBoxSelect.emit(this.checkedRows.selected);
    }
    return this.checkedRows.isSelected(row);
  }

  ShowColumns(event: any) {
    this.updateBreakpoint();
  }

  checkExistingValue(filt: any) {
    let chk: any = filt.filter((o: any) => o.value);
    if (chk.length) return false;
    else return true;
  }

  clearValues() {
    this.columns.forEach((f: any) => {
      delete f.value;
    });
    this.keyword = '';
    this.onTriggerSearch([]);
  }

  filter() {
    this.dataSource = [];
    let tempFilter: any = [];

    let findVal: any = this.columns.filter((o: any) => o.value);
    console.log(findVal);
    if (findVal) {
      findVal.forEach((val: any) => {
        let path = val.path;
        let operator = 'eq';
        // GUMAGANA NA YUNG may . sa PATH ///////////////////
        // if (path.split('.').length !== 1) {
        //   let pathArray = path.split('.');
        //   path = pathArray[0];
        //   operator = pathArray[1];
        // }
        tempFilter.push({
          field: path,
          operator: `[${operator}]=`,
          value: val.value,
        });
      });
    }
    console.log([...tempFilter]);
    let toFind = [...tempFilter];
    this.onTriggerSearch(toFind);
  }

  triggerRefresh() {
    this.dataSource = [];
    var toEmit: TableOutput = {
      pageIndex: 0,
      pageSize: 10,
    };
    var fields: Array<string> = [];
    this.duplicateColumns.forEach((c) => {
      if (c.path) fields.push(c.path);
    });

    this.pagination['filter'] = {
      value: this.keyword,
      fields,
    };

    this.onTriggerSearch(this.find);
  }

  downloadExcel() {
    let query: QueryParams = {
      find: this.find ? this.find : [],
      populates: this.pagination.populate ? this.pagination.populate : [],
    };
    if (this.keyword) {
      let fields: any = [];
      this.duplicateColumns.forEach((c) => {
        if (
          c.path &&
          !['date', 'special', 'count'].includes(c.type) &&
          c.path !== '_role' &&
          !c.isVirtual
        )
          fields.push(c.path);
        if (c.type === 'special') {
          c.paths?.forEach((p: any) => {
            fields.push(p);
          });
        }
      });
      query['filter'] = {
        value: this.keyword,
        fields: fields,
      };
    }
    let toEmit = {
      label: this.label,
      query,
      columns: this.duplicateColumns,
    };
    this.onDownloadExcelBtn.emit(toEmit);
  }
}
