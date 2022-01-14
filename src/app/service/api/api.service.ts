import { UserService } from './user/user.service';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/config/url';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = URL;
  constructor(public user: UserService) {}
}
