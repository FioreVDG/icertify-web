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
      {
        label: 'Barangay',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'barangay',
        show: true,
        default: '',
        path: 'address.barangay',
        optional: true,
        appearance: 'standard',
        disabled: true,
      },
      {
        label: 'City/Municipality',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'cityMun',
        show: true,
        default: '',
        optional: true,
        path: 'address.cityMun',
        appearance: 'standard',
        disabled: true,
      },
      {
        label: 'Province',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'province',
        show: true,
        default: '',
        optional: true,
        path: 'address.province',
        appearance: 'standard',
        disabled: true,
      },
      {
        label: 'Region',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'region',
        show: true,
        default: '',
        optional: true,
        path: 'address.region',
        appearance: 'standard',
        disabled: true,
      },
    ],
  },
];
