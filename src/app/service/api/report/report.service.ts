import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  generateQuery(query: Array<any>, collection: string) {
    console.log(query);
    return this.http.start('post', '/report', {
      query: JSON.stringify(query),
      collection,
    });
  }
  generateNotaryReport(query: string) {
    return this.http.start('get', `/report/notaryReport${query}`);
  }
}
