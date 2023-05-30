import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';
import { DatabaseConnectionService } from 'src/app/database-connection.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginRequest } from 'src/app/services/interfaces';
import { AuthService } from 'src/app/services/auth.service';

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

  send(){
    // send a login request to the backend
    //
    // some stuff
    //
    // if succeeds
    this.snackBar.open(this.loginMessage, "Dismiss");
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  login(name: string, password: string) {
    const loginRequest: LoginRequest = {
      name,
      password
    };
  }
}
