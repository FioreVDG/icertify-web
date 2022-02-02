import { Column } from 'src/app/models/column.interface';

export const CONFERENCE_TABLE: Column[] = [
  {
    title: 'Schedule Id',
    breakpoint: 'sm',
    path: '_id',
    type: 'text',
    selected: true,
  },
  {
    title: 'Notary Name',
    breakpoint: 'sm',
    path: 'sender',
    paths: ['_notaryId.firstName', '_notaryId.lastName'],
    type: 'special',
    selected: true,
  },

  {
    title: 'Schedule',
    breakpoint: 'sm',
    path: 'schedule',
    type: 'date',
    selected: true,
  },
  {
    title: 'Conference Status',
    breakpoint: 'sm',
    path: 'conferenceStatus',
    type: 'text',
    selected: true,
  },
];
