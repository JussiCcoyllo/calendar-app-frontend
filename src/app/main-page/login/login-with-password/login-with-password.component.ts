import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-with-password',
  templateUrl: './login-with-password.component.html',
  styleUrls: ['./login-with-password.component.css']
})
export class LoginWithPasswordComponent {
  loginMessage = 'Logged In Successfully';

  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.name]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private snackBar: MatSnackBar
  ) {}

  public handleErrorLogin = (email: string, errorName: string) => {
    return (
      this.loginForm.get(email)?.touched &&
      this.loginForm.get(email)?.errors &&
      this.loginForm.get(email)?.hasError(errorName)
    );
  };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}