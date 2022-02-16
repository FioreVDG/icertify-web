import { Column } from 'src/app/models/column.interface';

export const USERS: Column[] = [
  {
    title: 'First Name',
    breakpoint: 'sm',
    path: 'firstName',
    type: 'text',
    selected: true,
  },
  {
    title: 'Last Name',
    breakpoint: 'sm',
    path: 'lastName',
    type: 'text',
    selected: true,
  },
  {
    title: 'Middle Name',
    breakpoint: 'sm',
    path: 'middleName',
    type: 'text',
    selected: true,
  },
  {
    title: 'User Role',
    breakpoint: 'sm',
    path: '_roleId',
    type: 'text',
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
    title: 'Email',
    breakpoint: 'sm',
    path: 'email',
    type: 'text',
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
    title: 'Status',
    breakpoint: 'sm',
    path: 'status',
    type: 'text',
    selected: true,
  },
];

export const USER_BOTTOMSHEET = [
  { label: 'Edit Details', action: 'edit', icon: 'edit  ' },
  { label: 'Delete', action: 'delete', icon: 'delete' },
];
