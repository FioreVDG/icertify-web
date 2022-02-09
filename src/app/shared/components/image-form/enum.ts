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
        required: true,
        validator: [],
        show: true,
      },
      {
        label: '2nd Valid Government ID',
        visible: true,
        fcname: 'government_ID_2',
        required: true,
        validator: [],
        show: true,
      },
      {
        label: 'Certificate of Indigency',
        visible: true,
        fcname: 'cert_of_indigency',
        required: false,
        validator: [],
        show: false,
      },
    ],
  },
];

export const CHOICES = {
  section: 'Does the registrant have a Certificate of Indigency?',
  choices: [
    {
      label: 'Yes',
      value: 'yes',
    },
    {
      label: 'No, but uploading of the Certificate of Indigency is to follow.',
      value: 'no',
    },
  ],
};
