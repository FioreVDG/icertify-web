import { UploadComponent } from './../upload/upload.component';
import { IMAGE_FORM, CHOICES } from './enum';
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
  choices = CHOICES;
  reason: string = '';
  reasons = [
    'Barangay Chairman/Captain/Officer-in-Charge of signing is not present to sign the certificate.',
    'Complete requirements to get the certificate are yet to be submitted by the registrant.',
  ];
  selectedChoice: string = '';
  @Output() imageEmitter = new EventEmitter<any>();
  @Input() obj: any = {};
  @Input() mobileNumber: string = '';
  @Input() disable: any;
  @Input() reasonVal: string = '';
  imgArray: Array<any> = [];
  me: any;
  imageForm = this.fb.group({});
  loadingImage: boolean = false;
  certificateOfIndigencyExist: boolean = false;
  constructor(
    public dialog: MatDialog,
    public dbx: DropboxService,
    public auth: AuthService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    await this.getImage();
    if (this.reasonVal !== '') {
      this.reason = this.reasonVal;
      this.selectedChoice = 'no';
    }
  }

  getImage() {
    console.log(this.obj);
    this.loadingImage = true;
    let temp: any = {};
    let tempImg: any;

    this.images.forEach((img) => {
      img.fields.forEach(async (field: any) => {
        let validators = field.validator || [];
        if (field.required) validators.push(Validators.required);

        temp[field.fcname] = new FormControl(
          this.obj && this.obj[field.fcname] ? this.obj[field.fcname] : '',
          validators
        );
        tempImg =
          this.obj && this.obj[field.fcname]
            ? await this.getTempLink(this.obj[field.fcname]['path_display'])
            : '';

        if (this.obj.cert_of_indigency) {
          this.certificateOfIndigencyExist = true;
          this.imgArray.push({
            fcname: field.fcname,
            label: field.label,
            required: field.required,
            imgLink: tempImg ? tempImg : '',
            show: true,
            disable: this.disable,
          });
        } else {
          this.certificateOfIndigencyExist = false;
          this.imgArray.push({
            fcname: field.fcname,
            label: field.label,
            required: field.required,
            imgLink: tempImg ? tempImg : '',
            show: field.show,
            disable: this.disable,
          });
        }
      });
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
          this.imgArray.forEach(async (img: any) => {
            if (fcname === img.fcname) {
              img.imgLink = await this.getTempLink(res.result.path_display);
              img.hasError = false;
            }
          });

          this.obj[fcname] = res.result;

          this.imageForm.get(fcname)?.setValue(res.result || 'Empty');
          this.imageForm.markAsDirty();
          this.imageEmitter.emit({
            images: this.imageForm.getRawValue(),
            formValid: this.imageForm.valid,
            formDirty: this.imageForm.dirty,
            reason: this.reason,
          });
          console.log(this.imageForm);
        }
      });
  }

  choose(event: any) {
    console.log(event);
    console.log(this.imgArray);
    let findHiddenForm: any = this.imgArray.find(
      (f: any) => f.fcname === 'cert_of_indigency'
    );
    if (findHiddenForm && event === 'yes') {
      findHiddenForm.show = true;
      findHiddenForm.required = true;
    } else {
      findHiddenForm.show = false;
      findHiddenForm.required = false;
    }
  }

  imageLoaded(index: number) {
    this.imgArray[index].loaded = true;
  }

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }
}
