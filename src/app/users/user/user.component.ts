import { UserService } from './../../user.service';
import { Component, Input, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { Subject } from 'rxjs';

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
    // this.loadMessages();
    this.notifyUser.subscribe((res: any) => {
      console.log(res)
      this.loadMessages();
    })
  }

  postMessage() {
    if (this.singleUser.messages) {
      this.singleUser.messages.push({ fromId: this.author.id, text: this.message })

    } else {
      this.singleUser['messages'] = [
        { fromId: this.author.id, text: this.message }
      ]
    }
    this.userService.updateUser(this.singleUser.key, this.singleUser);
    alert("msg send successfully");
    this.message = "";
    this.loadMessages();
  }

  loadMessages() {
    console.log(this.singleUser, "singleUser")
    this.messages = [];
    this.userService.getSingleUserDetails(this.singleUser.key).snapshotChanges().subscribe(res => {
      let data: any = res.payload.val();
      this.messages = data?.messages.filter((msg: any) => msg.fromId == this.author.id)
    });
    console.log(this.messages, "this.messages")
  }

}
