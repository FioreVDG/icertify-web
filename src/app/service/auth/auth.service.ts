import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/config/url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = URL;
  constructor(private http: HttpClient) {}

  setHeaders() {
    let csurf_token = localStorage.getItem('SESSION_CSURF_TOKEN');
    let bearer_token = localStorage.getItem('SESSION_AUTH');

    let headers = new HttpHeaders({
      authorization: `Bearer ${bearer_token}`,
      c_auth: csurf_token || '',
    });

    return { headers };
  }

  getHeaders() {
    console.log(this.setHeaders());
    return {
      withCredentials: true,
      ...this.setHeaders(),
    };
  }

  loginSuperadmin(email: string, password: string) {
    return this.http.post(
      this.url + '/auth/superadmin-login',
      { email, password },
      this.getHeaders()
    );
  }

  me() {
    return this.http.get(this.url + '/auth/me', this.getHeaders());
  }
}
