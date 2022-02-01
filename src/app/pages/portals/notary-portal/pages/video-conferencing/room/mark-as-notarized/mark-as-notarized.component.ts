import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-mark-as-notarized',
  templateUrl: './mark-as-notarized.component.html',
  styleUrls: ['./mark-as-notarized.component.scss'],
})
export class MarkAsNotarizedComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
