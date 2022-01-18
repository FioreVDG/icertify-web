import { QueryParams } from 'src/app/models/queryparams.interface';
import { ApiService } from './../../../../../../service/api/api.service';
import { UserDialogFormComponent } from './user-dialog-form/user-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { USERS } from './config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  column = USERS;
  _brgyId: any;
  userType: any;
  dataSource = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this._brgyId = this.route.snapshot.paramMap.get('brgyId');
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.fetchUser();
  }
  onAdd() {
    this.dialog
      .open(UserDialogFormComponent, {
        panelClass: 'custom-dialog-container',
        data: { _brgyId: this._brgyId, type: this.userType },
      })
      .afterClosed()
      .subscribe(
        (res: any) => {
          if (res) this.fetchUser();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  fetchUser() {
    let qry: QueryParams = {
      find: [],
    };
    if (this.userType === 'Barangay') {
      qry.find.push({ field: 'type', operator: '=', value: this.userType });
    }
    if (this._brgyId !== 'undefined')
      qry.find.push({ field: '_brgyId', operator: '=', value: this._brgyId });
    this.api.user.getAllUser(qry).subscribe((res: any) => {
      console.log(res.env.users);
      this.dataSource = res.env.users;
    });
  }
}
