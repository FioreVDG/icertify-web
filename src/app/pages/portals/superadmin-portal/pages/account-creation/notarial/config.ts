import { Column } from 'src/app/models/column.interface';

export const NOTARIAL: Column[] = [
  {
    title: 'Name',
    breakpoint: 'sm',
    path: 'firstName',
    paths: ['firstName', 'middleName', 'lastName'],
    type: 'special',
    selected: true,
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
      'address.region.regDesc',
    ],
    type: 'special',
    selected: true,
  },
  {
    title: 'Roll Number',
    breakpoint: 'sm',
    path: 'roll_number',
    type: 'text',
    selected: true,
  },
  {
    title: 'IBP Chapter',
    breakpoint: 'sm',
    path: 'ibp_chapter',
    type: 'text',
    selected: true,
  },
  {
    title: 'Status',
    breakpoint: 'sm',
    path: 'status',
    type: 'text',
    selected: true,
  },
];
