import { UserService } from './../../user.service';
import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input('singleUser') singleUser: any;
  @Input('notifyUser') notifyUser: any;
  message: any;
  author: any;
  messages: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.author = JSON.parse(localStorage.getItem('user') || '');
    // this.notifyUser.subscribe((res: any) => {
    //   console.log(res)
    //   this.loadMessages();
    // })
  }

  postMessage() {
    if (this.singleUser.messages) {
      this.singleUser.messages.push({ fromId: this.author.id, text: this.message, time: new Date() })

    } else {
      this.singleUser['messages'] = [
        { fromId: this.author.id, text: this.message, time: new Date() }
      ]
    }
    this.userService.updateUser(this.singleUser.key, this.singleUser);
    alert("msg send successfully");
    this.message = "";
    this.loadMessages(this.singleUser);
  }

  loadMessages(user: any) {
    this.singleUser = user;
    this.messages = [];
    let data: any = [];
    console.log(this.author)
    this.messages = this.author?.messages?.filter((msg: any) => msg.fromId == user.id) || [];
    console.log(this.message)
    this.userService.getSingleUserDetails(this.singleUser.key).snapshotChanges().subscribe(res => {
      data = res.payload.val();
      data?.messages?.filter((msg: any) => {
        if (msg.fromId == this.author.id) {
          msg.align = 'right';
          this.messages.push(msg);
          this.messages = _.uniqBy(_.sortBy(this.messages, ['time']), 'text');
        }
      })
    });
  }

}
