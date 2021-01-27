import { users } from './../../data/users';
import { User } from './../../models/models';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-users-drop-down',
  templateUrl: './users-drop-down.component.html',
  styleUrls: ['./users-drop-down.component.css']
})
export class UsersDropDownComponent implements OnInit, OnChanges {
  users: User[];
  @Output() selectedUser = new EventEmitter<User>();
  @Output() selectedAmount = new EventEmitter<number>();
  @Input() showAmountText = true;
  @Input() reset: boolean;
  amount: number;
  currentUser: User;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.restUser();
  }

  ngOnInit(): void {
    this.getUsers();
    this.restUser();
  }
  restUser(): void {
    this.currentUser = {
      id: -1,
      name: 'Select User'
    };
    this.amount = null;
  }
  getUsers(): void {
    this.users = users;
  }
  onSelectUser(user: User): void {
    this.currentUser = user;
    this.selectedUser.emit(user);
  }
  onBlurAmount(): void {
    this.selectedAmount.emit(this.amount);
  }
}
