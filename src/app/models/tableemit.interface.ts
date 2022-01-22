import { Find, Populate } from './queryparams.interface';

export interface TableOutput {
  populate?: Populate;
  pageSize: number;
  length?: number;
  pageIndex: number;
  previousPageIndex?: number;
  sort?: {
    active: string;
    direction: 'asc' | 'desc';
  };
  find?: Array<Find>;
  filter?: {
    value: string | number | boolean;
    fields: Array<string>;
  };
  type?: String;
}