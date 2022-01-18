import { Section } from 'src/app/models/form.interface';
export const IMAGE_FORM = [
  {
    name: '',
    isVisible: true,
    fields: [
      {
        label: '1st Valid Government ID',
        visible: true,
        fcname: 'government_ID_1',
        hasError: true,
      },
      {
        label: '2nd Valid Government ID',
        visible: true,
        fcname: 'government_ID_2',
        hasError: true,
      },
      {
        label: 'Certificate of Indigency',
        visible: true,
        fcname: 'cert_of_indigency',
        hasError: true,
      },
    ],
  },
];
