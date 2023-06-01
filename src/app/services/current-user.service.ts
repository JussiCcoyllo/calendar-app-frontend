import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  user: string | undefined;
  userId: number | undefined;
  constructor() {}

  loggedIn(): boolean{
    return !(this.user === undefined)
  }
}
