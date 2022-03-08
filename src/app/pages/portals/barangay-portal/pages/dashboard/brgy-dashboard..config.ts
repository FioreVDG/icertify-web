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

export const DASHBOARD_CONFIG = [{}];

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
  },
  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
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
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.y:.0f}',
      },
      showInLegend: true,
    },
  },
  series: [
    {
      name: 'Brands',
      colorByPoint: true,
      innerSize: '30%',
      size: '110%',
      data: [],
    },
  ],
};
