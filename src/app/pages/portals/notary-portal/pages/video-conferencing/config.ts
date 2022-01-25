import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';

export const FILT_BTN: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Scheduling',
    selected: true,
    isCheckbox: true,

    column: [
      {
        title: 'Batch Reference Code',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: 'folderName',
      },
      {
        title: 'Barangay',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '_brgyId',
      },
      {
        title: 'Received by',
        breakpoint: 'sm',
        type: 'special',
        selected: true,
        path: '_receivedBy',
        paths: ['_receivedBy.firstName', '_receivedBy.lastName'],
      },
      {
        title: 'Date and Time Received',
        breakpoint: 'sm',
        type: 'date',
        selected: true,
        path: 'dateDropToNotary',
      },
      {
        title: 'No. of Transactions',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: 'transactionCount',
      },
    ],
  },
  {
    label: 'Scheduled',
    selected: false,
    isCheckbox: false,
    column: [
      {
        title: 'Batch Reference Code',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: 'folderName',
      },
      {
        title: 'Barangay',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '_brgyId',
      },
      {
        title: 'Received by',
        breakpoint: 'sm',
        type: 'special',
        selected: true,
        path: '_receivedBy',
        paths: ['_receivedBy.firstName', '_receivedBy.lastName'],
      },
      {
        title: 'Date and Time Received',
        breakpoint: 'sm',
        type: 'date',
        selected: true,
        path: 'dateDropToNotary',
      },
      {
        title: 'No. of Transactions',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: 'transactionCount',
      },
    ],
  },
];