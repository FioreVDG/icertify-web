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
    title: 'Barangays',
    breakpoint: 'sm',
    path: 'barangays',
    paths: ['barangays.barangay.brgyDesc'],
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
