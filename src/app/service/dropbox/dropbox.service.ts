import { Injectable } from '@angular/core';
import { Dropbox } from 'dropbox';
import { Observable } from 'rxjs';
declare var require: any;

@Injectable({
  providedIn: 'root',
})
export class DropboxService {
  accessToken =
    'grG-786_nYcAAAAAAAAAASZmkKtn8u4U73zIEwMUfUMsl4vqhoEXmrSL68uswJ4I';
  dbx: any;
  refreshToken =
    'zbUskAqVKgYAAAAAAAAAAbEWrZY6_rhTHRum-6N8S7_5MkRz_WALjaXMw8N-oNVb';
  accessTokenShortLived =
    'sl.BHYVyH1BwV_6o4A83cnGc1mCFP6fhzZopMtsp14ny2ls-Cd8uDSlTTeId-RrTsGh6eYd3HtH7fFP3lXfzBiPR4GhYxKyO5uIFSAr_sVMr1-c9sV5j39BnCKdfrlvTBPyasGZuU6V';

  constructor() {
    let fetch = require('isomorphic-fetch');
    let Dropbox = require('dropbox').Dropbox;
    this.dbx = new Dropbox({
      fetch: fetch,
      accessToken: this.accessTokenShortLived,
      refreshToken: this.refreshToken,
      clientId: 'ludyjrwz63bgmoh',
      clientSecret: 'q0ijdr9z26qnm9x',
    });
  }

  checkAccount(): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .usersGetCurrentAccount()
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  checkPath(): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesListFolder({ path: '/docketph' })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          console.error(error);
        });
    });
  }

  getTempLink(path: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesGetTemporaryLink({
          path,
        })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          console.log(error);
          console.log(observer.error(error));
        });
    });
  }

  downloadFile(path: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesGetTemporaryLink({ path })
        .then((response: any) => {
          var link = document.createElement('a');
          link.href = response.result.link;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          console.log(error);
          console.log(observer.error(error));
        });
    });
  }

  getThumbnail(path: String): Observable<any> {
    let format = 'jpeg';
    return Observable.create((observer: any) => {
      this.dbx
        .filesGetThumbnail({
          path: path,
          format: format,
          size: 'w256h256',
          mode: 'strict',
        })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }

  getPreview(path: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesGetPreview({ path })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }

  getMetaData(path: string): Observable<any> {
    return Observable.create((observer: any) => {
      this.dbx
        .filesGetMetadata({ path })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
    });
  }

  uploadFile(path: string, filename: string, file: any): Observable<any> {
    console.log(filename);
    return Observable.create((observer: any) => {
      this.dbx
        .filesUpload({
          path: path + filename,
          autorename: true,
          mode: 'overwrite',
          contents: file,
        })
        .then((response: any) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error: any) => {
          //console.log(error);
          observer.error(error);
        });
    });
  }
}
