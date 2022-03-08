import { ApiService } from 'src/app/service/api/api.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  me: any;
  dashboardConfig: any;

  constructor(private api: ApiService, private store: Store<{ user: User }>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
    });
    this.getReports();
  }

  getReports() {}
}
