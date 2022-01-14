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
  dataSource = [
    {
      firstName: 'Leo',
      lastName: 'Galora',
      middleName: 'Arsaga',
      userRole: 'N/A',
      address: 'Buick',
      email: 'leonard.galora@lgusuite.com',
      mobileNumber: '09357176384',
      status: 'Active',
    },
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._brgyId = this.route.snapshot.paramMap.get('brgyId');
    this.userType = this.route.snapshot.paramMap.get('userType');
  }
  onAdd() {
    this.dialog
      .open(UserDialogFormComponent, {
        panelClass: 'custom-dialog-container',
        data: { _brgyId: this._brgyId, type: this.userType },
      })
      .afterClosed()
      .subscribe(
        (res: any) => {},
        (err) => {
          console.log(err);
        }
      );
  }
}
