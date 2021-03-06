import { QueryParams } from 'src/app/models/queryparams.interface';
import { ApiService } from 'src/app/service/api/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FIND_NOTARY_ONLY } from './doc-viewer-logs.config';

@Component({
  selector: 'app-document-logs-viewer',
  templateUrl: './document-logs-viewer.component.html',
  styleUrls: ['./document-logs-viewer.component.scss'],
})
export class DocumentLogsViewerComponent implements OnInit {
  @Input() public obj: any;
  documentLogs: Array<any> = [];
  filteredFinal: any;
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DocumentLogsViewerComponent>,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.initializeInfo();
  }

  initializeInfo() {
    let query: QueryParams = {
      find: [
        {
          field: 'docDetails.refCode',
          operator: '=',
          value: this.data.obj.refCode,
        },
      ],
      populates: [
        {
          field: '_createdBy',
        },
      ],
    };
    let query2: QueryParams = {
      find: [
        {
          field: 'docDetails.refCode',
          operator: '=',
          value: this.data.obj.refCode,
        },
        {
          field: 'message',
          operator: '[in]=',
          value:
            'Received by Notarial Staff,Video Conference Scheduled by Notarial Staff,Marked as Notarized,Marked as Unnotarized,Marked as Enroute to Brgy Hall by Notarial Staff,Document Received from Notary by Brgy Hall Staff,Document Released to Indigent by Brgy Hall Staff',
        },
      ],
      populates: [
        {
          field: '_createdBy',
        },
      ],
    };
    console.log(query);
    let finalQuery: any;
    this.loading = true;
    finalQuery = this.data.header === 'NOTARY' ? query2 : query;
    this.api.documentlogs.getDocumentLogs(finalQuery).subscribe(
      (res: any) => {
        this.documentLogs = res.env.documentLogs;
        this.loading = false;
        console.log(this.documentLogs);
        this.filteredFinal = this.documentLogs.find(
          (o: any) =>
            o.message === 'Document Released to Indigent by Brgy Hall Staff'
        );
        if (this.filteredFinal) {
          console.log(this.filteredFinal);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
