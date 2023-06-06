import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginMessage = 'Logged In Successfully';

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  },)

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private currentUser: CurrentUserService
  ) { }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const username = this.loginForm.get<string>("username")?.value
    const password = this.loginForm.get<string>("password")?.value
    this.userService.login(username, password).subscribe(
      res => {
        this.currentUser.user = res.name;
        this.currentUser.userId = res.id;
        this.router.navigate(["/dashboard"])
        this.snackBar.open(this.loginMessage, 'Dismiss', {duration: 3000});
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(`Failed to log in ErrorStatus(${err.status})`, 'Dismiss', {duration: 3000})
      }
    );
  }
}