import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login-with-password',
  templateUrl: './login-with-password.component.html',
  styleUrls: ['./login-with-password.component.css']
})
export class LoginWithPasswordComponent {
  loginMessage = 'Logged In Successfully';

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
handleErrorLogin: any;

  constructor(
    private fb: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}
  
  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value).pipe(
      // route to protected/dashboard, if login was successfull
      tap(() => this.router.navigate(['../main-page/main.page']))
    ).subscribe();
  }
  // public handleErrorLogin = (email: string, errorName: string) => {
  //   return (
  //     this.loginForm.get(email)?.touched &&
  //     this.loginForm.get(email)?.errors &&
  //     this.loginForm.get(email)?.hasError(errorName)
  //   );
  // };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}