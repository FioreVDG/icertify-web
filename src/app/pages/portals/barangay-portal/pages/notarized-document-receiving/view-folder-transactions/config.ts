import { Column } from 'src/app/models/column.interface';
import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';

export const FOLDER_TRANSACTION_TABLE: Column[] = [
  {
    title: 'Document Reference Code',
    breakpoint: 'sm',
    path: 'refCode',
    type: 'text',
    selected: true,
  },
  {
    title: 'Document Title',
    breakpoint: 'sm',
    path: 'documentName',
    type: 'text',
    selected: true,
  },
  {
    title: 'Document Type',
    breakpoint: 'sm',
    path: 'documentType',
    type: 'text',
    selected: true,
    useAsFilter: true,
    choices: [
      'Special Power of Attorney (SPA)',
      'Affidavit',
      'Brgy. Compromise Agreement',
      'Quitclaim',
      'Others',
    ],
  },
  {
    title: 'QC Indigent',
    breakpoint: 'sm',
    path: 'sender',
    paths: ['sender.firstName', 'sender.lastName'],
    type: 'special',
    selected: true,
  },
  {
    title: 'Date and Time Picked up',
    breakpoint: 'sm',
    path: '_transactionId._folderId.datePickedByRiderFromBrgy',
    type: 'date',
    selected: true,
  },
  {
    title: 'Date and Time Received',
    breakpoint: 'sm',
    path: '_transactionId._folderId.dateReceivedByBrgy',
    type: 'date',
    selected: true,
  },
  {
    title: 'Status',
    breakpoint: 'sm',
    path: 'documentStatus',
    type: 'text',
    selected: true,
    textColor: [
      {
        value: 'Notarized',
        color: '#83b9a1' || 'green',
      },
      {
        value: 'Unnotarized',
        color: '#83b9a1' || 'green',
      },
    ],
    useAsFilter: true,
    choices: ['Notarized', 'Unnotarized'],
  },
  {
    title: 'Remark',
    breakpoint: 'sm',
    path: 'remark',
    type: 'text', // make count type
    selected: true,
  },
];

export const FOLDER_TRANSACTION_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
  {
    label: 'View Personal Information/Proof of Identity',
    action: 'viewInfo',
    icon: 'assignment_ind',
  },
  { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
];
