import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(@Inject(HttpService) private http: HttpService) {}
  create(body: Object) {
    return this.http.start('post', '/folders', body);
  }
  getAll(query: QueryParams) {
    return this.http.start('get', '/folders', {}, query);
  }
  get(query: QueryParams, id: String) {
    return this.http.start('get', `/folders/${id}`, {}, query);
  }
  update(body: Object, id: String) {
    return this.http.start('put', `/folders/${id}`, body);
  }
  delete(id: String) {
    return this.http.start('delete', `/folders/${id}`);
  }
}
