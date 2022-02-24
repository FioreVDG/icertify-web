import { AUTO_COMPLETE_FIELDS } from 'src/app/models/auto-complete.interface';
import { Section } from 'src/app/models/form.interface';

export const RIDER_FORM: Section[] = [
  {
    section: 'Personal Details',
    show: true,
    items: [
      {
        label: 'Family Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
        fcname: 'lastName',
        show: true,
        default: '',
        path: 'lastName',
        appearance: 'standard',
      },
      {
        label: 'First Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
        fcname: 'firstName',
        show: true,
        default: '',
        path: 'firstName',
        appearance: 'standard',
      },
      {
        label: 'Middle Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
        fcname: 'middleName',
        show: true,
        default: '',
        path: 'middleName',
        appearance: 'standard',
        optional: true,
      },
      {
        label: 'Suffix',
        type: 'select',
        colspan: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
        choices: ['I', 'II', 'III', 'IV', 'Jr', 'Sr'],
        fcname: 'suffix',
        show: true,
        path: 'suffix',
        appearance: 'standard',
        optional: true,
      },
    ],
  },
  {
    section: 'Contact Information',
    show: true,
    items: [
      {
        label: 'Mobile Number',
        type: 'mobileNumber',
        colspan: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
        fcname: 'mobileNumber',
        show: true,
        default: '',
        path: 'mobileNumber',
        max: 10,
        min: 10,
        appearance: 'standard',
        prefix: '(+63)',
      },
      {
        label: 'Complete Address',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 },
        fcname: 'address',
        show: true,
        default: '',
        path: 'address.address1',
        appearance: 'standard',
      },
    ],
  },
  {
    section: 'Other Information',
    show: true,
    items: [
      {
        label: 'Sex',
        type: 'select',
        colspan: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
        choices: ['Male', 'Female'],
        fcname: 'gender',
        show: true,
        path: 'gender',
        appearance: 'standard',
      },
      {
        label: 'Birth Date',
        type: 'date',
        colspan: { xs: 12, sm: 12, md: 12, lg: 6, xl: 6 },
        fcname: 'birthDate',
        show: true,
        default: '',
        path: 'birthDate',
        appearance: 'standard',
      },
    ],
  },
  // {
  //   section: 'Select Cluster',
  //   show: true,
  //   items: [
  //     {
  //       label: 'Cluster',
  //       type: 'select',
  //       colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
  //       fcname: '_clusterId',
  //       show: true,
  //       default: '',
  //       path: '_clusterId._id',
  //       appearance: 'standard',
  //       choices: [],
  //       choiceLabel: 'name',
  //       choiceValue: '_id',
  //       optional: true,
  //     },
  //   ],
  // },
];
