import { QueryParams } from 'src/app/models/queryparams.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-logs-viewer',
  templateUrl: './document-logs-viewer.component.html',
  styleUrls: ['./document-logs-viewer.component.scss'],
})
export class DocumentLogsViewerComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DocumentLogsViewerComponent>,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    let query: QueryParams = {
      find: [
        {
          field: 'docDetails.refCode',
          operator: '=',
          value: this.data._documents[0].refCode,
        },
      ],
    };
    console.log(query);
    this.api.documentlogs.getDocumentLogs(query).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
