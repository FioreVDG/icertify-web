import { Find } from 'src/app/models/queryparams.interface';

export const FIND_NOTARY_ONLY: Find[] = [
  {
    field: 'message',
    operator: '[in]=',
    value:
      'Received by Notarial Staff,Video Conference Scheduled by Notarial Staff,Marked as Notarized,Marked as Unnotarized,Marked as Enroute to Brgy Hall by Notarial Staff,Document Received from Notary by Brgy Hall Staff,Document Released to Indigent by Brgy Hall Staf',
  },
];
