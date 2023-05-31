import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service'; 

@Component({
  selector: 'app-login-with-password',
  templateUrl: './login-with-password.component.html',
  styleUrls: ['./login-with-password.component.css']
})

export class LoginWithPasswordComponent {

  loginMessage = 'Logged In Successfully';

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  },)

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const username = this.loginForm.get<string>("username")?.value
    const password = this.loginForm.get<string>("password")?.value
    this.userService.read(username, password).pipe(
      // If registration was successfull, then navigate to login route
      tap(() => this.router.navigate(['../login']))
    ).subscribe();
  }

  
  openSnackBar(message: string, action: string, duration: number = 3000) {
    this.snackBar.open(message, action, {duration});
  }
}

