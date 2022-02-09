import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'All',
    selected: true,
    bottomSheet: [
      { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
    ],
    populate: [],
    column: [
      {
        title: 'Document Reference Code',
        breakpoint: 'sm',
        path: 'refCode',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Name/Subject',
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
        title: 'Owner',
        breakpoint: 'sm',
        path: 'sender',
        paths: ['sender.firstName', 'sender.lastName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Received',
        breakpoint: 'sm',
        path: 'createdAt',
        type: 'date',
        selected: true,
      },
    ],
  },
  {
    label: 'Notarized',
    selected: true,
    isCheckbox: true,
    bottomSheet: [
      { label: 'View Document', action: 'viewDoc', icon: 'description' },
      {
        label: 'Download Document',
        action: 'downloadDoc',
        icon: 'file_download',
      },
    ],
    populate: [],
    column: [
      {
        title: 'Document Reference Code',
        breakpoint: 'sm',
        path: 'refCode',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Name/Subject',
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
        title: 'Owner',
        breakpoint: 'sm',
        path: 'sender',
        paths: ['sender.firstName', 'sender.lastName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Received',
        breakpoint: 'sm',
        path: 'createdAt',
        type: 'date',
        selected: true,
      },
    ],
  },
  {
    label: 'Unnotarized',
    selected: false,
    isCheckbox: false,
    bottomSheet: [
      { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
    ],
    populate: [],
    column: [
      {
        title: 'Document Reference Code',
        breakpoint: 'sm',
        path: 'refCode',
        type: 'text',
        selected: true,
      },
      {
        title: 'Document Name/Subject',
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
        title: 'Owner',
        breakpoint: 'sm',
        path: 'sender',
        paths: ['sender.firstName', 'sender.lastName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Received',
        breakpoint: 'sm',
        path: 'createdAt',
        type: 'date',
        selected: true,
      },
    ],
  },
];
export const FIND_NOTARIZED: Find[] = [
  {
    field: 'status',
    operator: '=',
    value: 'Active',
  },
  {
    field: 'documentStatus',
    operator: '=',
    value: 'Notarized',
  },
];
export const FIND_UNNOTARIZED: Find[] = [
  {
    field: 'status',
    operator: '=',
    value: 'Active',
  },
  {
    field: 'documentStatus',
    operator: '=',
    value: 'Unnotarized',
  },
];

export const UPLOADING_NOTARIZED_DOCUMENT_BOTTOMSHEET: BottomSheetItem[] = [];
