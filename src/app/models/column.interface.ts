export interface Column {
  title: string;
  breakpoint: Breakpoint;
  path: string;
  isVirtual?: Boolean; // ADD THIS TO VIRTUALS set false
  subpath?: any;
  paths?: Array<string>;
  type: ColumnType;
  dateFormat?: DateFormat;
  selected: Boolean;
  referencePath?: string;
  alternativePath?: string;
  textColor?: Array<Color>;
  isCheckbox?: boolean;
  disableCheckbox?: Array<CheckboxDisabler>;
}

interface CheckboxDisabler {
  value: string;
}
interface Color {
  value: string;
  color: string;
}

type Breakpoint = 'xs' | 'sm' | 'lg' | 'xl' | 'md';

type DateFormat = 'raw' | 'humanize';

type ColumnType =
  | 'date'
  | 'text'
  | 'number'
  | 'percentage'
  | 'array'
  | 'special'
  | 'checkbox'
  | 'fileSize'
  | 'count';
