import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Validations from '../../Validations';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { User } from '../../data/user/user';
import { HttpErrorResponse } from '@angular/common/http';
import {UserDelete} from 'src/app/data/user/user-delete';
import {DatabaseConnectionService} from 'src/app/data/database-connection.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerMessage = 'Registered Successfully';

  registerForm = new FormGroup(
    {
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    { validators: Validations.passwordsMatching }
  );

  constructor(
    private router: Router,
    private userService: DatabaseConnectionService,
    private snackBar: MatSnackBar,
    private currentUser: CurrentUserService
  ) {}

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    const username = this.registerForm.get<string>('username')?.value;
    const password = this.registerForm.get<string>('password')?.value;
    this.userService.postCreateUser(username, password).subscribe(
      (user: UserDelete) => {
        this.currentUser.user = username;
        this.currentUser.userId = user.id;
        this.router.navigate(['/dashboard']);
        this.snackBar.open(this.registerMessage, 'Dismiss', { duration: 3000 });
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(
          `Failed to register ErrorStatus(${err.statusText})`,
          'Dismiss',
          { duration: 3000 }
        );
      }
    );
  }
}
