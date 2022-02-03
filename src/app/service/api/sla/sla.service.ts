import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class SlaService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/sla', body);
  }
  getAll(query: QueryParams) {
    return this.http.start('get', '/sla', {}, query);
  }
  get(query: QueryParams, id: String) {
    return this.http.start('get', `/sla/${id}`, {}, query);
  }
  update(body: Object, id: String) {
    return this.http.start('put', `/sla/${id}`, body);
  }
  delete(id: String) {
    return this.http.start('delete', `/sla/${id}`);
  }
}
