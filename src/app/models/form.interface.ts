import { KeyPath } from './keypath.interface';

type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'date-range'
  | 'email'
  | 'mobileNumber'
  | 'select'
  | 'textarea'
  | 'checkbox';

type Collection = 'users';

export type ColumnSizes = 'sm' | 'md' | 'lg' | 'xl';

export interface Field {
  type: FieldType;
  colspan: { xs: number; sm: number; md: number; lg: number; xl: number };
  fcname: string;
  show: boolean;
  showIf?: string;
  label: string;
  placeholder?: string;
  hint?: string;
  minLength?: number;
  maxLength?: number;
  default?: any;
  min?: number;
  max?: number;
  geolocation?: { long: string; lat: string };
  range?: { startDate: Date; endDate: Date };
  rowspan?: number;
  choices?: Array<any>;
  choiceLabel?: string;
  choiceValue?: string;
  addCopyText?: boolean;
  checkboxValue?: Array<any>;
  path?: string;
  disabled?: boolean;
  readonly?: boolean;
  buttonicon?: string;
  optional?: boolean;
  suffix?: string;
  prefix?: string;
  collection?: Collection;
  isPercentage?: boolean;
}

export interface Section {
  label?: string;
  section: string;
  show: boolean;
  showIf?: string;
  db?: Collection | string;
  items: Array<Field>;
  replacers?: Array<KeyPath>;
  disabled?: boolean;
}

export interface StaticAutoComplete {
  label: string;
  colspan: { xs: number; sm: number; md: number; lg: number; xl: number };
  choices: Array<any>;
  show: boolean;
  fcname: string;
  placeholder?: string;
  disabled?: string;
  readonly?: string;
  optional?: boolean;
}
