import { QueryParams } from './../../../../../models/queryparams.interface';
import { ApiService } from './../../../../../service/api/api.service';
import { Component, OnInit } from '@angular/core';
import { REPORT_TABLE_FORMATS } from './config';
import { Column } from 'src/app/models/column.interface';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  tabs = ['Notary', 'Barangay', 'Rider'];
  currentTab = 'Notary';
  currentUser: any = {};
  currentSLA: any = {};
  users: Array<any> = [];
  loadingChanges = false;
  slas: Array<any> = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getUser();
  }

  changeTab(tabName: string) {
    this.currentTab = tabName;
    this.getUser();
  }

  getUser() {
    this.users = [];
    this.loadingChanges = true;
    this.api.user
      .getAllUser({
        find: [
          {
            field: 'type',
            operator: '=',
            value: this.currentTab,
          },
          {
            field: 'isMain',
            operator: '=',
            value: true,
          },
        ],
      })
      .subscribe((res: any) => {
        console.log(res);
        this.users = res.env.users;
        this.loadingChanges = false;
      });
  }

  getSLA() {
    var query: QueryParams = {
      find: [
        {
          field: 'type',
          operator: '=',
          value: this.currentTab,
        },
        {
          field: '_userId',
          operator: '=',
          value: this.currentUser._id,
        },
      ],
    };

    this.api.sla.getAll(query).subscribe((res: any) => {
      console.log(res.env);
      this.slas = res.env.slas.length ? res.env.slas[0].agreements : [];
      console.log(this.slas);
      this.slas.forEach((sla) => {
        this.generateReports(sla);
      });
    });

    setTimeout(() => {
      console.log(this.slas);
    }, 5000);
  }

  generateReports(sla: any) {
    console.log(sla);
    // ts alias for timestart
    // te alias for timeend
    var tsSplitted = sla.time.start.split(':');
    var teSplitted = sla.time.end.split(':');

    var timestart = parseFloat(tsSplitted[0]) + tsSplitted[1] / 60;
    var timeend = parseFloat(teSplitted[0]) + teSplitted[1] / 60;

    var query: Array<any> = [
      {
        $match: {
          _notaryId: {
            _parseId: this.currentUser._id,
          },
        },
      },
      {
        $project: {
          hour: {
            $add: [
              {
                $hour: {
                  date: '$' + sla.path,
                  timezone: 'Asia/Singapore',
                },
              },
              {
                $divide: [
                  {
                    $minute: {
                      date: '$' + sla.path,
                      timezone: 'Asia/Singapore',
                    },
                  },
                  60,
                ],
              },
            ],
          },
        },
      },
      {
        $match: {
          $or: [
            {
              hour: {
                $lt: timestart,
              },
            },
            {
              hour: {
                $gt: timeend,
              },
            },
          ],
        },
      },
    ];
    sla['columns'] = REPORT_TABLE_FORMATS.find(
      (o) => o.collection === sla.collectionName
    )?.columns;
    sla.columns.forEach((c: Column) => {
      query[1].$project[c.path] = 1;
    });

    sla['loading'] = true;
    this.api.report.generateQuery(query, sla.collectionName).subscribe(
      (res: any) => {
        console.log(res);
        sla['penalties'] = res.result;
        sla['loading'] = false;
      },
      (err) => {
        console.log(err);
        sla['penalties'] = [];
        sla['error'] = err.error.message;
        sla['loading'] = false;
      }
    );
  }
}
