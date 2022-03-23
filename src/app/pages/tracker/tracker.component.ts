import { ApiService } from 'src/app/service/api/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  keyword = '';
  searchClass = 'search-icon';
  data: any;
  constructor(private fb: FormBuilder, private api: ApiService) {}

  loading = false;
  ngOnInit(): void {}
  search() {
    let el = document.getElementById('input-area');
    el?.classList.remove('input');
    el?.classList.add('input1');

    let qry = {
      find: [
        {
          field: 'docDetails.refCode',
          value: this.keyword.toUpperCase(),
          operator: '=',
        },
      ],
    };
    setTimeout(() => {
      this.loading = true;
      this.api.documentlogs.getDocumentLogs(qry).subscribe((res: any) => {
        console.log(res);
        setTimeout(() => {
          this.data = res.env.documentLogs;

          this.loading = false;
        }, 3000);
      });
    }, 2000);
  }
}
