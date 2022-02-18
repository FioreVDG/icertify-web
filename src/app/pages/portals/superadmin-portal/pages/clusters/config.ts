import { BottomSheetItem } from 'src/app/models/bottomsheet.interface';
import { Column } from 'src/app/models/column.interface';

export const CLUSTER_COLUMNS: Array<Column> = [
  {
    title: 'Cluster Name',
    breakpoint: 'sm',
    path: 'name',
    type: 'text',
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
    title: 'Barangays',
    breakpoint: 'sm',
    path: 'barangays',
    paths: ['barangays._barangay.brgyDesc'],
    type: 'special',
    selected: true,
  },
  {
    title: 'Rider Count',
    breakpoint: 'sm',
    path: '_riders',
    type: 'count',
    selected: true,
  },
];

export const BOTTOM_SHEET_CONFIG: Array<BottomSheetItem> = [
  {
    label: 'Edit Cluster',
    action: 'edit',
    icon: 'edit',
  },
  {
    label: 'Delete Cluster',
    action: 'delete',
    icon: 'delete',
  },
];
