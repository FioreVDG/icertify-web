import { Section } from 'src/app/models/form.interface';

export const USER_FORM: Section[] = [
  {
    section: 'Personal Details',
    show: true,
    items: [
      {
        label: 'First Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'firstName',
        show: true,
        default: '',
        path: 'firstName',
        appearance: 'outline',
      },
      {
        label: 'Last Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'lastName',
        show: true,
        default: '',
        path: 'lastName',
        appearance: 'outline',
      },
      {
        label: 'Middle Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'middleName',
        show: true,
        default: '',
        path: 'middleName',
        optional: true,
        appearance: 'outline',
      },
      {
        label: 'Suffix',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'suffix',
        show: true,
        default: '',
        path: 'others.suffix',
        optional: true,
        appearance: 'outline',
      },
      {
        label: 'Sex',
        type: 'select',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'gender',
        choices: ['Male', 'Female'],
        show: true,
        default: '',
        path: 'gender',
        appearance: 'outline',
      },
    ],
  },
  {
    section: 'Contact Information',
    show: true,
    items: [
      {
        label: 'Email',
        type: 'email',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'email',
        show: true,
        default: '',
        path: 'email',
        appearance: 'outline',
      },
      {
        label: 'Mobile Number',
        type: 'mobileNumber',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'mobileNumber',
        show: true,
        default: '',
        path: 'mobileNumber',
        placeholder: '9123456789',
        appearance: 'outline',
      },
      {
        label: 'Address Line 1',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
        fcname: 'address1',
        show: true,
        default: '',
        path: 'address.address1',
        placeholder: 'Street No./Building',
        appearance: 'outline',
        optional: true,
      },
      {
        label: 'Address Line 2',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
        fcname: 'address2',
        show: true,
        default: '',
        path: 'address.address2',
        appearance: 'outline',
        placeholder: 'Village/Apartment/Unit/Building/Etc.',
        optional: true,
      },
    ],
  },
];

export const ADDRESS_SELECT = [
  {
    label: 'Region',
    type: 'select',
    required: true,
    colspan: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 },
    fcname: 'region',
    show: true,
    choices: [],
    choiceLabel: 'regDesc',
    choiceValue: 'regCode',
    default: '',
    path: 'address.region',
  },
  {
    label: 'Province',
    type: 'select',
    required: true,
    colspan: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 },
    fcname: 'province',
    show: false,
    choices: [],
    choiceLabel: 'provDesc',
    choiceValue: 'provCode',
    default: '',
    path: 'address.province',
  },
  {
    label: 'City',
    type: 'select',
    required: false,
    colspan: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 },
    fcname: 'cityMun',
    show: false,
    choices: [],
    choiceLabel: 'citymunDesc',
    choiceValue: 'citymunCode',
    default: '',
    path: 'address.cityMun',
  },
  {
    label: 'Barangay',
    type: 'select',
    required: true,
    colspan: { xs: 3, sm: 3, md: 3, lg: 3, xl: 3 },
    fcname: 'barangay',
    show: false,
    default: '',
    choices: [],
    choiceLabel: 'brgyDesc',
    choiceValue: 'brgyCode',
    path: 'address.barangay',
  },
];
