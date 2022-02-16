import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

//for barangay
export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'All',
    selected: true,
    bottomSheet: [
      {
        label: 'View Document/s & Screenshot/s',
        action: 'viewDoc',
        icon: 'description',
      },
    ],
    populate: [
      {
        field: '_notaryId',
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
      {
        title: 'Date and Time of Notarization',
        breakpoint: 'sm',
        path: 'dateNotarized',
        type: 'date',
        selected: true,
      },
    ],
  },
  {
    label: 'Notarized',
    selected: true,
    bottomSheet: [
      {
        label: 'View Document/s & Screenshot/s',
        action: 'viewDoc',
        icon: 'description',
      },
    ],
    populate: [
      {
        field: '_notaryId',
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
      {
        title: 'Date and Time of Notarization',
        breakpoint: 'sm',
        path: 'dateNotarized',
        type: 'date',
        selected: true,
      },
    ],
  },
  {
    label: 'Unnotarized',
    selected: false,
    bottomSheet: [
      {
        label: 'View Document/s & Screenshot/s',
        action: 'viewDoc',
        icon: 'description',
      },
    ],
    populate: [
      {
        field: '_notaryId',
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
      {
        title: 'Date and Time of Notarization',
        breakpoint: 'sm',
        path: 'dateNotarized',
        type: 'date',
        selected: true,
      },
      {
        title: 'Remarks',
        breakpoint: 'sm',
        path: 'remark',
        type: 'text',
        selected: true,
      },
    ],
  },
];

//for notary
export const NOTARY_FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'All',
    selected: true,
    bottomSheet: [
      {
        label: 'View Document/s & Screenshot/s',
        action: 'viewDoc',
        icon: 'description',
      },
      {
        label: 'Download Screenshot',
        action: 'downloadSS',
        icon: 'file_download',
        showIf: 'screenShots/>/0',
      },
    ],
    populate: [
      {
        field: '_notaryId',
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
      {
        title: 'Date and Time of Notarization',
        breakpoint: 'sm',
        path: 'dateNotarized',
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
      {
        label: 'View Document/s & Screenshot/s',
        action: 'viewDoc',
        icon: 'description',
      },
      {
        label: 'View Screenshot/s',
        action: 'viewSS',
        icon: 'photo_library',
        showIf: 'screenShots/>/0',
      },
      {
        label: 'Download Document',
        action: 'downloadDoc',
        icon: 'file_download',
        showIf: 'notarizedDocument/!=/undefined',
      },
    ],
    populate: [
      {
        field: '_notaryId',
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
      {
        title: 'Date and Time of Notarization',
        breakpoint: 'sm',
        path: 'dateNotarized',
        type: 'date',
        selected: true,
      },
    ],
    checkBoxBtns: [
      {
        label: 'Download Notarized Document',
        action: 'downloadDocuments',
      },
      {
        label: 'Download Screen Shot',
        action: 'downloadScreenshots',
      },
    ],
  },
  {
    label: 'Unnotarized',
    selected: false,
    isCheckbox: false,
    bottomSheet: [
      {
        label: 'View Document/s & Screenshot/s',
        action: 'viewDoc',
        icon: 'description',
      },
    ],
    populate: [
      {
        field: '_notaryId',
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
      {
        title: 'Date and Time of Notarization',
        breakpoint: 'sm',
        path: 'dateNotarized',
        type: 'date',
        selected: true,
      },
      {
        title: 'Remarks',
        breakpoint: 'sm',
        path: 'remark',
        type: 'text',
        selected: true,
      },
    ],
  },
];

export const FIND_ALL: Find[] = [
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
];

//for barangay
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
  // {
  //   field: 'notarizedDocument.dateUploaded',
  //   operator: '[nin]=',
  //   value: 'null',
  // },
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

//for notary
export const NOTARY_FIND_NOTARIZED: Find[] = [
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
  // {
  //   field: 'notarizedDocument.dateUploaded',
  //   operator: '[nin]=',
  //   value: 'null',
  // },
];
export const NOTARY_FIND_UNNOTARIZED: Find[] = [
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

///////////////////////////////////////////
export const CHECKBOX_DISABLER = {
  column: 'notarizedDocument',
  value: 'undefined',
};
