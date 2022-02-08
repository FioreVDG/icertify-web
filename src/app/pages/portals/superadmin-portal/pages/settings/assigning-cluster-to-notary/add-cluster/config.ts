import { Section } from 'src/app/models/form.interface';

export const ADD_CLUSTER: Section[] = [
  {
    section: '',
    show: true,
    items: [
      {
        label: 'Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'name',
        show: true,
        path: 'name',
        appearance: 'outline',
      },
      {
        label: 'Select Notarial Commission',
        type: 'select',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        choices: ['Notary', 'Barangay'],
        fcname: '_notary',
        show: true,
        path: '_notary',
        appearance: 'outline',
      },
    ],
  },
  {
    section: 'Add Barangays',
    show: true,
    items: [
      {
        label: 'Barangay',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: '_barangays',
        show: true,
        path: '_barangays',
        appearance: 'outline',
      },
    ],
  },
];
