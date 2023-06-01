import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'; 
import Validations from '../../../Validations';
import { CurrentUserService } from 'src/app/services/current-user.service';


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

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private currentUser: CurrentUserService
  ) {}
  
  register() {
    if (!this.registerForm.valid) {
      return;
    }
    const username = this.registerForm.get<string>("username")?.value
    const password = this.registerForm.get<string>("password")?.value
    this.userService.create(username, password).subscribe((user) => {
      this.currentUser.user = user.username;
      this.currentUser.userId = user.id;
    });
    this.router.navigate(["/dashboard"])
  }

  openSnackBar(message: string, action: string, duration: number = 3000) {
    this.snackBar.open(message, action, {duration});
  }
}