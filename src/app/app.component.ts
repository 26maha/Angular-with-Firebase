import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-app-with-expressjs';
  authorName:string='';
  isUser:boolean=false;
  constructor(private route: Router, public userService: UserService,private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.events.subscribe(data => {
    //   console.log(data, "--data")
    // });
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

  public ngOnDestroy(): void {
    this.userService.hide();
  }
}
