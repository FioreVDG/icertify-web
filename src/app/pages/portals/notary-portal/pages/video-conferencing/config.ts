import { Column } from 'src/app/models/column.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';

export const FILT_BTN: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Scheduling',
    selected: true,
    isCheckbox: true,
    populate: [
      {
        field: '_receivedByNotary',
        select: 'firstName,lastName,middleName',
      },
    ],
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
        path: '_barangay.brgyDesc',
        useAsFilter: true,
        choices: [],
      },
      {
        title: 'Received by',
        breakpoint: 'sm',
        type: 'special',
        selected: true,
        path: '_receivedByNotary',
        paths: ['_receivedByNotary.firstName', '_receivedByNotary.lastName'],
      },
      {
        title: 'Date and Time Received',
        breakpoint: 'sm',
        type: 'date',
        selected: true,
        path: 'dateReceivedByNotary',
      },
      {
        title: 'No. of Transactions',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: 'transactionCount',
      },
    ],
    checkBoxBtns: [
      {
        label: 'Set Schedule',
        action: 'schedule',
      },
    ],
  },
  {
    label: 'Scheduled',
    selected: false,
    isCheckbox: false,
    populate: [
      {
        field: '_conferenceId',
        select: '-__v',
      },
      {
        field: '_scheduledBy',
        select: '-__v',
      },
    ],
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
        path: '_barangay.brgyDesc',
        useAsFilter: true,
        choices: [],
      },
      {
        title: 'Schedule by',
        breakpoint: 'sm',
        type: 'special',
        selected: true,
        path: '_scheduledBy',
        paths: ['_scheduledBy.firstName', '_scheduledBy.lastName'],
      },
      {
        title: 'Date and Time Scheduled',
        breakpoint: 'sm',
        type: 'date',
        selected: true,
        path: '_conferenceId.createdAt',
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

export const SCHEDULED_COLUMNS: Array<Column> = [
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
    title: 'Queue No.',
    breakpoint: 'sm',
    path: 'queue',
    type: 'number',
    selected: true,
  },
  {
    title: 'Schedule',
    breakpoint: 'sm',
    path: 'schedule',
    type: 'date',
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
