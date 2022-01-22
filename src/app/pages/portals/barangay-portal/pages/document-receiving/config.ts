import { Column } from 'src/app/models/column.interface';
import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';

export const DOCUMENT_RECEIVING_TABLE: Column[] = [
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
    title: 'Uploaded By',
    breakpoint: 'sm',
    path: '_createdBy',
    paths: ['_createdBy.firstName', '_createdBy.lastName'],
    type: 'special',
    selected: true,
  },
  {
    title: 'Date and Time Received',
    breakpoint: 'sm',
    path: 'createdAt',
    type: 'date',
    selected: true,
  },
  {
    title: 'No. Of Documents',
    breakpoint: 'sm',
    path: 'documentCount',
    type: 'text', // make count type
    selected: true,
  },
  {
    title: 'Status',
    breakpoint: 'sm',
    path: 'transactionStatus',
    type: 'text',
    selected: true,
  },
];

export const DOC_RECEIVING_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Document/s', action: 'viewDoc' },
  { label: 'View Personal Information/Proof of Identity', action: 'viewInfo' },
  { label: 'View Video Of Signing', action: 'viewVid' },
];
