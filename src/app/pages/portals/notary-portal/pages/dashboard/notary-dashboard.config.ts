import {
  MODULE_REPORTS,
  MODULE_CONFIG,
  FILTER_KEYS,
} from './../../../../../models/reports.interface';
//INITIALIZE MODULE CONFIG

export const DOC_RECEIVING_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Documents',
    key: 'totalReceivedDocsNew.total',
  },
  {
    label: 'Total Received Documents to Date',
    key: 'totalReceivedDocs.total',
  },
  {
    label: 'Total Received Batches to Date',
    key: 'totalReceivedBatches.total',
  },
];

export const VID_CONFERENCE_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Documents to Schedule',
    key: 'toScheduleDocsTotal',
  },
  {
    label: 'Total Scheduled Meetings',
    key: 'SchedDocsTotal',
  },
  {
    label: 'Total Finished Meetings to Date',
    key: 'totalFinishedMeetings.total',
  },
];
export const DOC_RELEASING_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Batches',
    key: 'totalBatches',
  },
  {
    label: 'Total Delivered Batches to Date',
    key: 'totalBatchesDeliveredToDate.total',
  },
  {
    label: 'Total Delivered Documents to Date',
    key: 'totalDeliveredDocumentsToDate.total',
  },
];
export const DOC_UPLOADING_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Documents for Uploading',
    key: 'totalDocsUploading',
  },

  {
    label: 'Total Uploaded Documents to Date',
    key: 'totalUploadedDocsToDate',
  },
];
export const DOC_TRACKER_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Ongoing Documents',
    key: 'totalOngoingDocs.total',
  },
  {
    label: 'Total Finished Documents to Date',
    key: 'totalFinishedDocuments',
  },
  {
    label: 'Total Documents to Date',
    key: 'totalDocumentsToDate',
  },
];
export const TRANSAC_HISTORY_MODULE: MODULE_CONFIG[] = [
  {
    key: 'totalDocsToDate',
    label: 'Total Documents to Date',
  },
  {
    key: 'totalDelayCOIdocs.total',
    label:
      'Total Documents with delayed submission of Certificate of Indigency',
  },
];
export const REPORTS_MODULE: MODULE_CONFIG[] = [
  {
    label: 'Total Documents',
    key: 'totalDocsToday.total',
  },
  {
    label: 'Total Documents to Date',
    key: 'totalDocsToDate.total',
  },
];

// FILTER KEYS
export const DOC_RECEIVING_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalReceivedDocsToday.received',
    label: 'Received',
  },
  {
    id: 'totalReceivedDocsToday.for_receiving',
    label: 'For Receiving',
  },
];

export const TO_SCHEDULE_FILTER_KEYS: FILTER_KEYS[] = [];

export const SCHEDULED_FILTER_KEYS: FILTER_KEYS[] = [];
export const DOC_RELEASING_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalBatchesByStatus.enroute_to_barangay',
    label: 'Enroute to Brgy',
  },
  {
    id: 'totalBatchesByStatus.received_by_barangay',
    label: 'Delivered to Brgy',
  },
  {
    id: 'totalBatchesByStatus.for_pick_up_(notary)',
    label: 'For Pick Up',
  },
];

export const TRANSACTION_HISTORY_UPLOADED_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'notarizedDocumentsUpload.withoutUpload',
    label: 'W/O uploaded notarized document',
  },
  {
    id: 'notarizedDocumentsUpload.withUpload',
    label: 'With Uploaded notarized document',
  },
];
export const TRANSACTION_HISTORY_DELAYED_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalDelayCOIdocs.toFollow',
    label: 'To Follow',
  },
  {
    id: 'totalDelayCOIdocs.uploaded',
    label: 'Uploaded',
  },
];
export const TRANSACTION_HISTORY_NOT_STATUS_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalDocsToDateByDocStatus.notarized',
    label: 'Notarized',
  },
  {
    id: 'totalDocsToDateByDocStatus.unnotarized',
    label: 'Unnotarized',
  },
];
export const DOC_UPLOADING_FILTER_KEYS: FILTER_KEYS[] = [];
export const DOCUMENT_TRACKER_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalOngoingDocs.received_by_brgy_hall_staff',
    label: 'Received by Brgy',
  },
  {
    id: 'totalOngoingDocs.batched_and_marked_as_enroute_to_notary_by_brgy_hall_staff',
    label: 'Batched and Marked as Enroute to Notary by Brgy Hall',
  },
  {
    id: 'totalOngoingDocs.received_by_notarial_staff',
    label: 'Received by Notary',
  },
  {
    id: 'totalOngoingDocs.video_conference_scheduled_by_notarial_staff',
    label: 'Video Conference scheduled by Notary',
  },
  {
    id: 'totalOngoingDocs.marked_as_notarized',
    label: 'Marked as Notarized',
  },
  {
    id: 'totalOngoingDocs.marked_as_unnotarized',
    label: 'Marked as Unnotarized',
  },
  {
    id: 'totalOngoingDocs.marked_as_enroute_to_brgy_hall_by_notary',
    label: 'Marked as Enroute to Brgy Hall by Notary',
  },
  {
    id: 'totalOngoingDocs.document_received_from_notary_by_brgy_hall_staff',
    label: 'Document Received from Notary',
  },
  {
    id: 'totalOngoingDocs.document_released_to_indigent',
    label: 'Document Released to Indigent',
  },
];
export const NEW_REPORT_TYPE_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalDocsToday.byDocType.specialPowerOfAttorney',
    label: 'Special Power of Attorney (SPA)',
  },
  {
    id: 'totalDocsToday.byDocType.affidavit',
    label: 'Affidavit',
  },
  {
    id: 'totalDocsToday.byDocType.brgyCompAgreement',
    label: 'Brgy. Compromise Agreement',
  },
  {
    id: 'totalDocsToday.byDocType.quitclaim',
    label: 'Quit Claim',
  },
  {
    id: 'totalDocsToday.byDocType.others',
    label: 'Others',
  },
];
export const NEW_REPORT_STATUS_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalDocsToday.byDocStatus.notarized',
    label: 'Notarized',
  },
  {
    id: 'totalDocsToday.byDocStatus.unnotarized',
    label: 'Unnotarized',
  },
  {
    id: 'totalDocsToday.byDocStatus.pending',
    label: 'Pending',
  },
];
export const NEW_REPORT_BRGY_FILTER_KEYS: FILTER_KEYS[] = [];
export const REPORT_TYPE_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalDocsToDate.byDocType.specialPowerOfAttorney',
    label: 'Special Power of Attorney (SPA)',
  },
  {
    id: 'totalDocsToDate.byDocType.affidavit',
    label: 'Affidavit',
  },
  {
    id: 'totalDocsToDate.byDocType.brgyCompAgreement',
    label: 'Brgy. Compromise Agreement',
  },
  {
    id: 'totalDocsToDate.byDocType.quitclaim',
    label: 'Quit Claim',
  },
  {
    id: 'totalDocsToDate.byDocType.others',
    label: 'Others',
  },
];
export const REPORT_STATUS_FILTER_KEYS: FILTER_KEYS[] = [
  {
    id: 'totalDocsToDate.byDocStatus.notarized',
    label: 'Notarized',
  },
  {
    id: 'totalDocsToDate.byDocStatus.unnotarized',
    label: 'Unnotarized',
  },
  {
    id: 'totalDocsToDate.byDocStatus.pending',
    label: 'Pending',
  },
];
export const REPORT_BRGY_FILTER_KEYS: FILTER_KEYS[] = [];
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

export const DASHBOARD_CONFIG: Array<MODULE_REPORTS> = [
  {
    label: 'Document Receiving',
    reportKey: 'notaryDocReceiving',
    isLoading: true,
    role: ['Document Receiving'],
    reportCharts: [
      {
        mainPath: 'SchedDocsPerBrgy',
        chartKey: 'doc_rec',
        filterKeys: DOC_RECEIVING_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'doc_rec',
          widthStatus: -1200,
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: DOC_RECEIVING_MODULE,
      class: {
        grid: 'col-4 md:col-6 mb-2 lg:col-4 sm:col-12',
      },
    },
  },
  {
    label: 'Video Conferencing',
    reportKey: 'notaryVidConference',
    isLoading: true,
    role: ['Video Conferencing'],
    reportCharts: [
      {
        mainPath: 'toSchedDocsPerBrgy',
        chartKey: 'to_sched_docs',
        filterKeys: TO_SCHEDULE_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'No. of Documents per Brgy(To Schedule)',
          chartType: 'pie',
          chartKey: 'to_sched_docs',
          widthStatus: -800,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6',
        },
      },
      {
        mainPath: 'SchedDocsPerBrgy',
        chartKey: 'sched_docs',
        filterKeys: SCHEDULED_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'No. of Meetings per Brgy(Scheduled)',
          chartType: 'pie',
          chartKey: 'sched_docs',
          widthStatus: -800,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6',
        },
      },
    ],
    cardDetails: {
      config: VID_CONFERENCE_MODULE,
      class: {
        grid: 'col-12 md:col-6 mb-2 lg:col-4 sm:col-12',
      },
    },
  },
  {
    label: 'Document Releasing to Courier',
    reportKey: 'notaryDocReleasing',
    isLoading: true,
    role: ['Document Releasing to Courier'],
    reportCharts: [
      {
        chartKey: 'doc_releasing',
        filterKeys: DOC_RELEASING_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'doc_releasing',
          widthStatus: -1200,
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: DOC_RELEASING_MODULE,
      class: {
        grid: 'col-4 md:col-6 mb-2 lg:col-4 sm:col-12',
      },
    },
  },
  {
    label: 'Uploading of Documents',
    reportKey: 'notaryDocUploading',
    isLoading: true,
    role: ['Uploading of Notarized Document'],
    reportCharts: [
      {
        mainPath: 'totalDocsUploadPerBrgy',
        chartKey: 'doc_uploading',
        filterKeys: DOC_UPLOADING_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'No. of Documents for Uploading per Brgy',
          chartType: 'pie',
          chartKey: 'doc_uploading',
          widthStatus: -1600,
        },
        class: {
          chartGrid: 'col-12 md:col-12 mb-2 lg:col-12',
        },
      },
    ],
    cardDetails: {
      config: DOC_UPLOADING_MODULE,
      class: {
        grid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
      },
    },
  },
  {
    label: 'Transaction History',
    reportKey: 'notaryTransactionHistory',
    isLoading: true,
    role: ['Transaction History'],
    reportCharts: [
      {
        chartKey: 'transac_not_status',
        filterKeys: TRANSACTION_HISTORY_NOT_STATUS_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Notarization Status',
          chartType: 'pie',
          chartKey: 'transac_not_status',
          widthStatus: -400,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
        },
      },
      {
        chartKey: 'transac_uploaded',
        filterKeys: TRANSACTION_HISTORY_UPLOADED_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Uploaded Notarized Documents',
          chartType: 'pie',
          chartKey: 'transac_uploaded',
          widthStatus: -400,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
        },
      },
      {
        chartKey: 'transac_delayed',
        filterKeys: TRANSACTION_HISTORY_DELAYED_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Total Documents with Delayed Submission of Certificate',
          chartType: 'pie',
          chartKey: 'transac_delayed',
          widthStatus: -1800,
        },
        class: {
          chartGrid: 'col-12 md:col-12 mb-2 lg:col-12 sm:col-12',
        },
      },
    ],
    cardDetails: {
      config: TRANSAC_HISTORY_MODULE,
      class: {
        grid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
      },
    },
  },
  {
    label: 'Document Tracker',
    reportKey: 'notaryDocumentTracker',
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
          widthStatus: -1800,
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
  {
    label: 'Reports',
    reportKey: 'notaryReports',
    isLoading: true,
    role: ['Reports'],
    reportCharts: [
      {
        chartKey: 'new_type_reports',
        filterKeys: NEW_REPORT_TYPE_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'new_type_reports',
          widthStatus: -400,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
        },
      },
      {
        chartKey: 'type_reports',
        filterKeys: REPORT_TYPE_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'type_reports',
          widthStatus: -400,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
        },
      },
      {
        chartKey: 'new_status_reports',
        filterKeys: NEW_REPORT_STATUS_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Document Type',
          chartType: 'pie',
          chartKey: 'new_status_reports',
          widthStatus: -400,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
        },
      },
      {
        chartKey: 'status_reports',
        filterKeys: REPORT_STATUS_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Document Type',
          chartType: 'pie',
          chartKey: 'status_reports',
          widthStatus: -400,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
        },
      },
      {
        mainPath: 'totalDocsToday.byBarangay',
        chartKey: 'new_brgy_reports',
        filterKeys: NEW_REPORT_BRGY_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Barangays',
          chartType: 'pie',
          chartKey: 'new_brgy_reports',
          widthStatus: -400,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
        },
      },
      {
        mainPath: 'totalDocsToDate.byBarangay',
        chartKey: 'brgy_reports',
        filterKeys: REPORT_BRGY_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Barangays',
          chartType: 'pie',
          chartKey: 'brgy_reports',
          widthStatus: -400,
        },
        class: {
          chartGrid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
        },
      },
    ],

    cardDetails: {
      config: REPORTS_MODULE,
      class: {
        grid: 'col-6 md:col-6 mb-2 lg:col-6 sm:col-12',
      },
    },
  },
];
