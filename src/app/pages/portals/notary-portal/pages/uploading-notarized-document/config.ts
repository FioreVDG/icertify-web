import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Uploading',
    selected: true,
    bottomSheet: [],
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
        title: 'Barangay',
        breakpoint: 'sm',
        path: '_barangay.brgyDesc',
        type: 'text',
        selected: true,
        useAsFilter: true,
        choices: [],
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
        title: 'Date and Time Notarized',
        breakpoint: 'sm',
        path: 'dateNotarized',
        type: 'date',
        selected: true,
      },
      {
        title: 'Batch Reference Code',
        breakpoint: 'sm',
        path: '_transactionId._folderId.folderName',
        type: 'text',
        selected: true,
      },
    ],
  },
  {
    label: 'Uploaded',
    selected: false,
    isCheckbox: false,
    // bottomSheet: [],
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
        title: 'Barangay',
        breakpoint: 'sm',
        path: '_barangay.brgyDesc',
        type: 'text',
        selected: true,
        useAsFilter: true,
        choices: [],
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
        title: 'Date and Time Uploaded',
        breakpoint: 'sm',
        path: 'notarizedDocument.dateUploaded',
        type: 'date',
        selected: true,
      },
      {
        title: 'Batch Reference Code',
        breakpoint: 'sm',
        path: '_transactionId._folderId.folderName',
        type: 'text',
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
  {
    field: 'notarizedDocument.dateUploaded',
    operator: '[in]=',
    value: 'null',
  },
  {
    field: 'documentStatus',
    operator: '=',
    value: 'Notarized',
  },
  {
    field: 'dateNotarized',
    operator: '[ne]=',
    value: 'null',
  },
];
export const FIND_UPLOADED: Find[] = [
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
  {
    field: 'notarizedDocument',
    operator: '[ne]=',
    value: 'null',
  },
];

export const UPLOADING_NOTARIZED_DOCUMENT_BOTTOMSHEET: BottomSheetItem[] = [];
