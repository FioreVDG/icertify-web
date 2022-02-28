import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';
import FILETYPES from './file-extensions.json';
import VIDFILETYPES from './vid-file-extensions.json';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  uploading: boolean = false;
  acceptedDocs: string = '.png, .jpeg, .jpg, .pdf';
  acceptedVids: string = '.mp4';
  accepted: string = '';
  fileTypes: any;
  docFileTypes: any = FILETYPES;
  vidFileTypes: any = VIDFILETYPES;
  uploadedFile: string = '';
  filename: string = '';
  constructor(
    public sb: MatSnackBar,
    public dbx: DropboxService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.fileTypes =
      this.data.format === 'VIDEO' ? this.vidFileTypes : this.docFileTypes;
    this.accepted =
      this.data.format === 'VIDEO' ? this.acceptedVids : this.acceptedDocs;
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    let acceptableLength: any;

    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {
          var flag = false;

          this.accepted.split(',').forEach((a) => {
            console.log(a);
            if (file.type === this.fileTypes[a.trim()]) flag = true;
          });
          if (flag) {
            if (this.data.format === 'VIDEO') this.getVideoLength(file);
            else this.save(file);
          } else {
            console.log(file);
            this.sb.open('Incorrect Format!', 'Okay', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
              panelClass: ['failed'],
            });
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    // console.log(event);
  }

  public fileLeave(event: any) {
    // console.log(event);
  }
  formatName() {
    let formattedName = '';
    let fullName =
      this.data.formatData.firstName + '_' + this.data.formatData.lastName;
    let date = new Date().toISOString().replace(/T.*/, '').split('-').join('-');
    let time = Date.now();

    formattedName =
      fullName +
      '_' +
      this.data.formatData.curDocType +
      '_' +
      date +
      '_' +
      time;
    return formattedName;
  }

  save(file: any) {
    console.log(file);
    this.uploading = true;
    let fileNameArray = file.name.split('.');
    let path: any = this.data.path ? this.data.path : 'INDIGENT/';
    let mobilenum: any = this.data.mobileNumber ? this.data.mobileNumber : '';
    let filename: any = this.data.name ? this.data.name : fileNameArray[0];
    console.log(fileNameArray);
    console.log(filename);

    if (this.data) {
      if (this.data.formatName && this.data.formatData) {
        filename = this.formatName();
      }
    }

    this.dbx
      .uploadFile(
        '/' + 'ICertify' + '/' + path + mobilenum + '/',
        filename + '.' + fileNameArray[fileNameArray.length - 1],
        file
      )
      .subscribe(
        (resp: any) => {
          console.log(resp);
          setTimeout(() => {
            this.uploadedFile = resp;
            this.uploading = false;
          }, 1500);
          this.sb.open('File Successfully Uploaded!', undefined, {
            panelClass: ['success'],
            duration: 1500,
          });
          this.dialogRef.close(resp);
        },
        (err: any) => {
          console.log(err);
          setTimeout(() => {
            this.uploading = false;
          }, 1500);
          this.sb.open('Failed to Upload File.', undefined, {
            panelClass: ['failed'],
            duration: 1500,
          });
        }
      );
  }
  getVideoLength(file: any) {
    var video = document.createElement('video');
    video.preload = 'metadata';
    const getDuration = () =>
      new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video.duration);
        };
      });
    video.src = URL.createObjectURL(file);
    getDuration().then((l: any) => {
      console.log(l);
      if (l <= 61) {
        this.save(file);
      } else
        this.sb.open('Video length should be less than a minute', 'Okay', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['failed'],
        });
    });
  }
}
