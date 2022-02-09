import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-conference-duration',
  templateUrl: './video-conference-duration.component.html',
  styleUrls: ['./video-conference-duration.component.scss'],
})
export class VideoConferenceDurationComponent implements OnInit {
  defaultDate = '4 mins, 0 sec';
  customDate = 'test date';
  constructor() {}

  ngOnInit(): void {}

  checkCustomDate() {
    if (this.customDate) return true;
    else return false;
  }
}
