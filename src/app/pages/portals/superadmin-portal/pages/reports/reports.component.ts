import { QueryParams } from './../../../../../models/queryparams.interface';
import { ApiService } from './../../../../../service/api/api.service';
import { Component, OnInit } from '@angular/core';

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
    });
  }

  generateReports() {
    console.log(this.currentSLA);
    var query: Array<any> = [
      {
        $match: {
          _notaryId: {
            _parseId: this.currentUser._id,
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: {
                date: '$' + this.currentSLA.path,
                timezone: 'Asia/Singapore',
              },
            },
            day: {
              $dayOfMonth: {
                date: '$' + this.currentSLA.path,
                timezone: 'Asia/Singapore',
              },
            },
            year: {
              $year: {
                date: '$' + this.currentSLA.path,
                timezone: 'Asia/Singapore',
              },
            },
            hour: {
              $hour: {
                date: '$' + this.currentSLA.path,
                timezone: 'Asia/Singapore',
              },
            },
            minutes: {
              $minute: {
                date: '$' + this.currentSLA.path,
                timezone: 'Asia/Singapore',
              },
            },
          },
          total: { $sum: 1 },
        },
      },
    ];
    this.api.report
      .generateQuery(query, this.currentSLA.collectionName)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
