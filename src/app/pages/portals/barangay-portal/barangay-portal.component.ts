import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { BARANGAY_NAVS } from 'src/app/config/NAVIGATION';

@Component({
  selector: 'app-barangay-portal',
  templateUrl: './barangay-portal.component.html',
  styleUrls: ['./barangay-portal.component.scss'],
})
export class BarangayPortalComponent implements OnInit {
  isExpanded: boolean = false;
  barangayNav = BARANGAY_NAVS;
  me: any;
  loading: boolean = false;
  loggingOut: boolean = false;
  changeLabel = new EventEmitter<boolean>();
  navigationLoading: boolean = false;
  routeLabel: string = '';
  page: any;

  //For Menu

  constructor() {}

  ngOnInit(): void {}
}
