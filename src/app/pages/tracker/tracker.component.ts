import { DocumentLogsViewerComponent } from './../../shared/components/document-logs-viewer/document-logs-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  loading = false;
  ngOnInit(): void {}
  search() {
    let el = document.getElementById('input-area');
    el?.classList.remove('input');
    el?.classList.add('input1');
    let el1 = document.getElementById('search-btn');
    el1?.classList.add('search-btn');

    let qry = {
      find: [
        {
          field: 'docDetails.refCode',
          value: this.keyword.toUpperCase(),
          operator: '=',
        },
      ],
    };
    let qry2 = {
      find: [
        {
          field: 'refCode',
          operator: '=',
          value: this.keyword.toUpperCase(),
        },
      ],
    };
    setTimeout(() => {
      this.loading = true;

      this.api.document.getAll(qry2).subscribe((res: any) => {
        console.log(res);
        if (res.env.documents.length) {
          this.data = res.env.documents[0];
          this.api.documentlogs.getDocumentLogs(qry).subscribe((res: any) => {
            console.log(res);
            this.data['documentLogs'] = res.env.documentLogs;
            setTimeout(() => {
              this.loading = false;
              // this.router.navigate(['/tracker'], {
              //   queryParams: { refCode: this.keyword },
              // });
            }, 3000);
          });
        } else {
          this.router.navigate(['/404']);
        }
      });
    }, 2000);
  }
  openDocLogsViewer() {
    this.dialog.open(DocumentLogsViewerComponent, {
      data: {
        obj: this.data,
        header: 'Barangay',
      },
    });
  }
}
