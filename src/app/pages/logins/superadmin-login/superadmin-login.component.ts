import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superadmin-login',
  templateUrl: './superadmin-login.component.html',
  styleUrls: ['./superadmin-login.component.scss'],
})
export class SuperadminLoginComponent implements OnInit {
  hide: boolean = true;
  isLoggingIn: boolean = false;
  isLoggedIn: boolean = false;
  credential = this.fb.group({
    email: new FormControl('testuser@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123qweasdzxc123', [Validators.required]),
  });
  constructor(
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
}
