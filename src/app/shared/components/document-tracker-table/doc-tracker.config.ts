import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const DOCUMENT_TRACKER_CONFIG: Array<any> = [
  {
    label: 'All',
    selected: true,
    isCheckbox: false,
    bottomSheet: [
      {
        label: 'View',
        action: 'viewDoc',
        icon: 'visibility',
      },
    ],
    populates: [{ field: '_notaryId', select: '-__v' }],
    column: [
      {
        title: 'Document Ref Code',
        breakpoint: 'sm',
        path: 'refCode',
        type: 'text',
        selected: true,
      },
      {
        title: 'Batch Ref Code',
        breakpoint: 'sm',
        path: '_transactionId._folderId.folderName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Name',
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
        title: 'Notary',
        breakpoint: 'sm',
        path: '_notaryId',
        paths: ['_notaryId.firstName', '_notaryId.lastName'],
        type: 'special',
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
        title: 'Location Status',
        breakpoint: 'sm',
        path: 'locationStatus',
        type: 'text',
        selected: true,
        useAsFilter: true,
        choices: [
          'For Pick Up (Barangay)',
          'For Pick Up (Notary)',
          'Enroute to Notary',
          'Enroute to Barangay',
          'Received by Notary',
          'Received by Barangay',
          'Video Conference Scheduled (Notary)',
          'Released to Indigent',
        ],
      },
      {
        title: 'Notarization Status',
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
          {
            value: 'Pending for Notary',
            color: '#fbcb51' || 'yellow',
          },
        ],
        useAsFilter: true,
        choices: ['Notarized', 'Unnotarized', 'Pending for Notary', 'Skipped'],
      },
      {
        title: 'Remark',
        breakpoint: 'sm',
        path: 'remark',
        type: 'text',
        selected: true,
      },
    ],
  },
  {
    label: 'Ongoing',
    selected: true,
    isCheckbox: false,
    bottomSheet: [
      {
        label: 'View',
        action: 'viewDoc',
        icon: 'visibility',
      },
    ],
    populates: [{ field: '_notaryId', select: '-__v' }],
    column: [
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
        title: 'Document Ref Code',
        breakpoint: 'sm',
        path: 'refCode',
        type: 'text',
        selected: true,
      },
      {
        title: 'Batch Ref Code',
        breakpoint: 'sm',
        path: '_transactionId._folderId.folderName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Name',
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
        title: 'Notary',
        breakpoint: 'sm',
        path: '_notaryId',
        paths: ['_notaryId.firstName', '_notaryId.lastName'],
        type: 'special',
        selected: true,
      },

      {
        title: 'Location Status',
        breakpoint: 'sm',
        path: 'locationStatus',
        type: 'text',
        selected: true,
        useAsFilter: true,
        choices: [
          'For Pick Up (Barangay)',
          'For Pick Up (Notary)',
          'Enroute to Notary',
          'Enroute to Barangay',
          'Received by Notary',
          'Received by Barangay',
          'Video Conference Scheduled (Notary)',
          'Released to Indigent',
        ],
      },
      {
        title: 'Notarization Status',
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
          {
            value: 'Pending for Notary',
            color: '#fbcb51' || 'yellow',
          },
        ],
        useAsFilter: true,
        choices: ['Notarized', 'Unnotarized', 'Pending for Notary', 'Skipped'],
      },
      {
        title: 'Remark',
        breakpoint: 'sm',
        path: 'remark',
        type: 'text',
        selected: true,
      },
    ],
  },
  {
    label: 'Finished',
    selected: true,
    isCheckbox: false,
    bottomSheet: [
      {
        label: 'View',
        action: 'viewDoc',
        icon: 'visibility',
      },
    ],
    populates: [{ field: '_notaryId', select: '-__v' }],
    column: [
      {
        title: 'Document Ref Code',
        breakpoint: 'sm',
        path: 'refCode',
        type: 'text',
        selected: true,
      },
      {
        title: 'Batch Ref Code',
        breakpoint: 'sm',
        path: '_transactionId._folderId.folderName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Name',
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
        title: 'Notary',
        breakpoint: 'sm',
        path: '_notaryId',
        paths: ['_notaryId.firstName', '_notaryId.lastName'],
        type: 'special',
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
        title: 'Notarization Status',
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
          {
            value: 'Pending for Notary',
            color: '#fbcb51' || 'yellow',
          },
        ],
        useAsFilter: true,
        choices: ['Notarized', 'Unnotarized', 'Skipped'],
      },
      {
        title: 'Remark',
        breakpoint: 'sm',
        path: 'remark',
        type: 'text',
        selected: true,
      },
      {
        title: 'Date and Time Released',
        breakpoint: 'sm',
        path: 'dateReleased',
        type: 'date',
        selected: true,
      },
    ],
  },
];

export const TRACKER_BOTTOMSHEET: BottomSheetItem[] = [
  {
    label: 'View',
    action: 'viewDoc',
    icon: 'visibility',
  },
];

//FOR BARANGAY
export const FIND_ALL: Find[] = [
  {
    field: '',
    operator: '',
    value: '',
  },
];

export const FIND_FINISHED: Find[] = [
  {
    field: 'locationStatus',
    operator: '=',
    value: 'Released to Indigent',
  },
];

export const FIND_ONGOING: Find[] = [
  {
    field: 'locationStatus',
    operator: '[ne]=',
    value: 'Released to Indigent',
  },
];

//FOR NOTARY
export const NOTARY_FIND_ALL: Find[] = [
  {
    field: 'locationStatus',
    operator: '[in]=',
    value:
      'Video Conference Scheduled (Notary),Received by Notary,Enroute to Barangay,Received by Barangay,Released to Indigent,For Pick Up (Notary)',
  },
];
export const NOTARY_FIND_ONGOING: Find[] = [
  {
    field: 'locationStatus',
    operator: '[ne]=',
    value: 'Released to Indigent',
  },
  {
    field: 'locationStatus',
    operator: '[in]=',
    value:
      'Video Conference Scheduled (Notary),Received by Notary,Enroute to Barangay,Received by Barangay,For Pick Up (Notary)',
  },
];
export const NOTARY_FIND_FINISHED: Find[] = [
  {
    field: 'locationStatus',
    operator: '[in]=',
    value: 'Released to Indigent',
  },
];
