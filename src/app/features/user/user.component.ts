import { Component, OnInit } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { AddUserComponent } from './add-user/add-user.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    UserListComponent,
    AddUserComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  onUserAdded(): void {
    this.loadUsers();
  }

  onUserDeleted(): void {
    this.loadUsers();
  }

}
