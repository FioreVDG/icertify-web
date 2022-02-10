import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const DOCUMENT_TRACKER_CONFIG: Array<any> = [
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
    populate: [
      {
        field: '_transactionId',
      },
    ],
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
        path: '_transactionId.refCode',
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
        path: 'documentStatus',
        type: 'text',
        selected: true,
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
    populate: [
      {
        field: '_transactionId',
      },
    ],
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
        path: '_transactionId.refCode',
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
        path: 'documentStatus',
        type: 'text',
        selected: true,
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
];

export const TRACKER_BOTTOMSHEET: BottomSheetItem[] = [
  {
    label: 'View',
    action: 'viewDoc',
    icon: 'visibility',
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
