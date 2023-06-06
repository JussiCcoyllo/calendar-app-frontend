import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class MainPageComponent {
  constructor(private router: Router) {
  }

  onLoginRegister(): void {
    this.router.navigate(["/user", "/main-page"]);
  }
}
