import { Users } from './users';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList, AngularFireObject } from '@angular/fire/compat/database'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserExist: boolean = false;
  private _loading = new BehaviorSubject<boolean>(false);
  public loading$ = this._loading.asObservable();
  constructor(private db: AngularFireDatabase) { }

  postUser(user: Users) {
    this.db.list(`users`).push(user);
  }

  getUser(): AngularFireList<Users[]> {
    // (this.db.list('users').snapshotChanges().map((actions: any) => {
    //   return actions.map((action: any) => ({ key: action.key, ...action.payload.val() }));
    // }).subscribe((items: any) => {
    //   return items.map((item: any) => item.key);
    // }))

    return this.db.list('users');
    // return this.db
    //   .list('users', ref => {
    //     return ref.orderByChild('timeStamp');
    //   })
    //   .valueChanges();
  }

  getSingleUserDetails(key: any) {
    return this.db.object('/users/' + key);
  }

  updateUser(key: any, user: any) {
    this.db.object('/users/' + key).update(user);
  }


  public show() {
    this._loading.next(true);
  }

  public hide() {
    this._loading.next(false);
  }

}
