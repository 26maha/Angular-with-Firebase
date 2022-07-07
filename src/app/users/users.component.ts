import { Users } from './../users';
import { UserService } from './../user.service';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject, BehaviorSubject } from 'rxjs';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'place', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  user: any = {};
  authorName: any;
  @ViewChild(UserComponent)
  userOne!: UserComponent;

  constructor(private userService: UserService, private dialog: MatDialog) {

    let data = [
      { name: 'dog', line: 'adv', order: 1 },
      { name: 'cet', line: 'adv', order: 2 },
      { name: 'red', line: 'zip', order: 1 },
      { name: 'green', line: 'zip', order: 2 },
      { name: 'elephant', line:'adv', order: 3 },
    ];

    data =data.sort((a,b)=>b.name.localeCompare(a.name));

     console.log(data,"---test")

    let grouped = data.reduce((res:any, curr) => {
      res[curr.line] = res[curr.line] || [];
      res[curr.line].push(curr);
      return res;
    }, {});

    console.log(  Object.fromEntries(
      Object.entries(grouped)
        .sort((a:any, b:any) => b - a)
    ),"---grouped")

    // let group:any;
    // let result:any=[];



    // for (group of Object.keys(grouped)) {
    //  result[group]=(grouped[group])
    // }

    // const entries = Object.entries(grouped);

    // console.log(result,"---result")
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getUsers();
    this.authorName = JSON.parse(localStorage.getItem('user') || '').name;
  }

  addUser(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  postUser() {
    this.userService.postUser(this.user)
    this.user = {};
  }

  getUsers() {
    this.dataSource.data = [];
    // this.userService.getUser().subscribe(res => {
    //   this.dataSource.data = res;
    //   this.dataSource.data.forEach((user: any) => {
    //     if (user.name != this.authorName) {
    //       user.sendMsg = true;
    //     }
    //     else {
    //       user.sendMsg = false;
    //     }
    //   });
    // })

    this.userService.getUser().snapshotChanges().subscribe(res => {
      this.dataSource.data = res.map(res => ({ key: res.key, ...res.payload.val() }));
      this.dataSource.data.forEach((user: any) => {
        if (user.name != this.authorName) {
          user.sendMsg = true;
        }
        else {
          user.sendMsg = false;
        }
      });
    })
  }

  showChat(user: any) {
    this.userOne.loadMessages(user);
  }


}
