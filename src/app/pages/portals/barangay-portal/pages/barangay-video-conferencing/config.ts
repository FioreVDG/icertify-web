import { FILTER_BUTTON_COLUMN } from 'src/app/models/filter-button-conf.interface';

export const FILT_BTN: Array<FILTER_BUTTON_COLUMN> = [
  {
    label: 'Pending',
    selected: true,
    isCheckbox: false,
    column: [
      {
        title: 'Transaction Ref Code',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '',
      },
      {
        title: 'QC Indigent',
        breakpoint: 'sm',
        type: 'special',
        selected: true,
        path: '',
      },
      {
        title: 'Notary',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '',
      },
      {
        title: 'No. of Documents',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '',
      },
      {
        title: 'Schedule',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '',
      },
    ],
  },
  {
    label: 'Finished',
    selected: false,
    isCheckbox: false,
    column: [
      {
        title: 'Transaction Ref Code',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '',
      },
      {
        title: 'QC Indigent',
        breakpoint: 'sm',
        type: 'special',
        selected: true,
        path: '',
      },
      {
        title: 'Notary',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '',
      },
      {
        title: 'No. of Documents',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '',
      },
      {
        title: 'Schedule',
        breakpoint: 'sm',
        type: 'text',
        selected: true,
        path: '',
      },
    ],
  },
];
