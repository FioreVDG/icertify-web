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
    isLoading: false,
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
    isLoading: false,
    role: ['Video Conferencing'],
    reportCharts: [
      {
        mainPath: 'SchedDocsPerBrgy',
        chartKey: 'sched_docs',
        filterKeys: TO_SCHEDULE_FILTER_KEYS,
        chartOptions: {
          chartOption: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
          xAxisTitle: 'Status',
          chartType: 'pie',
          chartKey: 'sched_docs',
          widthStatus: -1200,
        },
        class: {
          chartGrid: 'col-12 md:col-6 mb-2 lg:col-12',
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
];
