import {
  MODULE_REPORTS,
  MODULE_CONFIG,
  FILTER_KEYS,
} from './../../../../../models/reports.interface';
//INITIALIZE MODULE CONFIG

export const REGISTRATION_MODULE: MODULE_CONFIG[] = [
  {
    label: 'New Registrants',
    key: 'newRegistrantsCounts.total',
  },
  {
    label: 'Total Registrants to Date',
    key: 'registrants.total',
  },
];
export const REGISTRATION_DB_MODULE: MODULE_CONFIG[] = [
  {
    label: 'New Registrants',
    key: 'newRegistrantDbTotal.total',
  },
  {
    label: 'Total Registrants to Date',
    key: 'registrantDbTotal.total',
  },
];
export const TRANSACTION_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total New Documents',
    key: 'totalNewDocsToday.total',
  },
  {
    label: 'Total Documents to Date',
    key: 'totalNewDocs.total',
  },
];
export const DOC_RECEIVING_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Documents',
    key: 'totalBrgyReceivingDocs.total',
  },
];
export const BATCH_DELIVERY_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Documents',
    key: 'totalBatchDeliveryDocs.total',
  },
  {
    label: 'Total Documents to Date',
    key: 'totalDocs.total',
  },
  {
    label: 'Total Batches to Date',
    key: 'totalBatch.total',
  },
];
export const VIDEO_CONFERENCING_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Scheduled Meetings',
    key: 'totalScheduleToday.total',
  },
  {
    label: 'Total Finished Meetings to Date',
    key: 'totalFinishedMeeting.total',
  },
];
export const DOC_REC_NOTARY_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Documents',
    key: 'todayReceivedFromNotaryDocsTotal.total',
  },
  {
    label: 'Total Received Documents to Date',
    key: 'receivedFromNotaryDocsTotal.total',
  },
  {
    label: 'Total Received Batches to Date',
    key: 'receivedFromNotaryBatchesTotal.total',
  },
];
export const DOC_RELEASING_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Documents',
    key: 'totalReleasingDocsToday.total',
  },
  {
    label: 'Total Released Documents to Date',
    key: 'totalReleasedDocs.total',
  },
];
export const TRANSACTION_HISTORY_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Documents',
    key: 'totalDocsToday.total',
  },
  {
    label: 'Total Documents to Date',
    key: 'totalDocsToDate.total',
  },
];
export const DOC_TRACKER_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Ongoing Documents',
    key: 'ongoingDocsTotal.total',
  },
  {
    label: 'Total Finished Documents to Date',
    key: 'finishedDocsTotal.total',
  },
  {
    label: 'Total Documents to Date',
    key: 'totalDocsToDate.total',
  },
];

// FILTER KEYS
export const FOR_REGISTRATION_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'registrantCertIndigencyTotal.withCertificate',
    label: 'Complete Requirements',
  },
  {
    id: 'registrantCertIndigencyTotal.withoutCertificate',
    label: 'W/O Certificate of Indigency',
  },
];
export const FOR_NEW_REGISTRATION_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'newRegistrantCertIndigency.withCertificate',
    label: 'Complete Requirements',
  },
  {
    id: 'newRegistrantCertIndigency.withoutCertificate',
    label: 'W/O Certificate of Indigency',
  },
];
export const REGISTRATION_REASON_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'registrantReasonTotal.complete_requirements_to_get_the_certificate_are_yet_to_be_submitted_by_the_registrant',
    label:
      'Complete requirements to get the certificate are yet to be submitted by the registrant.',
  },
  {
    id: 'registrantReasonTotal.barangay_chairman/captain/officer-in-charge_of_signing_is_not_present_to_sign_the_certificate',
    label:
      'Barangay Chairman/Captain/Officer-in-Charge of signing is not present to sign the certificate.',
  },
];
export const FOR_NEW_REGISTRATION_DB_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'newRegistrantDbCertIndigencyTotal.withCertificate',
    label: 'Complete Requirements',
  },
  {
    id: 'newRegistrantDbCertIndigencyTotal.withoutCertificate',
    label: 'W/O Certificate of Indigency',
  },
];
export const REGISTRATION_DB_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'registrantDbCertificateTotal.withCertificate',
    label: 'Complete Requirements',
  },
  {
    id: 'registrantDbCertificateTotal.withoutCertificate',
    label: 'W/O Certificate of Indigency',
  },
];
export const REGISTRATION_REASON__DB_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'registrantReasonTotal.complete_requirements_to_get_the_certificate_are_yet_to_be_submitted_by_the_registrant',
    label:
      'Complete requirements to get the certificate are yet to be submitted by the registrant.',
  },
  {
    id: 'registrantReasonTotal.barangay_chairman/captain/officer-in-charge_of_signing_is_not_present_to_sign_the_certificate',
    label:
      'Barangay Chairman/Captain/Officer-in-Charge of signing is not present to sign the certificate.',
  },
];
export const TOTAL_NEW_DOCS_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalNewDocsType.affidavit',
    label: 'Affidavit',
  },
  {
    id: 'totalNewDocsType.brgy_compromise_agreement',
    label: 'Brgy. Compromise Agreement',
  },
  {
    id: 'totalNewDocsType.quitclaim',
    label: 'Quitclaim',
  },
  {
    id: 'totalNewDocsType.special_power_of_attorney_(spa)',
    label: 'Special Power of Attorney (SPA)',
  },
  {
    id: 'totalNewDocsType.others',
    label: 'Others',
  },
];
export const TOTAL_DOCS_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalDocsType.affidavit',
    label: 'Affidavit',
  },
  {
    id: 'totalDocsType.brgy_compromise_agreement',
    label: 'Brgy. Compromise Agreement',
  },
  {
    id: 'totalDocsType.quitclaim',
    label: 'Quitclaim',
  },
  {
    id: 'totalDocsType.special_power_of_attorney_(spa)',
    label: 'Special Power of Attorney (SPA)',
  },
  {
    id: 'totalDocsType.others',
    label: 'Others',
  },
];
export const DOCS_RECEIVING_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'brgyReceivingTotalDocType.affidavit',
    label: 'Affidavit',
  },
  {
    id: 'brgyReceivingTotalDocType.brgy_compromise_agreement',
    label: 'Brgy. Compromise Agreement',
  },
  {
    id: 'brgyReceivingTotalDocType.quitclaim',
    label: 'Quitclaim',
  },
  {
    id: 'brgyReceivingTotalDocType.special_power_of_attorney_(spa)',
    label: 'Special Power of Attorney (SPA)',
  },
  {
    id: 'brgyReceivingTotalDocType.others',
    label: 'Others',
  },
];
export const DOCS_RECEIVING_STATUS_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'brgyReceivingTotalDocStatus.for_pick_up_(barangay)',
    label: 'For Pick Up (Barangay)',
  },
  {
    id: 'brgyReceivingTotalDocStatus.enroute_to_notary',
    label: 'Enroute to Notary',
  },
];
export const BATCH_DELIVERY_STATUS_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalbatchDeliveryStatus.for_pick_up_(barangay)',
    label: 'For Pick Up (Barangay)',
  },
  {
    id: 'totalbatchDeliveryStatus.enroute_to_notary',
    label: 'Enroute to Notary',
  },
];
export const VIDEO_CONFERENCING_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'meetingStatus.pending',
    label: 'Pending',
  },
  {
    id: 'meetingStatus.finished',
    label: 'Finished',
  },
];
export const DOC_REC_NOTARY_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'todayReceivedFromNotaryDocStatus.for_receiving',
    label: 'For Receiving',
  },
  {
    id: 'todayReceivedFromNotaryDocStatus.received',
    label: 'Received',
  },
];
export const DOC_RELEASING_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalReleasingDocsToday.released',
    label: 'Released',
  },
  {
    id: 'totalReleasingDocsToday.for_releasing',
    label: 'For Releasing',
  },
];
export const TRANSACTION_TODAY_HISTORY_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'notarizationStatusNewDocs.notarized',
    label: 'Unnotarized',
  },
  {
    id: 'notarizationStatusNewDocs.unnotarized',
    label: 'Notarized',
  },
];
export const TRANSACTION_HISTORY_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'notarizationStatusDocs.notarized',
    label: 'Unnotarized',
  },
  {
    id: 'notarizationStatusDocs.unnotarized',
    label: 'Notarized',
  },
];
export const DOCUMENT_TRACKER_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'locStatusOngoingDocs.received_by_brgy_hall_staff',
    label: 'Received by Brgy',
  },
  {
    id: 'locStatusOngoingDocs.batched_and_marked_as_enroute_to_notary_by_brgy_hall_staff',
    label: 'Batched and Marked as Enroute to Notary by Brgy Hall',
  },
  {
    id: 'locStatusOngoingDocs.received_by_notarial_staff',
    label: 'Received by Notary',
  },
  {
    id: 'locStatusOngoingDocs.video_conference_scheduled_by_notarial_staff',
    label: 'Video Conference scheduled by Notary',
  },
  {
    id: 'locStatusOngoingDocs.marked_as_notarized',
    label: 'Marked as Notarized',
  },
  {
    id: 'locStatusOngoingDocs.marked_as_unnotarized',
    label: 'Marked as Unnotarized',
  },
  {
    id: 'locStatusOngoingDocs.marked_as_enroute_to_brgy_hall_by_notary',
    label: 'Marked as Enroute to Brgy Hall by Notary',
  },
  {
    id: 'locStatusOngoingDocs.document_received_from_notary_by_brgy_hall_staff',
    label: 'Document Received from Notary',
  },
  {
    id: 'locStatusOngoingDocs.document_released_to_indigent',
    label: 'Document Released to Indigent',
  },
];

export const PIE_CHART_OPTIONS = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    height: '360px',
  },
  title: {
    text: '',
    align: 'center',
    verticalAlign: 'middle',
    y: 0,
    x: 0,
    widthAdjust: -400,
    style: { color: '#333333', fontSize: '10px' },
  },
  tooltip: {
    headerFormat: '<span style="font-size:8px">{series.name}</span><br>',
    pointFormat:
      '<span style="color:{point.color}">{point.name}: <b>{point.y} ({point.percentage:.1f}%)<br/>',
  },
  accessibility: {
    point: {
      valueSuffix: '',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: false,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format:
          '<b style="color:#636363;font-size:8px">{point.name}: {point.y:.0f}</b>',
      },
      showInLegend: true,
    },
  },

  credits: {
    enabled: false,
  },
  legend: {
    y: 10,
  },
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      innerSize: '75%',
      size: '75%',
      data: [],
    },
  ],
};

export const REGISTRATION = [
  {
    label: 'New Registrants',
    key: 'newRegistrantTotal',
    icon: 'perm_contact_calendar',
  },
  {
    label: 'Total Registrants to Date',
    key: 'registrantTotal',
    icon: 'supervisor_account',
  },
  {
    label: 'New Registrants',
    key: 'newRegistrantCertIndigencyTotal',
  },
  {
    label: 'Total Registrants to Date',
    key: 'registrantCertificateTotal',
  },
  {
    label: 'Reason for delayed submission of Certificate of Indigency',
    key: 'newRegistrantReasonTotal',
  },
  {
    label: 'Reason for delayed submission of Certificate of Indigency',
    key: 'registrantReasonTotal',
  },
];

export const DASHBOARD_CONFIG: Array<MODULE_REPORTS> = [
  {
    label: 'REGISTRATION',
    reportKey: 'registration',
    isLoading: true,
    role: ['Registration'],
    reportCharts: [
      {
        chartKey: 'new_registration',
        filterKeys: FOR_NEW_REGISTRATION_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'New Registrants',
          chartType: 'pie',
          chartKey: 'new_registration',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
      {
        chartKey: 'registration',
        filterKeys: FOR_REGISTRATION_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Total Registration to Date',
          chartType: 'pie',
          chartKey: 'registration',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
      {
        chartKey: 'registrants_reason',
        filterKeys: REGISTRATION_REASON_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle:
            'Reason for delayed submission of Certificate of Indigency',
          chartType: 'pie',
          chartKey: 'registrants_reason',
          widthStatus: -1200,
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: REGISTRATION_MODULE,
      class: {
        grid: 'col-12 md:col-6 mb-2',
      },
    },
  },
  {
    label: 'REGISTRANT DATABASE',
    reportKey: 'registrantDb',
    isLoading: true,
    role: ['Registrants Database'],
    reportCharts: [
      {
        chartKey: 'new_registrantDb',
        filterKeys: FOR_NEW_REGISTRATION_DB_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'New Registrants',
          chartType: 'pie',
          chartKey: 'new_registrantDb',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
      {
        chartKey: 'registrationDb',
        filterKeys: REGISTRATION_DB_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Total Registration to Date',
          chartType: 'pie',
          chartKey: 'registrationDb',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
      {
        chartKey: 'registrants_reason',
        filterKeys: REGISTRATION_REASON__DB_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle:
            'Reason for delayed submission of Certificate of Indigency',
          chartType: 'pie',
          chartKey: 'registrants_reason',
          widthStatus: -1200,
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: REGISTRATION_DB_MODULE,
      class: {
        grid: 'col-12 md:col-6 mb-2',
      },
    },
  },

  {
    label: 'NEW TRANSACTION',
    reportKey: 'newTransaction',
    isLoading: true,
    role: ['New Transaction'],
    reportCharts: [
      {
        chartKey: 'newTransaction',
        filterKeys: TOTAL_NEW_DOCS_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Total New Documents',
          chartType: 'pie',
          chartKey: 'newTransaction',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
      {
        chartKey: 'total_Transaction',
        filterKeys: TOTAL_DOCS_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Total Documents to Date',
          chartType: 'pie',
          chartKey: 'total_Transaction',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
    ],
    cardDetails: {
      config: TRANSACTION_MODULE,
      class: {
        grid: 'col-12 md:col-6 mb-2',
      },
    },
  },
  {
    label: 'Document Receiving',
    reportKey: 'docReceiving',
    isLoading: true,
    role: ['Document Receiving'],
    reportCharts: [
      {
        chartKey: 'doc_receiving',
        filterKeys: DOCS_RECEIVING_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Document Type',
          chartType: 'pie',
          chartKey: 'doc_receiving',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
      {
        chartKey: 'doc_status_receiving',
        filterKeys: DOCS_RECEIVING_STATUS_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'doc_status_receiving',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
    ],
    cardDetails: {
      config: DOC_RECEIVING_MODULE,
      class: {
        grid: 'col-12',
      },
    },
  },
  {
    label: 'Batch Delivery Management',
    reportKey: 'batchDelivery',
    isLoading: true,
    role: ['Batch Delivery Management'],
    reportCharts: [
      {
        chartKey: 'batch_delivery',
        filterKeys: BATCH_DELIVERY_STATUS_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'batch_delivery',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: BATCH_DELIVERY_MODULE,
      class: {
        grid: 'col-4 md:col-6 mb-2 lg:col-4 sm:col-12',
      },
    },
  },
  {
    label: 'Video Conferencing',
    reportKey: 'vidConference',
    isLoading: true,
    role: ['Video Conferencing'],
    reportCharts: [
      {
        chartKey: 'vid_Conference',
        filterKeys: VIDEO_CONFERENCING_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'vid_Conference',
          widthStatus: -400,
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: VIDEO_CONFERENCING_MODULE,
      class: {
        grid: 'col-12 md:col-6 mb-2',
      },
    },
  },
  {
    label: 'Document Receiving from Notary',
    reportKey: 'docReceivingNotary',
    isLoading: true,
    role: ['Document Receiving from Notary'],
    reportCharts: [
      {
        chartKey: 'doc_rec_notary',
        filterKeys: DOC_REC_NOTARY_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'doc_rec_notary',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: DOC_REC_NOTARY_MODULE,
      class: {
        grid: 'col-4',
      },
    },
  },
  {
    label: 'Document Releasing to Indigent',
    reportKey: 'docReleasing',
    isLoading: true,
    role: ['Document Releasing to Indigent'],
    reportCharts: [
      {
        chartKey: 'doc_releasing',
        filterKeys: DOC_RELEASING_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'doc_releasing',
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: DOC_RELEASING_MODULE,
      class: {
        grid: 'col-12 md:col-6 mb-2',
      },
    },
  },
  {
    label: 'Transaction History',
    reportKey: 'transactionHistory',
    isLoading: true,
    role: ['Transaction History'],
    reportCharts: [
      {
        chartKey: 'transac_new_history',
        filterKeys: TRANSACTION_TODAY_HISTORY_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Notarization Status of New Documents',
          chartType: 'pie',
          chartKey: 'transac_new_history',
          widthStatus: -600,
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
      {
        chartKey: 'transac_history',
        filterKeys: TRANSACTION_HISTORY_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Notarization Status of Documents to Date',
          chartType: 'pie',
          chartKey: 'transac_history',
          widthStatus: -600,
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2',
        },
      },
    ],
    cardDetails: {
      config: TRANSACTION_HISTORY_MODULE,
      class: {
        grid: 'col',
      },
    },
  },
  {
    label: 'Document Tracker',
    reportKey: 'documentTracker',
    isLoading: true,
    role: ['Document Tracker'],
    reportCharts: [
      {
        chartKey: 'doc_tracker',
        filterKeys: DOCUMENT_TRACKER_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Locations Status of Ongoing Documents',
          chartType: 'pie',
          chartKey: 'doc_tracker',
          widthStatus: -1200,
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: DOC_TRACKER_MODULE,
      class: {
        grid: 'col-4 md:col-6 mb-2 lg:col-4 sm:col-12',
      },
    },
  },
];
