import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Pick Up',
    selected: true,
    column: [
      {
        title: 'Transaction Reference Code',
        breakpoint: 'sm',
        path: 'transaction_ref_code',

        type: 'text',
        selected: true,
      },
      {
        title: 'Owner',
        breakpoint: 'sm',
        path: 'owner',

        type: 'text',
        selected: true,
      },
      {
        title: 'Uploaded by',
        breakpoint: 'sm',
        path: 'uploadedby',

        type: 'text',
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
        path: 'no_doc',

        type: 'text',
        selected: true,
      },
    ],
  },
  {
    label: 'Enroute',
    selected: false,
    column: [
      {
        title: 'Batch Name',
        breakpoint: 'sm',
        path: 'batchname',

        type: 'text',
        selected: true,
      },
      {
        title: 'Batched by',
        breakpoint: 'sm',
        path: 'batchby',

        type: 'text',
        selected: true,
      },
      {
        title: 'Date and Time Picked up',
        breakpoint: 'sm',
        path: 'dtp',

        type: 'text',
        selected: true,
      },
    ],
  },
  {
    label: 'Delivered',
    selected: false,
    column: [
      {
        title: 'Hey',
        breakpoint: 'sm',
        path: 'hey',
        paths: ['firstName', 'middleName', 'lastName'],
        type: 'special',
        selected: true,
      },
    ],
  },
];
