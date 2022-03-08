import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  registration() {
    return this.http.start('get', '/dashboard/registrant');
  }

  registrantDb() {
    return this.http.start('get', '/dashboard/registrantDb');
  }

  newTransaction() {
    return this.http.start('get', '/dashboard/newTransaction');
  }
}
