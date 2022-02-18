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
    title: 'Office Address',
    breakpoint: 'sm',
    path: 'office_address',
    paths: [
      'office_address.office_address1',
      'office_address.office_address2',
      'office_address.office_barangay.brgyDesc',
      'office_address.office_cityMun.citymunDesc',
      'office_address.office_province.provDesc',
      'office_address.office_region.regDesc',
    ],
    type: 'special',
    selected: true,
  },
  {
    title: 'Home Address',
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
    title: 'IBP Chapter Region',
    breakpoint: 'sm',
    path: 'ibp_chapter_region',
    type: 'text',
    selected: true,
  },
  {
    title: 'IBP Chapter City/Province',
    breakpoint: 'sm',
    path: 'ibp_chapter_city_prov',
    type: 'text',
    selected: true,
  },
  {
    title: 'No. of Users',
    breakpoint: 'sm',
    path: 'user_count',
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

export const NOTARIAL_BOTTOMSHEET = [
  { label: 'Edit Details', action: 'edit' },
  { label: 'Delete', action: 'delete' },
  { label: 'Users', action: 'users' },
  { label: 'Access Roles', action: 'accessroles' },
];
