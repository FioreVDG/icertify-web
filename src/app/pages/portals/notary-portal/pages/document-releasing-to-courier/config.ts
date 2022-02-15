import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const NOTARY_DOC_RELEASING_TO_COURIER_CONFIG: Array<FILTER_BUTTON_COLUMN> =
  [
    {
      label: 'For Pickup',
      selected: true,
      isCheckbox: true,
      populate: [
        {
          field: '_notaryId',
          select: 'firstName,lastName,middleName',
        },
      ],

      column: [
        {
          title: 'Batch Reference Code',
          breakpoint: 'sm',
          path: 'folderName',
          type: 'text',
          selected: true,
        },
        {
          title: 'Barangay',
          breakpoint: 'sm',
          path: 'barangay',
          type: 'text',
          selected: true,
        },
        {
          title: 'Notary',
          breakpoint: 'sm',
          path: '_notaryId',
          paths: ['_notaryId.lastName', '_notaryId.firstName'],
          type: 'special',
          selected: true,
        },
        {
          title: 'Date and Time Completed',
          breakpoint: 'sm',
          path: 'dateCompleted',
          type: 'date',
          selected: true,
        },
        {
          title: 'Transaction Count',
          breakpoint: 'sm',
          path: 'transactionCount',
          type: 'text',
          selected: true,
          isVirtual: true,
        },
        {
          title: 'Status',
          breakpoint: 'sm',
          path: 'folderStatus',
          type: 'text',
          selected: true,
          textColor: [
            {
              value: 'Done',
              color: '#83b9a1' || 'green',
            },
            {
              value: 'Incomplete',
              color: '#6d6d6d',
            },
          ],
        },
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
      populate: [
        {
          field: '_notaryId',
          select: 'firstName,lastName,middleName',
        },
        {
          field: '_enroutedByNotary',
          select: 'firstName,lastName,middleName',
        },
      ],

      column: [
        {
          title: 'Batch Reference Code',
          breakpoint: 'sm',
          path: 'folderName',
          type: 'text',
          selected: true,
        },
        {
          title: 'Barangay',
          breakpoint: 'sm',
          path: 'barangay',
          type: 'text',
          selected: true,
        },
        {
          title: 'Notary',
          breakpoint: 'sm',
          path: '_notaryId',
          paths: ['_notaryId.lastName', '_notaryId.firstName'],
          type: 'special',
          selected: true,
        },
        {
          title: 'Marked as Enroute by',
          breakpoint: 'sm',
          path: '_enroutedByNotary',
          paths: ['_enroutedByNotary.lastName', '_enroutedByNotary.firstName'],
          type: 'special',
          selected: true,
        },
        {
          title: 'Date and Time Picked Up',
          breakpoint: 'sm',
          path: 'datePickedByRiderFromNotary',
          type: 'date',
          selected: true,
        },
        {
          title: 'Transaction Count',
          breakpoint: 'sm',
          path: 'transactionCount',
          isVirtual: true,
          type: 'text',
          selected: true,
        },
      ],
    },
    {
      label: 'Delivered',
      selected: false,
      populate: [
        {
          field: '_notaryId',
          select: 'firstName,lastName,middleName',
        },
        {
          field: '_receivedByBrgy',
          select: 'firstName,lastName,middleName',
        },
      ],

      column: [
        {
          title: 'Batch Reference Code',
          breakpoint: 'sm',
          path: 'folderName',
          type: 'text',
          selected: true,
        },
        {
          title: 'Barangay',
          breakpoint: 'sm',
          path: 'barangay',
          type: 'text',
          selected: true,
        },
        {
          title: 'Notary',
          breakpoint: 'sm',
          path: '_notaryId',
          paths: ['_notaryId.lastName', '_notaryId.firstName'],
          type: 'special',
          selected: true,
        },
        {
          title: 'Received By',
          breakpoint: 'sm',
          path: '_receivedByBrgy',
          paths: ['_receivedByBrgy.lastName', '_receivedByBrgy.firstName'],
          type: 'special',
          selected: true,
        },
        {
          title: 'Date and Time Delivered',
          breakpoint: 'sm',
          path: 'dateReceivedByBrgy',
          type: 'date',
          selected: true,
        },
        {
          title: 'Transaction Count',
          breakpoint: 'sm',
          isVirtual: true,
          path: 'transactionCount',
          type: 'text',
          selected: true,
        },
      ],
    },
  ];

export const DOC_RELEASING_DISABLE_CHECKBOX = {
  column: 'folderStatus',
  value: 'Incomplete',
};

export const FOR_PICKUP_FIND: Find[] = [
  {
    field: 'folderStatus',
    operator: '[in]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Notary',
  },
];
export const ENROUTE_FIND: Find[] = [
  {
    field: 'folderStatus',
    operator: '[in]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Road',
  },
];
export const DELIVERED_FIND: Find[] = [
  {
    field: 'folderStatus',
    operator: '[in]=',
    value: 'Done,Incomplete',
  },
  {
    field: 'location',
    operator: '=',
    value: 'Barangay',
  },
];
