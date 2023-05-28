import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Validation from '../../../Validations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register-with-password',
  templateUrl: './register-with-password.component.html',
  styleUrls: ['./register-with-password.component.css']
})
export class RegisterWithPasswordComponent {
  registerMessage = 'Registered Successfully';
  passwordHide = true;
  confirmPasswordHide = true;

  registerForm = this.fb.group(
    {
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: Validation.match('password', 'confirmPassword'),
    }
  );

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private snackBar: MatSnackBar
  ) {}
  
  register() {
    if (!this.registerForm.valid) {
      return;
    }
    // this.authService.register(this.registerForm.value).pipe(
    //   // If registration was successfull, then navigate to login route
    //   tap(() => this.router.navigate(['../login']))
    // ).subscribe();
  }
  

  // public handleErrorRegister = (controlName: string, errorName: string) => {
  //   return (
  //     this.registerForm.get(controlName)?.touched &&
  //     this.registerForm.get(controlName)?.errors &&
  //     this.registerForm.get(controlName)?.hasError(errorName)
  //   );
  // };

  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}