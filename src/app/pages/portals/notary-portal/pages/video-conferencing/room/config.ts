export const USER_INFO = [
  {
    label: 'First Name',
    path: 'firstName',
  },
  {
    label: 'Middle Name',
    path: 'middleName',
  },
  {
    label: 'Last Name',
    path: 'lastName',
  },
  {
    label: 'Suffix',
    path: 'suffix',
  },
  {
    label: 'Birth date',
    path: 'birthDate',
    type: 'date',
  },
  {
    label: 'Sex',
    path: 'gender',
  },
  {
    label: 'Address',
    path: 'address',
    type: 'special',
    paths: [
      'address.address1',
      'address.address2',
      'address.barangay.brgyDesc',
      'address.cityMun.citymunDesc',
      'address.province.provDesc',
    ],
  },
];
