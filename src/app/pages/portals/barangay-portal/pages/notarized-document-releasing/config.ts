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
        title: 'Received By',
        breakpoint: 'sm',
        path: '_transactionId._folderId._receivedByBrgy',
        paths: [
          '_transactionId._folderId._receivedByBrgy.firstName',
          '_transactionId._folderId._receivedByBrgy.lastName',
        ],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Received',
        breakpoint: 'sm',
        path: '_transactionId._folderId.dateReceivedByBrgy',
        type: 'date',
        selected: true,
      },
      {
        title: 'Batch Reference Code',
        breakpoint: 'sm',
        path: '_transactionId._folderId.folderName',
        type: 'text', // make count type
        selected: true,
      },
    ],
    checkBoxBtns: [
      {
        label: 'Mark as Released',
        action: 'release',
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
        title: 'Released By',
        breakpoint: 'sm',
        path: '_transactionId._releasedBy',
        paths: [
          '_transactionId._releasedBy.firstName',
          '_transactionId._releasedBy.lastName',
        ],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Released',
        breakpoint: 'sm',
        path: '_transactionId.dateReleased',
        type: 'date',
        selected: true,
      },
      {
        title: 'Batch Reference Code',
        breakpoint: 'sm',
        path: '_transactionId._folderId.folderName',
        type: 'text', // make count type
        selected: true,
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
    field: 'documentStatus',
    operator: '[in]=',
    value: 'Notarized,Unnotarized',
  },
  {
    field: 'locationStatus',
    operator: '=',
    value: 'Received by Barangay',
  },
  {
    field: 'locationStatus',
    operator: '=',
    value: 'For Pick Up (Notary)',
  },
];
export const FIND_RELEASED: Find[] = [
  {
    field: 'status',
    operator: '=',
    value: 'Active',
  },
  {
    field: 'documentStatus',
    operator: '[in]=',
    value: 'Notarized,Unnotarized',
  },
  {
    field: 'locationStatus',
    operator: '=',
    value: 'Released to Indigent',
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
