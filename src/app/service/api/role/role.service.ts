import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/roles', body);
  }
  getAll(query: QueryParams) {
    return this.http.start('get', '/roles', {}, query);
  }
  get(query: QueryParams, id: String) {
    return this.http.start('get', `/roles/${id}`, {}, query);
  }
  update(body: Object, id: String) {
    return this.http.start('put', `/roles/${id}`, body);
  }
  delete(id: String) {
    return this.http.start('delete', `/roles/${id}`);
  }
  checkRoleInUsers(id: String) {
    return this.http.start('get', `/roles/checkRoleInUsers/${id}`);
  }
}
