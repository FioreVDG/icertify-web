export interface MODULE_REPORTS {
  label: string;
  reportKey: DASHBOARD_SERVICE;
  cardDetails?: CARD_DETAILS;
  reportCharts: REPORT_AND_CHARTS[];
  isLoading: boolean;
  role: string[];
}

export type DASHBOARD_SERVICE =
  | 'registration'
  | 'registrantDb'
  | 'newTransaction'
  | 'docReceiving'
  | 'batchDelivery'
  | 'vidConference'
  | 'docReceivingNotary'
  | 'docReleasing'
  | 'transactionHistory'
  | 'documentTracker'
  | 'notaryDocReceiving'
  | 'notaryVidConference'
  | 'notaryDocReleasing'
  | 'notaryDocUploading'
  | 'notaryTransactionHistory'
  | 'notaryDocumentTracker';

export interface MODULE_CONFIG {
  label: string;
  key: string;
  icon?: string;
}

interface CARD_DETAILS {
  config: MODULE_CONFIG[];
  allowedKey?: string[];
  class?: {
    [key: string]: string;
  };
}
interface REPORT_AND_CHARTS {
  chartKey: string;
  filterKeys: FILTER_KEYS[];
  chartOptions: CHART_OPTIONS;
  class?: {
    [key: string]: string;
  };
}
export interface FILTER_KEYS {
  id: string;
  ifValue?: string;
  label: string;
}
export interface CHART_OPTIONS {
  widthStatus?: number;
  chartOption: any;
  xAxisTitle: string;
  yAxisTitle?: string;
  chartKey?: string;
  chartType: 'column' | 'pie';
}
