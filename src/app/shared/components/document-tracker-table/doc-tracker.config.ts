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
    populates: [
      {
        field: '_documents',
      },
    ],
    column: [
      {
        title: 'Document Ref Code',
        breakpoint: 'sm',
        path: 'newDocument.refCode',
        type: 'text',
        selected: true,
      },
      {
        title: 'Batch Ref Code',
        breakpoint: 'sm',
        path: '_folderId.folderName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Name',
        breakpoint: 'sm',
        path: 'newDocument.documentName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Type',
        breakpoint: 'sm',
        path: 'newDocument.documentType',
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
        title: 'Location Status',
        breakpoint: 'sm',
        path: 'locationStatus',
        type: 'text',
        selected: true,
      },
      {
        title: 'Notarization Status',
        breakpoint: 'sm',
        path: 'newDocument.documentStatus',
        type: 'text',
        selected: true,
      },
      {
        title: 'Remark',
        breakpoint: 'sm',
        path: 'newDocument.remark',
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
    populates: [
      {
        field: '_documents',
      },
    ],
    column: [
      {
        title: 'Document Ref Code',
        breakpoint: 'sm',
        path: 'newDocument.refCode',
        type: 'text',
        selected: true,
      },
      {
        title: 'Batch Ref Code',
        breakpoint: 'sm',
        path: '_folderId.folderName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Name',
        breakpoint: 'sm',
        path: 'newDocument.documentName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Type',
        breakpoint: 'sm',
        path: 'newDocument.documentType',
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
        title: 'Notary',
        breakpoint: 'sm',
        path: '_folderId',
        paths: [
          '_folderId._notaryId.firstName',
          '_folderId._notaryId.lastName',
        ],
        type: 'special',
        selected: true,
      },
      {
        title: 'Location Status',
        breakpoint: 'sm',
        path: 'locationStatus',
        type: 'text',
        selected: true,
      },
      {
        title: 'Notarization Status',
        breakpoint: 'sm',
        path: 'newDocument.documentStatus',
        type: 'text',
        selected: true,
      },
      {
        title: 'Remark',
        breakpoint: 'sm',
        path: 'newDocument.remark',
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
    populates: [
      {
        field: '_documents',
      },
    ],
    column: [
      {
        title: 'Document Ref Code',
        breakpoint: 'sm',
        path: 'newDocument.refCode',
        type: 'text',
        selected: true,
      },
      {
        title: 'Batch Ref Code',
        breakpoint: 'sm',
        path: '_folderId.folderName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Name',
        breakpoint: 'sm',
        path: 'newDocument.documentName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Type',
        breakpoint: 'sm',
        path: 'newDocument.documentType',
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
        title: 'Notarization Status',
        breakpoint: 'sm',
        path: 'newDocument.documentStatus',
        type: 'text',
        selected: true,
      },
      {
        title: 'Remark',
        breakpoint: 'sm',
        path: 'newDocument.remark',
        type: 'text',
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
      'Video Conference Scheduled (Notary),Received by Notary,Enroute to Barangay,Released to Indigent',
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
      'Video Conference Scheduled (Notary),Received by Notary,Enroute to Barangay',
  },
];
export const NOTARY_FIND_FINISHED: Find[] = [
  {
    field: 'locationStatus',
    operator: '[in]=',
    value: 'Released to Indigent',
  },
  {
    field: 'locationStatus',
    operator: '[in]=',
    value:
      'Video Conference Scheduled (Notary),Received by Notary,Enroute to Barangay,Released to Indigent',
  },
];
