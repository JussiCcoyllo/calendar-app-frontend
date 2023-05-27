import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Validation from '../../../Validations';

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
      user: ['', [Validators.required, Validators.name]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: Validation.match('password', 'confirmPassword'),
    }
  );

  constructor(
    private fb: NonNullableFormBuilder,
    private snackBar: MatSnackBar
  ) {}
  
  public handleErrorRegister = (controlName: string, errorName: string) => {
    return (
      this.registerForm.get(controlName)?.touched &&
      this.registerForm.get(controlName)?.errors &&
      this.registerForm.get(controlName)?.hasError(errorName)
    );
  };

  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}