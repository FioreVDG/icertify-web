import { Injectable, Inject } from '@angular/core';
import { URL } from 'src/app/config/url';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../../http/http.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  url = URL;

  constructor(
    @Inject(HttpService) private http: HttpService,
    private httpClient: HttpClient
  ) {}

  setHeaders() {
    let otp_token = localStorage.getItem('OTP_TOKEN');

    let headers = new HttpHeaders({
      o_auth: otp_token || '',
    });

    return { headers };
  }

  getHeaders() {
    // console.log(this.setHeaders());
    return {
      withCredentials: true,
      ...this.setHeaders(),
    };
  }

  registerSendOTP(body: Object) {
    return this.httpClient.post(
      this.url + `/auth/otp/send`,
      body
      // this.getHeaders()
    );
  }

  registerCheckOTP(body: Object) {
    return this.httpClient.post(
      this.url + `/auth/otp/validate`,
      body,
      this.getHeaders()
    );
  }
}
