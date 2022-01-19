import { NotarialService } from './notarial/notarial.service';
import { Inject, Injectable } from '@angular/core';
import { URL } from 'src/app/config/url';
import { HttpService } from '../http/http.service';
import { OtpService } from './otp/otp.service';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    @Inject(HttpService) private http: HttpService,
    public otp: OtpService,
    public user: UserService,
    public notarial: NotarialService
  ) {}
}
