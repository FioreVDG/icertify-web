import { Column } from 'src/app/models/column.interface';
import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';

export const BATCH_TRANSACTION_TABLE: Column[] = [
  {
    title: 'Batch Reference Code',
    breakpoint: 'sm',
    path: '_folderId.folderName',
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
    title: 'Transaction Reference Code',
    breakpoint: 'sm',
    path: 'refCode',
    type: 'text',
    selected: true,
  },
  {
    title: 'Date and Time Picked up',
    breakpoint: 'sm',
    path: '_folderId.datePickedFromBarangay',
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
];

export const BATCH_TRANSACTION_BOTTOMSHEET: BottomSheetItem[] = [
  {
    label: 'Start Video Conference',
    action: 'startConference',
    icon: 'videocam',
  },
  { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
  {
    label: 'View Personal Information/Proof of Identity',
    action: 'viewInfo',
    icon: 'assignment_ind',
  },
  { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
];
