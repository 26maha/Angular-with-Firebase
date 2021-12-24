import { Router, RouterModule } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  userName: any = '';
  isUserFound: boolean = false;

  ngOnInit(): void {
  }

  login() {
    let users: any[] = [];
    let user: any;
    this.userService.getUser().snapshotChanges().subscribe(res => {
      users = res.map(res => ({ key: res.key, ...res.payload.val() }));
      user = (users.filter((a: any) => a.name.toLowerCase() == this.userName.toLowerCase()))
      this.userService.isUserExist = (user?.length > 0);
      if (this.userService.isUserExist) {
        localStorage.setItem('isUser', 'true');
        localStorage.setItem('user', JSON.stringify(user[0]));
        this.userService.show();
        this.router.navigate([''])
      }
    })
  }

}
