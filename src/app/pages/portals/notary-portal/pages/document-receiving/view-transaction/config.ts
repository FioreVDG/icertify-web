import { Column } from 'src/app/models/column.interface';
import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';

export const VIEW_TRANSACTION_TABLE: Column[] = [
  {
    title: 'Transaction Reference Code',
    breakpoint: 'sm',
    path: 'refCode',
    type: 'text',
    selected: true,
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
    path: '_folderId.datePickedByRiderFromBrgy',
    type: 'date',
    selected: true,
  },
  {
    title: 'No. Of Documents',
    breakpoint: 'sm',
    isVirtual: true,
    path: 'documentCount',
    type: 'text', // make count type
    selected: true,
  },
];

export const VIEW_TRANSACTION_TABLE_DOC_RELEASING: Column[] = [
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
    title: 'Date and Time of Notarization',
    breakpoint: 'sm',
    path: 'dateNotarized',
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
    type: 'text',
    selected: true,
  },
  // {
  //   title: 'No. Of Documents',
  //   breakpoint: 'sm',
  //   isVirtual: true,
  //   path: 'documentCount',
  //   type: 'text', // make count type
  //   selected: true,
  // },
];

export const VIEW_TRANSACTION_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
  {
    label: 'View Screenshot/s',
    action: 'viewSS',
    icon: 'photo_library',
    showIf: 'screenShots/>/0',
  },
  {
    label: 'View Personal Information/Proof of Identity',
    action: 'viewInfo',
    icon: 'assignment_ind',
  },
  { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
];
