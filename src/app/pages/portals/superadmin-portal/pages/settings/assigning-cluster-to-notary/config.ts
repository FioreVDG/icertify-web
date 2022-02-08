import { Column } from 'src/app/models/column.interface';

export const CLUSTER_ASSIG_COLUMNS: Column[] = [
  {
    title: 'Cluster',
    breakpoint: 'sm',
    path: 'name',
    type: 'text',
    selected: true,
  },
  {
    title: 'Notary',
    breakpoint: 'sm',
    path: '_notary',
    type: 'text',
    selected: true,
  },
  {
    title: 'No. of Barangays',
    breakpoint: 'sm',
    path: 'barangayCount',
    type: 'text',
    selected: true,
  },
];
