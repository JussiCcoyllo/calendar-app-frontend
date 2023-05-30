import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'; 
import { tap } from 'rxjs';
import Validations from '../../../Validations';


@Component({
  selector: 'app-register-with-password',
  templateUrl: './register-with-password.component.html',
  styleUrls: ['./register-with-password.component.css']
})
export class RegisterWithPasswordComponent {
  registerMessage = 'Registered Successfully';
  passwordHide = true;
  confirmPasswordHide = true;


  registerForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  },
    { validators: Validations.passwordsMatching }
  )

  constructor(@Inject(UserService)
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}
  
  register() {
    if (!this.registerForm.valid) {
      return;
    }
    const username = this.registerForm.get<string>("username")?.value
    const pwd = this.registerForm.get<string>("password")?.value
    this.userService.create(username, pwd).pipe(
      // If registration was successfull, then navigate to login route
      tap(() => this.router.navigate(['../login']))
    ).subscribe();
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