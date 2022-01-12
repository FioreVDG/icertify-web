import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ActionMenuComponent>) {}

  ngOnInit(): void {}
}
