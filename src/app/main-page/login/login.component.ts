import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  router: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
