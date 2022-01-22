import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/transactions', body);
  }
  getAll(query: QueryParams) {
    return this.http.start('get', '/transactions', {}, query);
  }
  get(query: QueryParams, id: String) {
    return this.http.start('get', `/transactions/${id}`, {}, query);
  }
  update(body: Object, id: String) {
    return this.http.start('put', `/transactions/${id}`, body);
  }
  delete(id: String) {
    return this.http.start('delete', `/transactions/${id}`);
  }
  getAllBatchTransaction(query: QueryParams) {
    return this.http.start('get', `/transactions/batch`, {}, query);
  }
  getAllFolder(query: QueryParams) {
    return this.http.start('get', `/transactions/folder`, {}, query);
  }
  createBatchTransaction(ids: string) {
    return this.http.start('post', `/transactions/batch/${ids}`);
  }
}
