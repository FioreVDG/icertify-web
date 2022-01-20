import { Column } from 'src/app/models/column.interface';

export const DOCUMENT_RECEIVING_TABLE: Column[] = [
  //   {
  //     title: 'Transaction Reference Code',
  //     breakpoint: 'sm',
  //     path: 'refCode',
  //     type: 'text',
  //     selected: true,
  //   },
  {
    title: 'Owner',
    breakpoint: 'sm',
    path: 'sender',
    paths: ['sender.firstName', 'sender.lastName'],
    type: 'text',
    selected: true,
  },
  // {
  //   title: 'Uploaded By',
  //   breakpoint: 'sm',
  //   path: 'sender',
  //   paths: ['sender.firstName', 'sender.lastName'],
  //   type: 'text',
  //   selected: true,
  // },
  {
    title: 'Date and Time Received',
    breakpoint: 'sm',
    path: 'createdAt',
    type: 'date',
    selected: true,
  },
  {
    title: 'No. Of Documents',
    breakpoint: 'sm',
    path: '_documents',
    type: 'text', // make count type
    selected: true,
  },
  {
    title: 'Status',
    breakpoint: 'sm',
    path: 'transactionStatus',
    type: 'text',
    selected: true,
  },
];
