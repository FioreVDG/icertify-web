import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  @Input() menuItems: any;
  @Input() me: any;
  @Input() avatarColors: any;
  @Output() onMenuClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
}
