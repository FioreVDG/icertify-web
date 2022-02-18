import { BottomSheetItem } from './bottomsheet.interface';
import { Column } from './column.interface';
import { BUTTON, TABLE_BUTTON_CONFIG } from './table-button.interface';

export interface FILTER_BUTTON_COLUMN {
  label: String;
  isLimit?: number;
  sort?: {
    active: string;
    direction: 'asc' | 'desc';
  };
  selected: boolean;
  column: Array<Column>;
  populate?: Array<any>;
  isCheckbox?: boolean;
  bottomSheet?: Array<BottomSheetItem>;
  checkBoxBtns?: BUTTON[];
}
