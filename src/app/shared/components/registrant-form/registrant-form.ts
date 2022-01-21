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
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'suffix',
        show: true,
        default: '',
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
    ],
  },
  {
    section: 'Address Information',
    show: true,
    items: [
      {
        label: 'Street No./Building',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'address1',
        optional: true,
        show: true,
        default: '',
        path: 'address.address1',
        appearance: 'standard',
      },
      {
        label: 'Apartment/Unit/Building/Etc.',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'address2',
        optional: true,
        show: true,
        default: '',
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
        path: 'address.barangay.brgyDesc',
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
        path: 'address.cityMun.citymunDesc',
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
        path: 'address.province.provDesc',
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
        path: 'address.region.regDesc',
        appearance: 'standard',
        disabled: true,
      },
    ],
  },
];
