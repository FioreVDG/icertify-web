import { SpinnerLoadingComponent } from './../../shared/dialogs/spinner-loading/spinner-loading.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REG_PROV_CITYMUN } from 'src/app/config/url';
import { Clipboard } from '@angular/cdk/clipboard';
import { User } from 'src/app/models/user.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  empties = [null, undefined];
  public sideNavState$: Subject<boolean> = new Subject();
  constructor(
    private http: HttpClient,
    public clipboard: Clipboard,
    private dialog: MatDialog
  ) {}

  startLoading(message?: any): MatDialogRef<SpinnerLoadingComponent> {
    const dialogRef = this.dialog.open(SpinnerLoadingComponent, {
      disableClose: true,
      data: message == '' || message == undefined ? 'Loading...' : message,
      backdropClass: 'bdrop',
      panelClass: 'dialog-transparent',
    });
    return dialogRef;
  }

  stopLoading(ref: MatDialogRef<SpinnerLoadingComponent>) {
    ref.close();
  }

  getRPC(collection: string, config: object) {
    return this.http.post(
      REG_PROV_CITYMUN + '/u-getMany/' + collection,
      config
    );
  }

  getOneRPC(collection: string, config: object) {
    return this.http.post(REG_PROV_CITYMUN + '/u-getOne/' + collection, config);
  }

  traverseArray(arr: any[], path: string, values: any[] = []): any {
    if (!arr.length) return values.join(', ');

    const arrCopy = [...arr];
    const obj = arrCopy.splice(0, 1)[0];

    const foundVal = this.deepFind(obj, path);
    if (foundVal) values.push(foundVal);
    return this.traverseArray(arr.slice(1), path, values);
  }
  deepFind(obj: any, path: string | Array<string | number>): any {
    // console.log(path);
    if (!obj && obj != 0) return '';
    if (obj && !path) return '';

    if (typeof path == 'string') return this.deepFind(obj, path.split('.'));
    else if (path.length == 0)
      return this.empties.includes(obj)
        ? ''
        : Array.isArray(obj)
        ? obj.join(', ')
        : obj;
    else if (Array.isArray(obj)) return this.traverseArray(obj, path.join('.'));
    else return this.deepFind(obj[path[0]], path.slice(1));
  }

  formNumberInputOnly(event: any) {
    return (
      // backspace
      (event.charCode > 7 && event.charCode < 9) ||
      // period ('.')
      (event.charCode > 45 && event.charCode < 47) ||
      // 0-9
      (event.charCode > 47 && event.charCode < 58) ||
      // delete
      (event.charCode > 126 && event.charCode < 128)
    );
  }

  stringSlugify(str: string): string {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ?? for n, etc
    var from = '??????????????????????????????????????????????/_,:;';
    var to = 'aaaaeeeeiiiioooouuuunc------';
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
      .replace(/^[.& ,+!@#$%\^*();\/|<>"'?=:\t_\n[]{}~` -]/g, '')
      .replace(/[.& ,+!@#$%\^*();\/|<>"'?=:\t_\n[]{}~` -]$/g, '')
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  isEmail(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  copyToClipboard(toCopy?: any) {
    this.clipboard.copy(toCopy);
    return 'copied';
  }
}
