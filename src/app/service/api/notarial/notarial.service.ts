import { QueryParams } from './../../../models/queryparams.interface';
import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class NotarialService {
  constructor(@Inject(HttpService) private http: HttpService) {}
  getAllNotarial() {
    return this.http.start('get', '/notarial');
  }
  createNotarial(body: object) {
    return this.http.start('post', `/notarial`, body);
  }
  updateNotarial(notarialId: string, body: object) {
    return this.http.start('patch', `/notarial/${notarialId}`, body);
  }
  deleteNotarial(notarialId: string, query: QueryParams) {
    return this.http.start('delete', `/notarial/${notarialId}`);
  }
}
