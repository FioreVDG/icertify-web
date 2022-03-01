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
  testtt = 2;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewAttachmentsComponent>,
    private dbx: DropboxService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.documents) this.fetchAttachments(this.data.documents, 0);
    else {
      this.files.push({
        data: this.data.obj,
        name: this.data.obj.documentName,
        link: this.data.link,
        isImage: this.data.isImg,
        loaded: false,
      });
      setTimeout(() => {
        this.loading = false;
        this.util.stopLoading(this.loader);
      }, 1000);
    }
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
        let fileLink = res.result.link;
        let notarizedFile = {};
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

        if (doc[index].notarizedDocument) {
          // console.log(doc[index].notarizedDocument);
          this.dbx
            .getTempLink(doc[index].notarizedDocument.dropbox.path_display)
            .subscribe((res: any) => {
              let notarizedFileType = res.result.metadata.name.split('.');
              notarizedFileType =
                notarizedFileType[notarizedFileType.length - 1].toLowerCase();
              let link = res.result.link;

              notarizedFile = {
                link,
                isImage: notarizedFileType === 'pdf' ? false : true,
              };

              this.files.push({
                data: doc[index],
                name: fileName,
                link: fileLink,
                isImage: notarizedFileType === 'pdf' ? false : true,
                loaded: false,
                screenshot,
                notarizedFile,
              });
              if (this.data.documents.length - 1 === index) {
                this.loading = false;
                this.util.stopLoading(this.loader);
                console.log(this.files);
              } else {
                this.fetchAttachments(this.data.documents, index + 1);
              }
            });
        } else {
          this.files.push({
            data: doc[index],
            name: fileName,
            link: fileLink,
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
