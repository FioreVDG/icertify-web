import { Section } from 'src/app/models/form.interface';

export const MARK_AS_ENROUTE_FORM: Array<Section> = [
  {
    section: '',
    show: true,
    items: [
      {
        label: 'Batch Reference Code',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'folderName',
        show: true,
        default: '',
        path: 'folderName',
        appearance: 'standard',
        disabled: true,
      },
      {
        label: 'Barangay',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'barangay',
        show: true,
        default: '',
        path: '_brgyId',
        appearance: 'standard',
        disabled: true,
      },
    ],
  },
  {
    section: 'Rider',
    show: true,
    items: [
      {
        label: 'First Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'firstName',
        show: true,
        default: '',
        path: 'riderNotaryToBarangay.firstName',
        appearance: 'standard',
      },
      {
        label: 'Last Name',
        type: 'text',
        colspan: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 },
        fcname: 'lastName',
        show: true,
        default: '',
        path: 'riderNotaryToBarangay.lastName',
        appearance: 'standard',
      },
    ],
  },
];
