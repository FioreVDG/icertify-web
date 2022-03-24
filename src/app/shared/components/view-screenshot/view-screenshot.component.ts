import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { PdfService } from 'src/app/service/pdf/pdf.service';
import { UtilService } from 'src/app/service/util/util.service';

@Component({
  selector: 'app-view-screenshot',
  templateUrl: './view-screenshot.component.html',
  styleUrls: ['./view-screenshot.component.scss'],
})
export class ViewScreenshotComponent implements OnInit {
  loading = false;
  screenShots: Array<any> = [];
  me: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewScreenshotComponent>,
    private dbx: DropboxService,
    private util: UtilService,
    private pdf: PdfService,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.store.select('user').subscribe((res: User) => {
      this.me = res;
      console.log(res);
      // this.fetchData(this.page);
    });
    this.fetchSSImages(this.data.document.screenShots);
  }

  fetchSSImages(screenshots: Array<any>) {
    for (let s of screenshots) {
      this.dbx.getTempLink(s.path_display).subscribe((res: any) => {
        console.log(res);
        this.screenShots.push({
          link: res.result.link,
          loading: true,
        });
      });
    }
  }

  checkLoader(event: any, index: any) {
    console.log(event, index);
    this.screenShots[index].loading = false;
  }
  downloadSS(data: any) {
    console.log(data);
    let event = this.pdf.generateScreenShotPDF(data);
    console.log(event);
    if (event) {
      this.loading = false;
    }
  }
}
