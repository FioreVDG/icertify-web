import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Releasing',
    selected: true,
    isCheckbox: true,
    bottomSheet: [
      { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
      {
        label: 'View Personal Information/Proof of Identity',
        action: 'viewInfo',
        icon: 'assignment_ind',
      },
      { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
    ],
    populate: [{ field: '_documents' }],
    column: [
      {
        title: 'Transaction Reference Code',
        breakpoint: 'sm',
        path: 'refCode',
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
        title: 'Received By',
        breakpoint: 'sm',
        path: '_createdBy',
        paths: ['_createdBy.firstName', '_createdBy.lastName'],
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
      {
        title: 'No. Of Documents',
        breakpoint: 'sm',
        path: 'documentCount',
        type: 'text', // make count type
        selected: true,
        isVirtual: true,
      },
      {
        title: 'Status',
        breakpoint: 'sm',
        path: 'locationStatus',
        type: 'text',
        selected: true,
        // textColor: [
        //   {
        //     value: 'For Pick Up (Barangay)',
        //     color: '#e58086' || 'red',
        //   },
        //   {
        //     value: 'Enroute to Notary',
        //     color: '#e58086' || 'red',
        //   },
        //   {
        //     value: 'Received by Notary',
        //     color: '#e58086' || 'red',
        //   },
        // ],
      },
    ],
  },
  {
    label: 'Released',
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
    populate: [{ field: '_documents' }],
    column: [
      {
        title: 'Transaction Reference Code',
        breakpoint: 'sm',
        path: 'refCode',
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
        title: 'Received By',
        breakpoint: 'sm',
        path: '_createdBy',
        paths: ['_createdBy.firstName', '_createdBy.lastName'],
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
      {
        title: 'No. Of Documents',
        breakpoint: 'sm',
        path: 'documentCount',
        type: 'text', // make count type
        selected: true,
        isVirtual: true,
      },
      {
        title: 'Status',
        breakpoint: 'sm',
        path: 'locationStatus',
        type: 'text',
        selected: true,
        // textColor: [
        //   {
        //     value: 'For Pick Up (Barangay)',
        //     color: '#e58086' || 'red',
        //   },
        //   {
        //     value: 'Enroute to Notary',
        //     color: '#e58086' || 'red',
        //   },
        //   {
        //     value: 'Received by Notary',
        //     color: '#e58086' || 'red',
        //   },
        // ],
      },
    ],
  },
];
export const FIND_FOR_RELEASING: Find[] = [
  {
    field: 'status',
    operator: '=',
    value: 'Active',
  },
  {
    field: 'folderStatus',
    operator: '[in]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'transactionStatus',
    operator: '=',
    value: 'Done',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Barangay',
  },
  {
    field: 'dateReleased',
    operator: '[in]=',
    value: 'null',
  },
];
export const FIND_RELEASED: Find[] = [
  {
    field: 'status',
    operator: '=',
    value: 'Active',
  },
  {
    field: 'folderStatus',
    operator: '[in]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'transactionStatus',
    operator: '=',
    value: 'Done',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Barangay',
  },
  {
    field: 'dateReleased',
    operator: '[nin]=',
    value: 'null',
  },
];

export const NOTARIZED_DOCUMENT_RELEASING_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
  {
    label: 'View Personal Information/Proof of Identity',
    action: 'viewInfo',
    icon: 'assignment_ind',
  },
  { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
];
