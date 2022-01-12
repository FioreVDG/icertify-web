import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REG_PROV_CITYMUN } from 'src/app/config/url';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private http: HttpClient) {}
  getRPC(collection: string, config: object) {
    return this.http.post(
      REG_PROV_CITYMUN + '/u-getMany/' + collection,
      config
    );
  }
}
