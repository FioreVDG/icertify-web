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
    y: -40,
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
export const FILTERS: Array<FILTERBUTTON> = [
  {
    isLoading: true,
    placeholder: 'Document Type',
    key: 'documentType',
    choices: [
      'Special Power of Attorney (SPA)',
      'Affidavit',
      'Brgy. Compromise Agreement',
      'Quitclaim',
      'Others',
    ],
  },
  {
    isLoading: true,
    placeholder: 'Status',
    key: 'status',
    choices: ['All', 'Notarized', 'Unnotarized'],
  },
  {
    isLoading: true,
    placeholder: 'Barangays',
    key: 'barangay',
    choices: [{ label: 'All', value: 'All' }],
  },
];
export interface FILTERBUTTON {
  placeholder: string;
  isLoading: boolean;
  key: string;
  choices: Array<any>;
  chartOpt?: object;
}
export const CHART = [
  {
    show: true,
    isLoading: true,
    chartKey: 'perType',
    chartOpt: {
      chartKey: 'perType',
      title: 'Document Type',
      y: -30,
      class: 'col-6 mb-2 md:col-6 sm:col-12 lg:col-6',
      chartOptions: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),

      filterKeys: [
        {
          label: 'Special Power of Attorney (SPA)',
          key: 'perTypes.specialPowerOfAttorney',
        },
        {
          label: 'Affidavit',
          key: 'perTypes.affidavit',
        },
        {
          label: 'Brgy. Compromise Agreement',
          key: 'perTypes.brgyCompAgreement',
        },
        {
          label: 'Quitclaim',
          key: 'perTypes.quitclaim',
        },
        {
          label: 'Others',
          key: 'perTypes.others',
        },
      ],
    },
  },
  {
    show: true,
    isLoading: true,
    chartKey: 'perStatus',
    chartOpt: {
      chartKey: 'perStatus',
      title: 'Status',
      class: 'col-6 mb-2 md:col-6 sm:col-12 lg:col-6',
      chartOptions: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),
      filterKeys: [
        {
          label: 'Unnotarized',
          key: 'perStatus.unnotarized',
        },
        {
          label: 'Notarized',
          key: 'perStatus.notarized',
        },
      ],
    },
  },
  {
    show: true,
    isLoading: true,
    chartKey: 'perBrgy',
    mainPath: 'perBrgy',
    chartOpt: {
      chartKey: 'perBrgy',
      title: 'Barangays',
      class: 'col-12 mb-2',
      chartOptions: JSON.parse(JSON.stringify(PIE_CHART_OPTIONS)),

      filterKeys: [],
    },
  },
];
