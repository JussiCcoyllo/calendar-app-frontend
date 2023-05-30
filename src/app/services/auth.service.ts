import { Injectable } from '@angular/core';
import { LoginResponse, LoginRequest, RegisterRequest, RegisterResponse } from './interfaces';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, of, switchMap, tap  } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCALSTORAGE_TOKEN_KEY } from '../app.module';
import { User } from '../main-page/user/user';

export const loginResponse: LoginResponse = {
  // fakeAccessToken.....should all come from real backend
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  refreshToken: {
    id: 1,
    token: 'fakeRefreshToken...should al come from real backend',
    refreshCount: 2,
    expiryDate: new Date(),
  },
  tokenType: 'JWT'
}

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  link = 'https://http://localhost:9090/';
  

  constructor(private http: HttpClient) {}

  send(text: string): Observable<User> {
    console.log(`${this.link}/send?text=${text}`);
    return this.http.put<User>(`${this.link}/send?text=${text}`, '');
  }

  create(name: string, pwdHashAndSalt: string): Observable<User> {
    const url = `${this.link}/users/create`;
    const body = { name, pwdHashAndSalt };
    return this.http.post<User>(url, body);
  }

  read_all(): Observable<User[]> {
    return this.http.get<User[]>(`${this.link}/read_all`);
  }

  update(id: number, name: string, pwdHashAndSalt: string): Observable<User> {
    const url = `${this.link}/users/delete/${id}`;
    const body = { name, pwdHashAndSalt };
    return this.http.put<User>(url, body);
  }

  // delete(id: number): Observable<User> {
  //   const url = `${this.link}/users/${id}`;
    // return this.http.delete(url);
  // }
}

//   constructor(
//     private http: HttpClient,
//     private snackbar: MatSnackBar,
//     private jwtService: JwtHelperService
//   ) { }

//   /*
//    Due to the '/api' the url will be rewritten by the proxy, e.g. to http://localhost:8080/api/auth/login
//    this is specified in the src/proxy.conf.json
//    the proxy.conf.json listens for /api and changes the target. You can also change this in the proxy.conf.json

//    The `..of()..` can be removed if you have a real backend, at the moment, this is just a faked response
//   */
//   login(loginRequest: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>('/api/auth/login', loginRequest).pipe(
//     tap((res: LoginResponse) => localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.accessToken)),
//     tap(() => this.snackbar.open('Login Successfull', 'Close', {
//      duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
//     }))
//     );
//   }

//   /*
//    The `..of()..` can be removed if you have a real backend, at the moment, this is just a faked response
//   */
//   register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
//     // TODO
//     return this.http.post<RegisterResponse>('/api/auth/register', registerRequest).pipe(
//     tap((res: RegisterResponse) => this.snackbar.open(`User created successfully`, 'Close', {
//      duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
//     }))
//     )
//   }

//   /*
//    Get the user fromt the token payload
//    */
//   getLoggedInUser() {
//     const decodedToken = this.jwtService.decodeToken();
//     return decodedToken.user;
//   }
// }