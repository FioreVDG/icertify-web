import { Column } from 'src/app/models/column.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const VIDEO_CONF_BARANGAY_TABLE: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'Pending',
    selected: true,
    populate: [
      {
        field: '_notaryId',
        select: 'firstName,lastName,middleName',
      },
    ],
    column: [
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
      {
        title: 'Notary',
        breakpoint: 'sm',
        path: '_notaryId',
        paths: ['_notaryId.firstName', '_notaryId.lastName'],
        type: 'special',
        selected: true,
      },
      // PAGAWA :)
      // {
      //   title: 'Queue No.',
      //   breakpoint: 'sm',
      //   path: '',
      //   type: 'text',
      //   selected: true,
      // },
      {
        title: 'Scheduled By',
        breakpoint: 'sm',
        path: '_transactionId._scheduledBy',
        paths: [
          '_transactionId._folderId._scheduledBy.firstName',
          '_transactionId._folderId._scheduledBy.lastName',
        ],
        type: 'special',
        selected: true,
      },
      // PAGAWA :)
      // {
      //   title: 'Schedule',
      //   breakpoint: 'sm',
      //   path: '',
      //   type: 'date',
      //   selected: true,
      // },
    ],
    bottomSheet: [
      {
        label: 'Join Video Conference',
        action: 'join',
      },
    ],
  },
  {
    label: 'Finished',
    selected: false,
    populate: [
      {
        field: '_notaryId',
        select: 'firstName,lastName,middleName',
      },
    ],

    column: [
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
      {
        title: 'Notary',
        breakpoint: 'sm',
        path: '_notaryId',
        paths: ['_notaryId.firstName', '_notaryId.lastName'],
        type: 'special',
        selected: true,
      },
      // PAGAWA :)
      // {
      //   title: 'Queue No.',
      //   breakpoint: 'sm',
      //   path: '',
      //   type: 'text',
      //   selected: true,
      // },
      {
        title: 'Scheduled By',
        breakpoint: 'sm',
        path: '_transactionId._scheduledBy',
        paths: [
          '_transactionId._folderId._scheduledBy.firstName',
          '_transactionId._folderId._scheduledBy.lastName',
        ],
        type: 'special',
        selected: true,
      },
      // PAGAWA :)
      // {
      //   title: 'Schedule',
      //   breakpoint: 'sm',
      //   path: '',
      //   type: 'date',
      //   selected: true,
      // },
      {
        title: 'Status',
        breakpoint: 'sm',
        path: 'documentStatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'Notarized',
            color: '#83b9a1' || 'green',
          },
          {
            value: 'Unnotarized',
            color: '#83b9a1' || 'green',
          },
        ],
      },
    ],
    bottomSheet: [
      {
        label: 'View Screenshot',
        action: 'view',
      },
    ],
  },
];

export const PENDING_FIND: Find[] = [
  {
    field: 'documentStatus',
    operator: '[in]=',
    value: 'Pending for Notary,Skipped',
  },
  {
    field: 'locationStatus',
    operator: '[in]=',
    value: 'Video Conference Scheduled (Notary)',
  },
];
export const FINISHED_FIND: Find[] = [
  {
    field: 'documentStatus',
    operator: '[in]=',
    value: 'Notarized,Unnotarized',
  },
  {
    field: 'locationStatus',
    operator: '[nin]=',
    value: 'Enroute to Barangay',
  },
  {
    field: 'notarizedDocument',
    operator: '[ne]=',
    value: 'null',
  },
];
