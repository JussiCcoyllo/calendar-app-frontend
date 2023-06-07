import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  user: string | undefined;
  userId: number | undefined;

  loggedIn(): boolean {
    return !(this.user === undefined);
  }
}
