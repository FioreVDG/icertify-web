import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

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
      {
        field: '_riderFromBarangay',
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
        path: '_barangay.brgyDesc',
        type: 'text',
        selected: true,
        useAsFilter: true,
        choices: [],
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
        title: 'Picked up By',
        breakpoint: 'sm',
        path: '_riderFromBarangay',
        paths: ['_riderFromBarangay.lastName', '_riderFromBarangay.firstName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Picked up',
        breakpoint: 'sm',
        path: 'datePickedByRiderFromBrgy',
        type: 'date',
        selected: true,
      },
      {
        title: 'No. of Transaction',
        breakpoint: 'sm',
        path: 'transactionCount',
        type: 'text',
        isVirtual: true,
        selected: true,
      },
    ],
    checkBoxBtns: [
      {
        label: 'Mark as Received',
        action: 'receive',
      },
    ],
  },
  {
    label: 'Received',
    selected: false,
    isCheckbox: false,
    populate: [
      {
        field: '_receivedByNotary',
        select: 'firstName,lastName,middleName',
      },
      {
        field: '_riderFromBarangay',
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
        path: '_barangay.brgyDesc',
        type: 'text',
        selected: true,
        useAsFilter: true,
        choices: [],
      },
      {
        title: 'Received By',
        breakpoint: 'sm',
        path: '_receivedByNotary',
        paths: ['_receivedByNotary.lastName', '_receivedByNotary.firstName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Delivered By',
        breakpoint: 'sm',
        path: '_riderFromBarangay',
        paths: ['_riderFromBarangay.lastName', '_riderFromBarangay.firstName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Received',
        breakpoint: 'sm',
        path: 'dateReceivedByNotary',
        type: 'date',
        selected: true,
      },
      {
        title: 'No. of Transaction',
        breakpoint: 'sm',
        path: 'transactionCount',
        isVirtual: true,
        type: 'text',
        selected: true,
      },
    ],
  },
];

export const FOR_RECEIVING_FIND: Find[] = [
  {
    field: 'folderStatus',
    operator: '[nin]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Road',
  },
];

export const RECEIVED_FIND: Find[] = [
  {
    field: 'folderStatus',
    operator: '[nin]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Notary',
  },
];
