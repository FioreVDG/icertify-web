import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Receiving',
    selected: true,
    isCheckbox: true,
    bottomSheet: [
      {
        label: 'View Transaction/s',
        action: 'viewTransac',
        icon: 'description',
      },
    ],
    populate: [
      {
        field: '_enroutedByNotary',
        select: 'firstName,lastName,middleName',
      },
    ],
    column: [
      {
        title: 'Batch Name',
        breakpoint: 'sm',
        path: 'folderName',

        type: 'text',
        selected: true,
      },
      {
        title: 'Marked as Enrouted by',
        breakpoint: 'sm',
        path: '_enroutedByNotary',
        paths: ['_enroutedByNotary.firstName', '_enroutedByNotary.lastName'],

        type: 'special',
        selected: true,
      },
      {
        title: 'Picked up by',
        breakpoint: 'sm',
        path: '_riderFromNotary',
        paths: ['_riderFromNotary.firstName', '_riderFromNotary.lastName'],
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
        label: 'Mark as Receive',
        action: 'receive',
      },
    ],
  },
  {
    label: 'Recieved',
    selected: false,
    isCheckbox: false,
    bottomSheet: [
      {
        label: 'View Transaction/s',
        action: 'viewTransac',
        icon: 'description',
      },
    ],
    populate: [
      {
        field: '_enroutedByNotary',
        select: 'firstName,lastName,middleName',
      },
    ],
    column: [
      {
        title: 'Batch Name',
        breakpoint: 'sm',
        path: 'folderName',

        type: 'text',
        selected: true,
      },
      {
        title: 'Marked as Enrouted by',
        breakpoint: 'sm',
        path: '_enroutedByNotary',
        paths: ['_enroutedByNotary.firstName', '_enroutedByNotary.lastName'],

        type: 'special',
        selected: true,
      },
      {
        title: 'Picked up by',
        breakpoint: 'sm',
        path: '_riderFromNotary',
        paths: ['_riderFromNotary.firstName', '_riderFromNotary.lastName'],
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
  },
];
export const FIND_FOR_RECEIVING: Find[] = [
  {
    field: 'status',
    operator: '=',
    value: 'Active',
  },
  {
    field: 'folderStatus',
    operator: '[in]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Road',
  },
];
export const FIND_RECEIVED: Find[] = [
  {
    field: 'status',
    operator: '=',
    value: 'Active',
  },
  {
    field: 'folderStatus',
    operator: '[in]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Barangay',
  },
];

export const NOTARIZED_DOCUMENT_RECEIVING_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Transaction/s', action: 'viewTransac', icon: 'description' },
];
