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
];
