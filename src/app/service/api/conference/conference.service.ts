import { Injectable, Inject } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/conferences', body);
  }
  getAll(query: QueryParams) {
    return this.http.start('get', '/conferences', {}, query);
  }
  get(query: QueryParams, id: String) {
    return this.http.start('get', `/conferences/${id}`, {}, query);
  }
  update(body: Object, id: String) {
    return this.http.start('put', `/conferences/${id}`, body);
  }
  delete(id: String) {
    return this.http.start('delete', `/conferences/${id}`);
  }
}
