import { Component, OnInit } from '@angular/core';
import { Route, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  router: any;
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  goToRegister() {
    this.router.navigateByUrl('/register');
  }
  

}


