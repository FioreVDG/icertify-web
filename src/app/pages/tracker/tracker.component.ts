import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  keyword = '';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  animate() {
    let doc = document.getElementsByClassName('searchArea');
    console.log(doc);
  }
}
