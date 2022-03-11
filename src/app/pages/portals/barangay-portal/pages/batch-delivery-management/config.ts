import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';
import { TABLE_BUTTON_CONFIG } from 'src/app/models/table-button.interface';

export const FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'For Pick Up',
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

    sort: {
      active: 'updatedAt',
      direction: 'asc',
    },

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
        title: 'Received By',
        breakpoint: 'sm',
        path: '_transactionId._createdBy',
        paths: [
          '_transactionId._createdBy.firstName',
          '_transactionId._createdBy.lastName',
        ],
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
      // {
      //   title: 'No. of Documents',
      //   breakpoint: 'sm',
      //   path: 'documentCount',
      //   isVirtual: true,
      //   type: 'text',
      //   selected: true,
      // },
    ],
    checkBoxBtns: [
      {
        label: 'Mark as Enroute',
        action: 'enroute',
      },
    ],
  },
  {
    label: 'Enroute',
    selected: false,
    isCheckbox: false,
    bottomSheet: [
      {
        label: 'View Transaction/s',
        action: 'viewTransac',
        icon: 'description',
      },
    ],
    populate: [
      {
        field: '_batchedBy',
        select: 'firstName,lastName,middleName',
      },
    ],
    sort: {
      active: 'folderName',
      direction: 'desc',
    },
    column: [
      {
        title: 'Batch Reference Code',
        breakpoint: 'sm',
        path: 'folderName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Batched by',
        breakpoint: 'sm',
        path: '_batchedBy',
        paths: ['_batchedBy.firstName', '_batchedBy.lastName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Pick up by',
        breakpoint: 'sm',
        path: '_riderFromBarangay',
        paths: ['_riderFromBarangay.firstName', '_riderFromBarangay.lastName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'Date and Time Picked up',
        breakpoint: 'sm',
        path: 'datePickedByRiderFromBrgy',
        type: 'date',
        selected: true,
      },
      {
        title: 'Transaction Count',
        breakpoint: 'sm',
        path: 'transactionCount',
        type: 'text',
        selected: true,
      },
    ],
  },
];
export const ENROUTE_FIND_BATCH: Find[] = [
  {
    field: 'folderStatus',
    operator: '[nin]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Road',
  },
];
export const FOR_PICKUP: Find[] = [
  {
    field: 'locationStatus',
    operator: '=',
    value: 'For Pick Up (Barangay)',
  },
];

export const BATCH_DELIVERY_BOTTOMSHEET: BottomSheetItem[] = [
  { label: 'View Document/s', action: 'viewDoc', icon: 'description' },
  {
    label: 'View Personal Information/Proof of Identity',
    action: 'viewInfo',
    icon: 'assignment_ind',
  },
  { label: 'View Video Of Signing', action: 'viewVid', icon: 'duo' },
];
