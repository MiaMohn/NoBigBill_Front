import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../core/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AddUserComponent, DeleteUserComponent, UpdateUserComponent, MatDialogModule, DeleteDialogComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

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
  
  onUserUpdated(): void {
    this.loadUsers();
  }

  onDelete(userId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }
}
