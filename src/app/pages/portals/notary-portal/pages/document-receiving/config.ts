import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';

export const NOTARY_DOC_RECEIVING_FILT_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Receiving',
    selected: true,
    isCheckbox: true,

    populate: [
      {
        field: '_batchedBy',
        select: 'firstName,lastName,middleName',
      },
    ],

    column: [
      {
        title: 'Batch Reference Code',
        breakpoint: 'sm',
        path: 'folderName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Barangay',
        breakpoint: 'sm',
        path: 'barangay',
        type: 'text',
        selected: true,
      },
      {
        title: 'Batched By',
        breakpoint: 'sm',
        path: '_batchedBy',
        paths: ['_batchedBy.lastName', '_batchedBy.firstName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Picked up',
        breakpoint: 'sm',
        path: 'datePickedFromBarangay',
        type: 'date',
        selected: true,
      },
      {
        title: 'No. of Transaction',
        breakpoint: 'sm',
        path: 'transactionCount',
        type: 'text',
        selected: true,
      },
    ],
  },
  {
    label: 'Received',
    selected: false,
    isCheckbox: false,
    populate: [
      {
        field: '_receivedBy',
        select: 'firstName,lastName,middleName',
      },
    ],

    column: [
      {
        title: 'Batch Reference Code',
        breakpoint: 'sm',
        path: 'folderName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Barangay',
        breakpoint: 'sm',
        path: 'barangay',
        type: 'text',
        selected: true,
      },
      {
        title: 'Received By',
        breakpoint: 'sm',
        path: '_receivedBy',
        paths: ['_receivedBy.lastName', '_receivedBy.firstName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Picked up',
        breakpoint: 'sm',
        path: 'datePickedFromBarangay',
        type: 'date',
        selected: true,
      },
      {
        title: 'No. of Transaction',
        breakpoint: 'sm',
        path: 'transactionCount',
        type: 'text',
        selected: true,
      },
    ],
  },
];
