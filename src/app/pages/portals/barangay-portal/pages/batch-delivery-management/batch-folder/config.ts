import { Column } from 'src/app/models/column.interface';
import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';

export const BATCH_DELIVERY_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Document/s', action: 'viewDoc' },
  { label: 'View Personal Information/Proof of Identity', action: 'viewInfo' },
  { label: 'View Video Of Signing', action: 'viewVid' },
];

export const TRANSAC_TABLE_COLUMN: Array<Column> = [
  {
    title: 'Transaction Reference Code',
    breakpoint: 'sm',
    path: 'refCode',

    type: 'text',
    selected: true,
  },
  {
    title: 'Owner',
    breakpoint: 'sm',
    path: 'sender',
    paths: ['sender.firstName', 'sender.lastName'],
    type: 'special',
    selected: true,
  },
  {
    title: 'Uploaded by',
    breakpoint: 'sm',
    path: '_createdBy',
    paths: ['_createdBy.firstName', '_createdBy.lastName'],
    type: 'special',
    selected: true,
  },
  {
    title: 'Date and Time Received',
    breakpoint: 'sm',
    path: 'dtr',

    type: 'text',
    selected: true,
  },
  {
    title: 'No. of Documents',
    breakpoint: 'sm',
    path: 'documentCount',

    type: 'text',
    selected: true,
  },
];