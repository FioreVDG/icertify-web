import { UploadComponent } from './../upload/upload.component';
import { IMAGE_FORM } from './enum';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DropboxService } from 'src/app/service/dropbox/dropbox.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
})
export class ImageFormComponent implements OnInit {
  images = IMAGE_FORM;
  @Output() imageEmitter = new EventEmitter<any>();
  @Input() obj: any = {};
  @Input() mobileNumber: string = '';
  @Input() disable: any;
  imgArray: Array<any> = [];
  me: any;
  imageForm = this.fb.group({});
  loadingImage: boolean = false;
  constructor(
    public dialog: MatDialog,
    public dbx: DropboxService,
    public auth: AuthService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    // if (this.obj !== null)
    await this.getImage();
  }

  getImage() {
    //Not yet final
    console.log(this.obj);
    this.loadingImage = true;
    let temp: any = {};
    let tempImg: any;

    this.images.forEach((img) => {
      img.fields.forEach(async (field: any) => {
        console.log(field.visible);
        temp[field.fcname] = new FormControl(
          this.obj && this.obj[field.fcname] ? this.obj[field.fcname] : '',
          [Validators.required]
        );
        // console.log(this.obj[field.fcname]);

        tempImg =
          this.obj && this.obj[field.fcname]
            ? await this.getTempLink(this.obj[field.fcname]['path_display'])
            : '';

        console.log(tempImg);
        this.imgArray.push({
          visible: field.visible,
          fcname: field.fcname,
          label: field.label,
          hasError: this.disable ? false : field.hasError,
          imgLink: tempImg ? tempImg : '',
          disable: this.disable,
        });

        // console.log(this.obj[field.fcname]['path_display']);
        console.log(this.imgArray);
      });
      console.log(temp);
      this.imageForm = this.fb.group(temp);
    });
    this.loadingImage = false;
    this.imageEmitter.emit({
      obj: this.imageForm.getRawValue(),
      formValid: this.imageForm.valid,
      formDirty: this.imageForm.dirty,
    });
  }

  uploadImage(fcname: string) {
    this.dialog
      .open(UploadComponent, {
        panelClass: 'dialog-darken',
        data: {
          name: fcname,
          path: 'INDIGENT/',
          mobileNumber: this.mobileNumber,
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          console.log(this.imgArray);
          console.log(this.imageForm);
          this.imgArray.forEach(async (img: any) => {
            if (fcname === img.fcname) {
              img.imgLink = await this.getTempLink(res.result.path_display);
              img.hasError = false;
              console.log(img.imgLink);
            }
          });

          this.obj[fcname] = res.result;
          console.log(this.obj);

          this.imageForm.get(fcname)?.setValue(res.result);
          console.log(this.imageForm.get(fcname));
          this.imageForm.markAsDirty();
          this.imageEmitter.emit({
            images: this.imageForm.getRawValue(),
            formValid: this.imageForm.valid,
            formDirty: this.imageForm.dirty,
          });
          console.log(this.imageForm);
        }
      });
  }

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    console.log(response);
    return response.result.link;
  }
}
