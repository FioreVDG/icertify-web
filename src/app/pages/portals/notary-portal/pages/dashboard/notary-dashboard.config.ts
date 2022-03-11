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
          widthStatus: -550,
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
          widthStatus: -550,
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
];
