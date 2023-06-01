import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../main-page/user/user';
import { UserGet } from '../main-page/user/user-get';
import { UserDelete } from '../main-page/user/user-delete';

// export const loginResponse: LoginResponse = {
//   // fakeAccessToken.....should all come from real backend
//   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
//   refreshToken: {
//     id: 1,
//     token: 'fakeRefreshToken...should al come from real backend',
//     refreshCount: 2,
//     expiryDate: new Date(),
//   },
//   tokenType: 'JWT'
// }


@Injectable({
  providedIn: 'root'
})
export class UserService {
  link = 'http://localhost:9090';
  

  constructor(private http: HttpClient) {}

  login(name: string, password: string): Observable<UserGet>{
    const url = `${this.link}/api/v2/user/login`;
    const body = { username: name, password: password };
    return this.http.get<UserGet>(url, {params: body})
  }

  read(id: number): Observable<UserGet> {
    const url = `${this.link}/api/v2/user/get`;
    const body = { id: id };
    return this.http.request<UserGet>("get", url, {body: body})
  }

  create(username: string, password: string): Observable<User> {
    const url = `${this.link}/api/v2/user/create`;
    const body = { name:username, password };
    return this.http.post<User>(url, body); 
  }

  read_all(): Observable<User[]> {
    return this.http.get<User[]>(`${this.link}/read_all`);
  }

  update(id: number, name: string, password : string): Observable<User> {
    const url = `${this.link}/api/v2/user/update/${id}`;
    const body = { name, password };
    return this.http.put<User>(url, body);
  }

  delete(id: number): Observable<UserDelete> {
    const url = `${this.link}/api/v2/user/delete/${id}`;
    const body = { id };
    return this.http.delete<UserDelete>(url);
  }
}