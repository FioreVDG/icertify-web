import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';
import { TABLE_BUTTON_CONFIG } from 'src/app/models/table-button.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Pick Up',
    selected: true,
    isCheckbox: true,

    bottomSheet: [
      { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
      {
        label: 'View Personal Information/Proof of Identity',
        action: 'viewInfo',
        icon: 'assignment_ind',
      },
      { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
    ],
    populate: [
      {
        field: '_createdBy',
        select: 'firstName,lastName,middleName',
      },
    ],
    sort: {
      active: 'updatedAt',
      direction: 'asc',
    },

    column: [
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
        title: 'Received By',
        breakpoint: 'sm',
        path: '_createdBy',
        paths: ['_createdBy.firstName', '_createdBy.lastName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Received',
        breakpoint: 'sm',
        path: 'updatedAt',

        type: 'date',
        selected: true,
      },
      {
        title: 'No. of Documents',
        breakpoint: 'sm',
        path: 'documentCount',
        isVirtual: true,
        type: 'text',
        selected: true,
      },
    ],
    checkBoxBtns: [
      {
        label: 'Mark as Enroute',
        action: 'enroute',
      },
    ],
  },
  {
    label: 'Enroute',
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
        field: '_batchedBy',
        select: 'firstName,lastName,middleName',
      },
    ],
    sort: {
      active: 'folderName',
      direction: 'desc',
    },
    column: [
      {
        title: 'Batch Name',
        breakpoint: 'sm',
        path: 'folderName',

        type: 'text',
        selected: true,
      },
      {
        title: 'Batched by',
        breakpoint: 'sm',
        path: '_batchedBy',
        paths: ['_batchedBy.firstName', '_batchedBy.lastName'],

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
    ],
  },
];
export const ENROUTE_FIND_BATCH: Find[] = [
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

export const BATCH_DELIVERY_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
  {
    label: 'View Personal Information/Proof of Identity',
    action: 'viewInfo',
    icon: 'assignment_ind',
  },
  { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
];
