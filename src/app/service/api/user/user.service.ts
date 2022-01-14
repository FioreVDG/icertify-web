import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(@Inject(HttpService) private http: HttpService) {}
  createAdmin(body: Object) {
    return this.http.start('post', '/users/admins', body);
  }
}
