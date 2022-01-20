import { Column } from 'src/app/models/column.interface';

export const VIEW_DOC_TABLE: Column[] = [
  {
    title: 'Document Reference Code',
    breakpoint: 'sm',
    path: 'refCode',
    type: 'text',
    selected: true,
  },
  {
    title: 'Document Name/Subject',
    breakpoint: 'sm',
    path: 'documentName',
    type: 'text',
    selected: true,
  },
  {
    title: 'Document Type',
    breakpoint: 'sm',
    path: 'documentType',
    type: 'text',
    selected: true,
  },
  {
    title: 'Owner',
    breakpoint: 'sm',
    path: 'sender',
    paths: ['sender.firstName', 'sender.lastName'],
    type: 'special',
    selected: true,
  },
  {
    title: 'Date and Time Received',
    breakpoint: 'sm',
    path: 'createdAt',
    type: 'date',
    selected: true,
  },
];
