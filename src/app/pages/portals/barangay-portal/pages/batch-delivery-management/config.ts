import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Pick Up',
    selected: true,
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
    populate: [
      {
        field: '_batchedBy',
        select: 'firstName,lastName',
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
        path: 'dtp',

        type: 'text',
        selected: true,
      },
    ],
  },
];
