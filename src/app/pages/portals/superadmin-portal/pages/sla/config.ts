import { Column } from 'src/app/models/column.interface';
import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';
import { Find } from 'src/app/models/queryparams.interface';

export const SLA_COLUMNS: Column[] = [
  {
    title: 'Name',
    breakpoint: 'sm',
    // change to barangay name
    path: '_userId.address.barangay.brgyDesc',
    type: 'text',
    selected: true,
  },
  {
    title: 'No. of Agreements',
    breakpoint: 'sm',
    path: 'agreementsCount',
    type: 'number',
    selected: true,
  },
];

export const SLA_COLUMNS_CONFIG: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'Barangay',
    selected: true,
    column: [
      {
        title: 'Name',
        breakpoint: 'sm',
        // change to barangay name
        path: '_userId.address.barangay.brgyDesc',
        type: 'text',
        selected: true,
      },
      {
        title: 'No. of Agreements',
        breakpoint: 'sm',
        path: 'agreementsCount',
        type: 'number',
        isVirtual: true,
        selected: true,
      },
    ],
  },
  {
    label: 'Notary',
    selected: false,
    column: [
      {
        title: 'Name',
        breakpoint: 'sm',
        path: '_userId',
        paths: ['_userId.firstName', '_userId.lastName'],
        type: 'special',
        selected: true,
      },
      {
        title: 'No. of Agreements',
        breakpoint: 'sm',
        path: 'agreementsCount',
        type: 'number',
        isVirtual: true,
        selected: true,
      },
    ],
  },
];

export const BARANGAY_FIND: Find[] = [
  {
    field: 'type',
    operator: '=',
    value: 'Barangay',
  },
];
export const NOTARY_FIND: Find[] = [
  {
    field: 'type',
    operator: '=',
    value: 'Notary',
  },
];
