import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const REGISTRANT_FILT_BTN_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'W/O Certificate of Indigency',
    selected: true,
    isCheckbox: false,
    bottomSheet: [
      {
        label: 'Edit Registrant Details',
        action: 'editRegistrant',
        icon: 'edit',
        showIf: 'pendingTransactions/</1',
      },
      {
        label: 'View',
        action: 'viewRegistrant',
        icon: 'visibility',
      },
      {
        label: 'Delete',
        action: 'deleteRegistrant',
        icon: 'delete',
        showIf: 'pendingTransactions/</1',
      },
    ],
    populate: [],
    column: [
      {
        title: 'First name',
        breakpoint: 'sm',
        path: 'firstName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Last name',
        breakpoint: 'sm',
        path: 'lastName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Middle name',
        breakpoint: 'sm',
        path: 'middleName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Pending Transaction',
        breakpoint: 'sm',
        path: 'pendingTransactions',
        type: 'text',
        selected: true,
        isVirtual: true,
      },
      {
        title: 'Address',
        breakpoint: 'sm',
        path: 'address',
        paths: [
          'address.address1',
          'address.address2',
          'address.barangay.brgyDesc',
          'address.cityMun.citymunDesc',
          'address.province.provDesc',
        ],
        type: 'special',
        selected: true,
      },
      {
        title: 'Mobile Number',
        breakpoint: 'sm',
        path: 'mobileNumber',
        type: 'text',
        selected: true,
      },

      {
        title: 'Date & Time Updated',
        breakpoint: 'sm',
        path: 'updatedAt',
        type: 'date',
        selected: true,
      },
    ],
  },
  {
    label: 'Complete',
    selected: true,
    isCheckbox: false,
    bottomSheet: [
      {
        label: 'Edit Registrant Details',
        action: 'editRegistrant',
        icon: 'edit',
        showIf: 'pendingTransactions/</1',
      },
      {
        label: 'View',
        action: 'viewRegistrant',
        icon: 'visibility',
      },
      {
        label: 'Delete',
        action: 'deleteRegistrant',
        icon: 'delete',
        showIf: 'pendingTransactions/</1',
      },
    ],
    populate: [],
    column: [
      {
        title: 'First name',
        breakpoint: 'sm',
        path: 'firstName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Last name',
        breakpoint: 'sm',
        path: 'lastName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Middle name',
        breakpoint: 'sm',
        path: 'middleName',
        type: 'text',
        selected: true,
      },
      {
        title: 'Pending Transaction',
        breakpoint: 'sm',
        path: 'pendingTransactions',
        type: 'text',
        selected: true,
        isVirtual: true,
      },
      {
        title: 'Address',
        breakpoint: 'sm',
        path: 'address',
        paths: [
          'address.address1',
          'address.address2',
          'address.barangay.brgyDesc',
          'address.cityMun.citymunDesc',
          'address.province.provDesc',
        ],
        type: 'special',
        selected: true,
      },
      {
        title: 'Mobile Number',
        breakpoint: 'sm',
        path: 'mobileNumber',
        type: 'text',
        selected: true,
      },

      {
        title: 'Date & Time Updated',
        breakpoint: 'sm',
        path: 'updatedAt',
        type: 'date',
        selected: true,
      },
    ],
  },
];

export const FIND_WITHOUT_CERTIFICATE: Find[] = [
  {
    field: 'images.cert_of_indigency',
    operator: '=',
    value: 'Empty',
  },
];

export const FIND_COMPLETE: Find[] = [
  {
    field: 'images.cert_of_indigency',
    operator: '[ne]=',
    value: 'Empty',
  },
];

export const REGISTRANT_BOTTOMSHEET: BottomSheetItem[] = [
  {
    label: 'Edit Registrant Details',
    action: 'editRegistrant',
    icon: 'edit',
  },
  {
    label: 'Delete',
    action: 'deleteRegistrant',
    icon: 'delete',
  },
];
