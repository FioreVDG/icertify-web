import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Uploading',
    selected: true,
    isCheckbox: true,
    bottomSheet: [],
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
    label: 'Uploaded',
    selected: false,
    isCheckbox: false,
    bottomSheet: [
      { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
      {
        label: 'View Personal Information/Proof of Identity',
        action: 'viewInfo',
        icon: 'assignment_ind',
      },
      { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
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
export const FIND_FOR_UPLOADING: Find[] = [
  {
    field: 'status',
    operator: '=',
    value: 'Active',
  },
];
export const FIND_UPLOADED: Find[] = [
  {
    field: 'status',
    operator: '=',
    value: 'Active',
  },
];

export const UPLOADING_NOTARIZED_DOCUMENT_BOTTOMSHEET: BottomSheetItem[] = [];
