import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {


  constructor(private router: Router) {
  }
  ngOnInit(): void {

  }

  onLoginRegister(): void {
    this.router.navigateByUrl('http://localhost:4200/api/v2/user/main-page');
  }
}




// constructor(
//   private UserService: UserService,
//   private Router: Router
// ) {}

// async ngOnInit(): Promise<void> {
//   this.userService..subscribe((l) => {
//     l.responseList.forEach((element) => {
//       if (element != null && this.calendarComponent != undefined) {
//         let r = this.calendarComponent
//           .getApi()
//           .addEvent({ title: element.title, start: element.dateTime });
//         if (r != null) {
//           this.currentEvents.push(r);
//         }
//       }
//     });
//   });
// }
