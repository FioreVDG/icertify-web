export const COLLECTIONS = [
  {
    label: 'Batch',
    name: 'folder',
    paths: [
      {
        label: 'Date Batch Created',
        path: 'dateCreated',
      },
      {
        label: 'Date Picked from Barangay',
        path: 'datePickedByRiderFromBrgy',
      },
      {
        label: 'Date Dropped to Notary',
        path: 'dateReceivedByNotary',
      },
      {
        label: 'Date Picked from Notary',
        path: 'datePickedByRiderFromNotary',
      },
      {
        label: 'Date Dropped to Barangay',
        path: 'dateReceivedByBrgy',
      },
      {
        label: 'Date Completed by Notary',
        path: 'dateCompleted',
      },
    ],
  },
  {
    label: 'Transaction',
    name: 'transaction',
    paths: [
      {
        label: 'Date Accepted by the Barangay',
        path: 'dateAccepted',
      },
      {
        label: 'Date Assessed by the Notary',
        path: 'dateAssessed',
      },
      {
        label: 'Date Released by the Barangay',
        path: 'dateReleased',
      },
    ],
  },
  {
    label: 'Document',
    name: 'document',
    paths: [
      {
        label: 'Date Uploaded by the Notary',
        path: 'dateUploaded',
      },
    ],
  },
  {
    label: 'Schedule',
    name: 'conference',
    paths: [
      {
        label: 'Date Scheduled by the Notary',
        path: 'dateCreated',
      },
    ],
  },
];

export const MOCK = [
  {
    label: 'New Transaction for Morning',
    description: `If <b>users</b> can post content on your website or mobile app (create content and share it on your platform), you can remove any content they created if it infringes copyright. Your Terms and Conditions will inform users that they can only create and/or share content they own rights to. Similarly, if users can register for an account and choose a username, you can inform users that they are not allowed to choose usernames that may infringe trademarks, i.e. usernames like Google, Facebook, and so on.`,
    time: {
      start: '08:00',
      end: '12:00',
    },
    displayType: 'Bar Graph',
    collectionName: 'transaction',
    path: 'dateCreated',
  },
];
