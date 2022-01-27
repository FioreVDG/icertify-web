import { AgoraService } from './agora/agora.service';
import { NotarialService } from './notarial/notarial.service';
import { Inject, Injectable } from '@angular/core';
import { URL } from 'src/app/config/url';
import { HttpService } from '../http/http.service';
import { OtpService } from './otp/otp.service';
import { UserService } from './user/user.service';
import { DocumentService } from './document/document.service';
import { FolderService } from './folder/folder.service';
import { TransactionService } from './transaction/transaction.service';
import { RoleService } from './role/role.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    @Inject(HttpService) private http: HttpService,
    public otp: OtpService,
    public user: UserService,
    public notarial: NotarialService,
    public document: DocumentService,
    public folder: FolderService,
    public transaction: TransactionService,
    public role: RoleService,
    public agora: AgoraService
  ) {}
}
