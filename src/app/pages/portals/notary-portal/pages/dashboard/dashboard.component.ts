import { Component, OnInit } from '@angular/core';
import { UtilService } from './../../../../../service/util/util.service';
import {
  CHART_OPTIONS,
  FILTER_KEYS,
  MODULE_REPORTS,
} from './../../../../../models/reports.interface';
import { DASHBOARD_CONFIG } from './notary-dashboard.config';
import { ApiService } from 'src/app/service/api/api.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  me: any;
  highcharts: any = Highcharts;
  dashboardConfig: Array<MODULE_REPORTS> = [];
  reports: any = {};
  chartReports: any = {};
  fetchCount = 0;
  myAccess: string[] = [];
  constructor(
    private api: ApiService,
    private store: Store<{ user: User }>,
    public util: UtilService
  ) {}
  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      // console.log(res);
      this.getRoles(
        this.me._role && this.me._role.access ? this.me._role.access : []
      );
      this.dashboardConfig = JSON.parse(JSON.stringify(DASHBOARD_CONFIG));
    });

    setTimeout(() => {
      this.getReports();
    }, 3000 * this.fetchCount);
  }

  getReports() {
    for (const report of this.dashboardConfig) {
      report.isLoading = true;
      // console.log(typeof report.reportKey);
      this.api.dashboard[report.reportKey]().subscribe((res: any) => {
        // console.log(res);
        this.reports[report.reportKey] = res.env;
        for (let data of report.reportCharts) {
          const filteredKeys: FILTER_KEYS[] = data.filterKeys;

          const chartOption: CHART_OPTIONS = data.chartOptions;

          this.generateChartData(report.reportKey, filteredKeys, chartOption);
          report.isLoading = false;
        }
      });
    }
    // console.log(this.reports);
  }
  getRoles(access: any[]) {
    for (const role of access) {
      if (role.hasAccess && !role.children) this.myAccess.push(role.label);

      if (role.hasAccess && role.children) {
        for (let childRole of role.children) {
          if (childRole.hasAccess) this.myAccess.push(childRole.label);
        }
      }
    }

    // console.log(this.myAccess);
  }

  generateChartData(
    userReportKey: string,
    filterKeys: FILTER_KEYS[],
    chartOptions: CHART_OPTIONS
  ) {
    const columnData: any[] = [];
    const currentUserReport = this.reports[userReportKey];

    // calculate totalValue for percentage and ready data for chart

    // console.log(filterKeys);
    let totalValue = 0;
    let dispValue: string = '';
    filterKeys.forEach((itm) => {
      totalValue += +this.util.deepFind(currentUserReport, itm.id);
      if (this.util.deepFind(currentUserReport, itm.id)) {
        if (chartOptions.chartType === 'pie') {
          if (!columnData.length)
            columnData.push({
              name: itm.label,
              y: this.util.deepFind(currentUserReport, itm.id) || 0,
              // sliced: true,
              // selected: true,
            });
          else
            columnData.push({
              name: itm.label,
              y: this.util.deepFind(currentUserReport, itm.id) || 0,
            });
        } else
          columnData.push({
            name: itm.label,
            y: this.util.deepFind(currentUserReport, itm.id) || 0,
          });
      }
    });
    // if (foundKey) {
    //   totalValue += currentUserReport[key].count;

    // }

    // // Add percentage per column
    // for (let data of columnData) {
    //   if (totalValue <= 0) data.percentage = 0;
    //   else data.percentage = +((data.y / totalValue) * 100).toFixed(2);
    // }

    // Plot Chart Data
    const key = chartOptions.chartKey ? chartOptions.chartKey : userReportKey;
    // console.log(chartOptions.widthStatus);

    //Format TotalValue

    if (totalValue.toString().length >= 4 && totalValue.toString().length < 7)
      dispValue = (totalValue *= 0.001).toFixed(2).toString() + 'k';
    if (totalValue.toString().length >= 7)
      dispValue = (totalValue *= 0.000001).toFixed(2).toString() + 'm';

    chartOptions.chartOption.title.text = `${
      chartOptions.xAxisTitle
    }<br><b style="font-size:28px">${
      dispValue.length ? dispValue : totalValue
    }</b>`;
    chartOptions.chartOption.title.widthAdjust =
      chartOptions.widthStatus || -400;

    if (chartOptions.chartType === 'column')
      chartOptions.chartOption.yAxis.title.text = chartOptions.yAxisTitle || '';
    chartOptions.chartOption.series[0].name = chartOptions.xAxisTitle;
    chartOptions.chartOption.series[0].data = columnData;
    chartOptions.chartOption.series[0].colors = [
      '#9945ff',
      '#6323b0',
      '#1967d2',
      '#4d6db7',
      '#e9eefa',
    ];

    this.chartReports[key] = chartOptions.chartOption;
    // console.log(this.chartReports);
    this.fetchCount++;
  }
  checkRole(roles: string[] | undefined) {
    let haveAccess = true;

    if (Array.isArray(roles)) {
      if (!roles.length) return true;

      for (let role of roles) {
        if (!this.myAccess.includes(role)) {
          return false;
        }
      }
    } else return false;

    return haveAccess;
  }
}
