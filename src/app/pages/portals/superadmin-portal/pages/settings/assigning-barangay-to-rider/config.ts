import { Column } from 'src/app/models/column.interface';

export const ASSIG_BARANGAY_TO_RIDER_FORM: Column[] = [
  {
    title: 'Rider',
    breakpoint: 'sm',
    path: 'name',
    type: 'special',
    paths: ['firstName', 'lastName'],
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
    title: 'No. of Barangays',
    breakpoint: 'sm',
    path: 'barangayCount',
    type: 'text',
    selected: true,
  },
];
