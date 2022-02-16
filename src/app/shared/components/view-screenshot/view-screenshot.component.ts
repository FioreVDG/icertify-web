import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { UtilService } from 'src/app/service/util/util.service';

@Component({
  selector: 'app-view-screenshot',
  templateUrl: './view-screenshot.component.html',
  styleUrls: ['./view-screenshot.component.scss'],
})
export class ViewScreenshotComponent implements OnInit {
  loading: boolean = false;
  loader = this.util.startLoading('Loading...');
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewScreenshotComponent>,
    private dbx: DropboxService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    setTimeout(() => {
      this.loading = false;
      this.util.stopLoading(this.loader);
    }, 1000);
  }
}
