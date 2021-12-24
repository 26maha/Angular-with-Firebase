import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-app-with-expressjs';
  authorName:string='';
  constructor(private route: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.isUserExist = JSON.parse(localStorage.getItem('isUser') || 'false');
    if (this.userService.isUserExist) {
      this.userService.show();
      this.authorName = JSON.parse(localStorage.getItem('user') || '').name;
    }
  }

  logout() {
    this.userService.isUserExist = false;
    localStorage.setItem('isUser', 'false');
    localStorage.setItem('user', '');
    this.userService.hide();
    this.route.navigate(['login'])
  }
}
