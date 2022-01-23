import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Pick Up',
    selected: true,
    isCheckbox: true,
    bottomSheet: [
      { label: 'View Document/s', action: 'viewDoc' },
      {
        label: 'View Personal Information/Proof of Identity',
        action: 'viewInfo',
      },
      { label: 'View Video Of Signing', action: 'viewVid' },
    ],
    populate: [
      {
        field: '_createdBy',
        select: 'firstName,lastName,middleName',
      },
    ],

    column: [
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
    ],
  },
  {
    label: 'Enroute',
    selected: false,
    isCheckbox: false,
    bottomSheet: [{ label: 'View Transaction/s', action: 'viewTransac' }],
    populate: [
      {
        field: '_batchedBy',
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
        path: 'datePickedFromBarangay',

        type: 'date',
        selected: true,
      },
    ],
  },
];

export const BATCH_DELIVERY_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Document/s', action: 'viewDoc' },
  { label: 'View Personal Information/Proof of Identity', action: 'viewInfo' },
  { label: 'View Video Of Signing', action: 'viewVid' },
];
