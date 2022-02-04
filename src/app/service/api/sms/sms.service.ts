import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  send(body: Object) {
    return this.http.start('post', '/sms/send', body);
  }
  sendReleasingNotif(body: Object, id: String) {
    return this.http.start('post', `/sms/releasing-notif/${id}`, body);
  }
}
