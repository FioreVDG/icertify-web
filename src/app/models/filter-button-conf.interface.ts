import { Column } from './column.interface';

export interface FILTER_BUTTON_COLUMN {
  label: String;
  selected: boolean;
  column?: Array<Column>;
  populate?: Array<any>;
  isCheckbox?: boolean;
}
