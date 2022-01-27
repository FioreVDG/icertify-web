import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import { UtilService } from 'src/app/service/util/util.service';

@Component({
  selector: 'app-view-attachments',
  templateUrl: './view-attachments.component.html',
  styleUrls: ['./view-attachments.component.scss'],
})
export class ViewAttachmentsComponent implements OnInit {
  loading: boolean = false;
  files: any[] = [];
  loader = this.util.startLoading('Loading...');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewAttachmentsComponent>,
    private dbx: DropboxService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.fetchAttachments(this.data.documents, 0);
  }

  downloadFile() {
    window.open(this.data.link, '_blank');
  }
  fileLoaded(index: number) {
    this.files[index].loaded = true;
  }
  viewScreenshot(item: any) {
    console.log(item);
  }
  fetchAttachments(doc: any, index: number) {
    this.loading = true;

    this.dbx.getTempLink(doc[index].dropbox.path_display).subscribe(
      (res: any) => {
        let fileType = res.result.metadata.name.split('.');
        let fileName = fileType.slice(0, -1).join(' ');
        fileType = fileType[fileType.length - 1].toLowerCase();
        let screenshot: any = [];
        if (doc[index].screenShots.length) {
          doc[index].screenShots.forEach((s: any, index: any) => {
            this.dbx.getTempLink(s.path_display).subscribe((res: any) => {
              screenshot.push({
                link: res.result.link,
                name: `screenshot` + index + 1,
              });
            });
          });
        }
        this.files.push({
          data: doc[index],
          name: fileName,
          link: res.result.link,
          isImage: fileType === 'pdf' ? false : true,
          loaded: false,
          screenshot,
        });

        if (this.data.documents.length - 1 === index) {
          this.loading = false;
          this.util.stopLoading(this.loader);
          console.log(this.files);
        } else {
          this.fetchAttachments(this.data.documents, index + 1);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openNewWindow(link: string) {
    let url = link;
    let img = '<img style="height:100vh;width:100vw" src="' + url + '">';
    let popup = window.open();
    popup?.document.write(img);
    // popup?.print();
  }
}
