import { Column } from 'src/app/models/column.interface';
import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';

export const BATCH_DELIVERY_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
  {
    label: 'View Personal Information/Proof of Identity',
    action: 'viewInfo',
    icon: 'assignment_ind',
  },
  { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
];
export const TRANSAC_TABLE_COLUMN: Array<Column> = [
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
      'Power of Attorney',
      'Medical Records',
      'Sworn Statements',
      'Affidavit',
      'Deeds',
      'Wills and Trusts',
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
  // {
  //   title: 'Uploaded by',
  //   breakpoint: 'sm',
  //   path: '_createdBy',
  //   paths: ['_createdBy.firstName', '_createdBy.lastName'],
  //   type: 'special',
  //   selected: true,
  // },
  // {
  //   title: 'Date and Time Received',
  //   breakpoint: 'sm',
  //   path: 'updatedAt',

  //   type: 'date',
  //   selected: true,
  // },
  // {
  //   title: 'No. of Documents',
  //   breakpoint: 'sm',
  //   path: 'documentCount',

  //   type: 'text',
  //   selected: true,
  // },
];
