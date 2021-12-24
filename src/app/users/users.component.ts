import { Users } from './../users';
import { UserService } from './../user.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject, BehaviorSubject } from 'rxjs';

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
  singleUser: any;
  notifyUser = new BehaviorSubject<boolean>(false);
  showChat: boolean = false;

  constructor(private userService: UserService, private dialog: MatDialog) { }

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

  viewChat(user: any) {
    this.showChat = true;
    this.singleUser = user;
    this.notifyUser.next(true);
  }

}
