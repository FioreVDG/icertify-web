import { Component, OnInit, ViewChild } from '@angular/core';
import { Section } from 'src/app/models/form.interface';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ADD_RIDER } from './config';

@Component({
  selector: 'app-add-rider',
  templateUrl: './add-rider.component.html',
  styleUrls: ['./add-rider.component.scss'],
})
export class AddRiderComponent implements OnInit {
  @ViewChild('addRider') addRider!: FormComponent;
  loading = false;
  isFormInitiated = false;
  addRiderForm: Section[] = JSON.parse(JSON.stringify(ADD_RIDER));

  constructor() {}

  ngOnInit(): void {}

  formInitialized(e: any) {
    console.log(e);
    this.isFormInitiated = true;
  }
  formListener(event: any) {
    console.log(event);
  }
}
