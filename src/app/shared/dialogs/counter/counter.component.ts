import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  intervalHandler: any;
  ready: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CounterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    setTimeout(() => {
      this.ready = true;
      this.start();
    }, 1000);
  }

  start() {
    this.intervalHandler = setInterval(() => {
      this.startCouter();
    }, 1000);
  }

  startCouter() {
    this.data.ctr--;
    console.log(this.data.ctr);
    if (this.data.ctr < 1) {
      setTimeout(() => {
        clearInterval(this.intervalHandler);
        this.dialogRef.close(true);
      }, 500);
    }
  }
}
