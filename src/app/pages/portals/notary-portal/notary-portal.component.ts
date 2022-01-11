import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { NOTARY_NAVS } from 'src/app/config/NAVIGATION';

@Component({
  selector: 'app-notary-portal',
  templateUrl: './notary-portal.component.html',
  styleUrls: ['./notary-portal.component.scss'],
})
export class NotaryPortalComponent implements OnInit {
  isExpanded: boolean = true;
  notaryNav = NOTARY_NAVS;
  me!: User;
  navigation: any;
  loading: boolean = false;
  loggingOut: boolean = false;
  changeLabel = new EventEmitter<boolean>();
  navigationLoading: boolean = false;
  routeLabel: string = '';
  page: any;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    const currRoute = this.router.url.split('/').pop();
    console.log(currRoute);
    let temp: Array<String> = [];
    this.notaryNav.forEach((i: any) => {
      temp.push(i);
    });

    this.page = this.notaryNav.find((o: any) => o.route === currRoute);
    if (this.page) this.routeLabel = this.page.label;
  }

  changeRoute(nav: any) {
    this.navigationLoading = true;
    if (this.router.url.split('/').pop() == nav.route) {
      setTimeout(() => {
        this.navigationLoading = false;
      }, 1000);
    }

    const routeEvent = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          this.navigationLoading = true;
        } else if (event instanceof NavigationEnd) {
          routeEvent.unsubscribe();
          setTimeout(() => {
            this.navigationLoading = false;
          }, 1000);
        }
      }
    );

    this.changeLabel.emit(nav);
    this.routeLabel = nav.label;
  }
}
