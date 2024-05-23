import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  @Output() userAdded = new EventEmitter<void>();

  newUser: string = '';

  constructor(private userService: UserService) {}

  addUser(): void {
    if (this.newUser.trim()) {
      this.userService.createUser(this.newUser).subscribe((user: User) => {
        this.newUser = '';
        this.userAdded.emit();
      });
    }
  }
}
