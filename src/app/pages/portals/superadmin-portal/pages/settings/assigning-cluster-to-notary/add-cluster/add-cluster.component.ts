import { Component, OnInit, ViewChild } from '@angular/core';
import { Section } from 'src/app/models/form.interface';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ADD_CLUSTER } from './config';

@Component({
  selector: 'app-add-cluster',
  templateUrl: './add-cluster.component.html',
  styleUrls: ['./add-cluster.component.scss'],
})
export class AddClusterComponent implements OnInit {
  @ViewChild('addCluster') addCluster!: FormComponent;
  loading = false;
  isFormInitiated = false;
  addClusterForm: Section[] = JSON.parse(JSON.stringify(ADD_CLUSTER));

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
