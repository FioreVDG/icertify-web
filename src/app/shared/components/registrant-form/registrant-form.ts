import { Section } from 'src/app/models/form.interface';
export const REGISTRATION_FORM: Array<Section> = [
  {
    section: 'Personal Information',
    show: true,
    items: [
      {
        label: 'Family Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'lastName',
        show: true,
        default: '',
        path: 'lastName',
        appearance: 'standard',
      },
      {
        label: 'First Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'firstName',
        show: true,
        default: '',
        path: 'firstName',
        appearance: 'standard',
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
        appearance: 'standard',
      },
      {
        label: 'Suffix',
        type: 'select',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'suffix',
        show: true,
        default: '',
        choices: ['Jr.', 'Sr.', 'I', 'II', 'III'],
        path: 'suffix',
        optional: true,
        appearance: 'standard',
        clearBtn: true,
      },
      {
        label: 'Birth Date',
        type: 'date',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'birthDate',
        show: true,
        default: '',
        path: 'birthDate',
        appearance: 'standard',
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
        appearance: 'standard',
      },
      {
        label: 'Mobile Number',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'mobileNumber',
        show: true,
        default: '',
        path: 'mobileNumber',
        optional: true,
        appearance: 'standard',
        prefix: '(+63)',
      },
    ],
  },
  {
    section: 'Address Information',
    show: true,
    items: [
      {
        label: 'Unit/Room No./Floor/Apartment/Building',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'address1',
        show: true,
        default: '',
        optional: true,
        path: 'address.address1',
        appearance: 'standard',
      },
      {
        label: 'Street/Village/Subdivision',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'address2',
        show: true,
        default: '',
        optional: true,
        path: 'address.address2',
        appearance: 'standard',
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
