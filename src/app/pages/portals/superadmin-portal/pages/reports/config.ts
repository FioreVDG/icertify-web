import { Column } from 'src/app/models/column.interface';

interface CollectionColumns {
  collection: string;
  columns: Array<Column>;
}

export const REPORT_TABLE_FORMATS: Array<CollectionColumns> = [
  {
    collection: 'folder',
    columns: [
      {
        title: 'Folder Name',
        breakpoint: 'sm',
        path: 'folderName',
        type: 'text',
        selected: true,
      },
    ],
  },
  {
    collection: 'transaction',
    columns: [
      {
        title: 'Reference Code',
        breakpoint: 'sm',
        path: 'refCode',
        type: 'text',
        selected: true,
      },
    ],
  },
];
