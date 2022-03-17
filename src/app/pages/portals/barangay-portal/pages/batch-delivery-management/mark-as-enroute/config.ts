import { AUTO_COMPLETE_FIELDS } from 'src/app/models/auto-complete.interface';
import { Section } from 'src/app/models/form.interface';

export const MARK_AS_ENROUTE_FORM: Array<Section> = [
  {
    section: '',
    show: true,
    items: [
      {
        label: 'Select Rider',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'rider',
        show: true,
        default: '',
        path: '_riderFromNotary.lastName',
        appearance: 'standard',
      },
    ],
  },
];
export const TABLE_CONFIG = [
  {
    title: 'Document Reference Code',
    path: 'refCode',
  },
  {
    title: 'QC Indigent',
    paths: ['sender.firstName', 'sender.middleName', 'sender.lastName'],
  },
  {
    title: 'Date and Time Received',
    type: 'date',
    path: 'updatedAt',
  },
];

export const CHOICES_RIDER_DATA: AUTO_COMPLETE_FIELDS = {
  title: 'Select a Rider',
  item: [],
};
