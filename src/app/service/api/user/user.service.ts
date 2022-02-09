import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  getAllUser(query: QueryParams) {
    return this.http.start('get', `/users`, {}, query);
  }
  getById(id: string) {
    return this.http.start('get', `/user/${id}`, {});
  }
  createAdmin(body: Object) {
    return this.http.start('post', '/users/admins', body);
  }
  updateUser(id: string, body: object) {
    return this.http.start('patch', `/user/${id}`);
  }
  deleteAdmin(id: string) {
    return this.http.start('delete', `/users/admin/${id}`);
  }
  createUser(body: Object) {
    return this.http.start('post', '/users/users', body);
  }
  deleteUser(id: string) {
    return this.http.start('delete', `/users/user/${id}`);
  }
  checkExistingMobileNumber(mobileNumber: string) {
    return this.http.start('post', `/users/checkExistingMobileNumber`, {
      mobileNumber,
    });
  }
}
