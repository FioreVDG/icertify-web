import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  registration() {
    return this.http.start('get', '/dashboard/registrant');
  }

  registrantDb() {
    return this.http.start('get', '/dashboard/registrantDb');
  }

  newTransaction() {
    return this.http.start('get', '/dashboard/newTransaction');
  }
  docReceiving() {
    return this.http.start('get', '/dashboard/docReceiving');
  }
  batchDelivery() {
    return this.http.start('get', '/dashboard/batchDelivery');
  }
  vidConference() {
    return this.http.start('get', '/dashboard/vidConference');
  }
  docReceivingNotary() {
    return this.http.start('get', '/dashboard/docReceivingNotary');
  }
  docReleasing() {
    return this.http.start('get', '/dashboard/docReleasing');
  }
  transactionHistory() {
    return this.http.start('get', '/dashboard/transactionHistory');
  }
  documentTracker() {
    return this.http.start('get', '/dashboard/documentTracker');
  }
  notaryDocReceiving() {
    return this.http.start('get', '/dashboard/notary/docReceiving');
  }
  notaryVidConference() {
    return this.http.start('get', '/dashboard/notary/vidConference');
  }
  notaryDocReleasing() {
    return this.http.start('get', '/dashboard/notary/docReleasing');
  }
  notaryDocUploading() {
    return this.http.start('get', '/dashboard/notary/docUploading');
  }
  notaryTransactionHistory() {
    return this.http.start('get', '/dashboard/notary/transactionHistory');
  }
  notaryDocumentTracker() {
    return this.http.start('get', '/dashboard/notary/documentTracker');
  }
  notaryReports() {
    return this.http.start('get', '/dashboard/notary/dashboard');
  }
}
