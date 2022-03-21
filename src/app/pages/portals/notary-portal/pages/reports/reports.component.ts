import { UtilService } from './../../../../../service/util/util.service';
import { ApiService } from './../../../../../service/api/api.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FILTERS, CHART } from './config';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { MODULE_REPORTS } from 'src/app/models/reports.interface';
import * as Highcharts from 'highcharts';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  generated: boolean = false;
  highcharts: any = Highcharts;
  chartReports: any = {};
  chart = CHART;
  config = JSON.parse(JSON.stringify(FILTERS));
  reportConfig: Array<MODULE_REPORTS> = [];
  me: any;
  cluster: any;
  dateRange = this.fb.group({
    dateStart: new FormControl(''),
    dateEnd: new FormControl(''),
  });
  filter = this.fb.group({
    barangay: new FormControl(''),
    documentType: new FormControl(''),
    status: new FormControl(''),
  });

  reports: any;

  constructor(
    public fb: FormBuilder,
    private api: ApiService,
    private store: Store<{ user: User }>,
    public util: UtilService
  ) {
    this.store.select('user').subscribe((me) => {
      this.me = me;
      this.api.cluster.getOneNotary(this.me._notaryId).subscribe((res: any) => {
        this.cluster = res.env.cluster;
        this.getBarangaysItem();
        this.search();
      });
    });
  }

  ngOnInit(): void {}
  search() {
    this.generated = false;
    this.reports = null;
    let dispValue: string = '';

    let query = { ...this.dateRange.getRawValue(), ...this.filter.value };
    let qryString = '?';
    let array = [];
    for (let [key, value] of Object.entries(query)) {
      console.log(value, key);
      if ((value && value !== 'All') || value !== '' || value !== null) {
        array.push(key + '=' + value);
      }
    }
    qryString += array.join('&');
    console.log(qryString);
    this.api.report.generateNotaryReport(qryString).subscribe((res: any) => {
      this.reports = res;
      console.log(this.reports);
      this.chart.forEach((itm: any) => {
        itm.isLoading = true;
        if (itm.mainPath) {
          itm.chartOpt.filterKeys = [];
          this.brgyDesc.forEach((brgy: any) => {
            itm.chartOpt.filterKeys.push({
              label: brgy,
              key:
                'perBrgy.' +
                brgy.split(' ').join('_').replace('.', '').toLowerCase(),
            });
          });
        }
        console.log(itm.chartOpt.filterKeys);
        const columnData: any[] = [];
        if (itm.chartOpt.chartKey === itm.chartKey) {
          itm.chartOpt.filterKeys.forEach((id: any) => {
            if (itm.chartOpt.chartOptions.chartType === 'pie') {
              if (!columnData.length)
                columnData.push({
                  name: id.label,
                  y: this.util.deepFind(this.reports, id.key) || 0,
                  // sliced: true,
                  // selected: true,
                });
              else
                columnData.push({
                  name: id.label,
                  y: this.util.deepFind(this.reports, id.key) || 0,
                });
            } else
              columnData.push({
                name: id.label,
                y: this.util.deepFind(this.reports, id.key) || 0,
              });
          });
        }
        if (
          this.reports.totalDocuments.toString().length >= 4 &&
          this.reports.totalDocuments.toString().length < 7
        )
          dispValue =
            (this.reports.totalDocuments *= 0.001).toFixed(2).toString() + 'k';
        if (this.reports.totalDocuments.toString().length >= 7)
          dispValue =
            (this.reports.totalDocuments *= 0.000001).toFixed(2).toString() +
            'm';

        itm.chartOpt.chartOptions.title.text = `${
          itm.chartOpt.title
        }<br><b style="font-size:28px">${
          dispValue.length ? dispValue : this.reports.totalDocuments
        }</b>`;
        itm.chartOpt.chartOptions.title.y = itm.chartOpt.y ? itm.chartOpt.y : 0;

        itm.chartOpt.chartOptions.series[0].name = itm.chartOpt.title;
        itm.chartOpt.chartOptions.series[0].data = columnData;
        itm.chartOpt.chartOptions.series[0].colors = [
          '#9945ff',
          '#6323b0',
          '#1967d2',
          '#4d6db7',
          '#e9eefa',
        ];
        this.chartReports[itm.chartKey] = itm.chartOpt.chartOptions;
        itm.isLoading = false;
      });

      this.generated = true;
    });
  }
  brgyDesc: any = [];
  getBarangaysItem() {
    this.config.forEach((itm: any) => {
      if (itm.key === 'barangay') {
        this.cluster.barangays.forEach((c: any) => {
          this.brgyDesc.push(c._barangay.brgyDesc);
          itm.choices.push({
            label: c._barangay.brgyDesc,
            value: c._barangay.brgyCode,
          });
        });
      }
    });
  }
  onchange(event: any) {
    console.log(event);
  }
  clear() {
    this.dateRange.reset({
      dateStart: '',
      dateEnd: '',
    });
    this.filter.reset({
      documentType: '',
      status: '',
      barangay: '',
    });
  }
}
