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
        label: 'View Document/Notarized Document',
        action: 'viewDoc',
        icon: 'description',
      },
      {
        label: 'View Proof of Identity',
        action: 'viewPOI',
        icon: 'photo_library',
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
        title: 'Batch Reference Code',
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
        title: 'Certificate of Indigency',
        breakpoint: 'sm',
        path: 'sender.images.COIstatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'To Follow',
            color: '#fbcb51' || 'yellow',
          },
          {
            value: 'Uploaded',
            color: '#83b9a1' || 'green',
          },
        ],
        isVirtual: true,
      },
      // {
      //   title: 'Remarks',
      //   breakpoint: 'sm',
      //   path: 'remark',
      //   type: 'text',
      //   selected: true,
      // },
      {
        title: 'Notarization Status',
        breakpoint: 'sm',
        path: 'documentStatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'Pending for Notary',
            color: '#fbcb51' || 'yellow',
          },
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
  },
  {
    label: 'Notarized',
    selected: true,
    bottomSheet: [
      {
        label: 'View Document/Notarized Document',
        action: 'viewDoc',
        icon: 'description',
      },
      {
        label: 'View Proof of Identity',
        action: 'viewPOI',
        icon: 'photo_library',
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
        title: 'Batch Reference Code',
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
        title: 'Certificate of Indigency',
        breakpoint: 'sm',
        path: 'sender.images.COIstatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'To Follow',
            color: '#fbcb51' || 'yellow',
          },
          {
            value: 'Uploaded',
            color: '#83b9a1' || 'green',
          },
        ],
        isVirtual: true,
      },
      {
        title: 'Notarized Document Status',
        breakpoint: 'sm',
        path: 'notarizedDocumentStatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'For Uploading',
            color: '#fbcb51' || 'yellow',
          },
          {
            value: 'Uploaded',
            color: '#83b9a1' || 'green',
          },
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
            value: 'Pending for Notary',
            color: '#fbcb51' || 'yellow',
          },
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
  },
  {
    label: 'Unnotarized',
    selected: false,
    bottomSheet: [
      {
        label: 'View Document',
        action: 'viewDoc',
        icon: 'description',
      },
      {
        label: 'View Proof of Identity',
        action: 'viewPOI',
        icon: 'photo_library',
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
        title: 'Batch Reference Code',
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
        title: 'Certificate of Indigency',
        breakpoint: 'sm',
        path: 'sender.images.COIstatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'To Follow',
            color: '#fbcb51' || 'yellow',
          },
          {
            value: 'Uploaded',
            color: '#83b9a1' || 'green',
          },
        ],
        isVirtual: true,
      },
      {
        title: 'Remarks',
        breakpoint: 'sm',
        path: 'remark',
        type: 'text',
        selected: true,
      },
      {
        title: 'Notarization Status',
        breakpoint: 'sm',
        path: 'documentStatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'Pending for Notary',
            color: '#fbcb51' || 'yellow',
          },
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
  },
];

//for notary
export const NOTARY_FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'All',
    selected: true,
    bottomSheet: [
      {
        label: 'View Document/Notarized Document',
        action: 'viewDoc',
        icon: 'description',
      },
      {
        label: 'View Proof of Identity',
        action: 'viewPOI',
        icon: 'photo_library',
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
        title: 'Batch Reference Code',
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
        title: 'Certificate of Indigency',
        breakpoint: 'sm',
        path: 'sender.images.COIstatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'To Follow',
            color: '#fbcb51' || 'yellow',
          },
          {
            value: 'Uploaded',
            color: '#83b9a1' || 'green',
          },
        ],
        isVirtual: true,
      },
      // {
      //   title: 'Remarks',
      //   breakpoint: 'sm',
      //   path: 'remark',
      //   type: 'text',
      //   selected: true,
      // },
      {
        title: 'Notarization Status',
        breakpoint: 'sm',
        path: 'documentStatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'Pending for Notary',
            color: '#fbcb51' || 'yellow',
          },
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
  },
  {
    label: 'Notarized',
    selected: true,
    isCheckbox: true,
    bottomSheet: [
      {
        label: 'View Document/Notarized Document',
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
        label: 'View Proof of Identity',
        action: 'viewPOI',
        icon: 'photo_library',
      },
      {
        label: 'Download Screenshot',
        action: 'downloadSS',
        icon: 'file_download',
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
        title: 'Batch Reference Code',
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
        title: 'Certificate of Indigency',
        breakpoint: 'sm',
        path: 'sender.images.COIstatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'To Follow',
            color: '#fbcb51' || 'yellow',
          },
          {
            value: 'Uploaded',
            color: '#83b9a1' || 'green',
          },
        ],
        isVirtual: true,
      },
      {
        title: 'Notarized Document Status',
        breakpoint: 'sm',
        path: 'notarizedDocumentStatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'For Uploading',
            color: '#fbcb51' || 'yellow',
          },
          {
            value: 'Uploaded',
            color: '#83b9a1' || 'green',
          },
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
            value: 'Pending for Notary',
            color: '#fbcb51' || 'yellow',
          },
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
        label: 'View Document',
        action: 'viewDoc',
        icon: 'description',
      },
      {
        label: 'View Proof of Identity',
        action: 'viewPOI',
        icon: 'photo_library',
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
        title: 'Batch Reference Code',
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
        title: 'Certificate of Indigency',
        breakpoint: 'sm',
        path: 'sender.images.COIstatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'To Follow',
            color: '#fbcb51' || 'yellow',
          },
          {
            value: 'Uploaded',
            color: '#83b9a1' || 'green',
          },
        ],
        isVirtual: true,
      },
      {
        title: 'Remarks',
        breakpoint: 'sm',
        path: 'remark',
        type: 'text',
        selected: true,
      },
      {
        title: 'Notarization Status',
        breakpoint: 'sm',
        path: 'documentStatus',
        type: 'text',
        selected: true,
        textColor: [
          {
            value: 'Pending for Notary',
            color: '#fbcb51' || 'yellow',
          },
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
