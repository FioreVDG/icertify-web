import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { Column } from 'src/app/models/column.interface';

export const RIDER_COLUMNS: Column[] = [
  {
    title: 'Rider',
    breakpoint: 'sm',
    path: 'name',
    paths: ['firstName', 'lastName'],
    type: 'special',
    selected: true,
  },
  {
    title: 'Contact No.',
    breakpoint: 'sm',
    path: 'mobileNumber',
    type: 'text',
    selected: true,
  },
  {
    title: 'Cluster',
    breakpoint: 'sm',
    path: '_clusterId.name',
    type: 'text',
    selected: true,
  },
  {
    title: 'Pending Transactions',
    breakpoint: 'sm',
    path: 'pendingTransactions',
    type: 'number',
    isVirtual: true,
    selected: true,
  },
];

export const RIDER_BS_CONFIG: Array<BottomSheetItem> = [
  {
    label: 'Edit Rider',
    action: 'edit',
    icon: 'edit',
  },
  {
    label: 'Delete Rider',
    action: 'delete',
    icon: 'delete',
    showIf: 'pendingTransactions/</1',
  },
];
