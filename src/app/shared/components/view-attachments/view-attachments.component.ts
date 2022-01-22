import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-attachments',
  templateUrl: './view-attachments.component.html',
  styleUrls: ['./view-attachments.component.scss'],
})
export class ViewAttachmentsComponent implements OnInit {
  loading: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewAttachmentsComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  onFileLoad() {
    this.loading = false;
  }
  downloadFile() {
    window.open(this.data.link, '_blank');
  }
}
