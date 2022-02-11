import { DocumentLogsService } from './document-logs/document-logs.service';
import { ClusterService } from './cluster/cluster.service';
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
import { ConferenceService } from './conference/conference.service';
import { SlaService } from './sla/sla.service';
import { RoomService } from './room/room.service';
import { SmsService } from './sms/sms.service';

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
    public conference: ConferenceService,
    public agora: AgoraService,
    public sla: SlaService,
    public room: RoomService,
    public sms: SmsService,
    public documentlogs: DocumentLogsService,
    public cluster: ClusterService
  ) {}
}
