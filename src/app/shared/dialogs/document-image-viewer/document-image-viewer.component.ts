import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-document-image-viewer',
  templateUrl: './document-image-viewer.component.html',
  styleUrls: ['./document-image-viewer.component.scss'],
})
export class DocumentImageViewerComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {}
}
