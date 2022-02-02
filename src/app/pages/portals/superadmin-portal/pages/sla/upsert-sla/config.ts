import { Section } from 'src/app/models/form.interface';

export const SLA_FORM: Section[] = [
  {
    section: 'Party Details',
    show: true,
    items: [
      {
        label: 'Party Type',
        type: 'select',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        choices: ['Notary', 'Barangay'],
        fcname: 'type',
        show: true,
        path: 'type',
        appearance: 'outline',
      },
      {
        label: 'Select User',
        type: 'select',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        choices: [],
        choiceLabel: 'address.barangay.brgyDesc',
        choiceValue: '_id',
        fcname: '_userId',
        show: true,
        path: '_userId',
        appearance: 'outline',
      },
    ],
  },
];
