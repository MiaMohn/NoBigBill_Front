import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  @Output() userAdded = new EventEmitter<void>();

  newUser: string = '';

  constructor(private userService: UserService) {}

  addUser(): void {
    if (this.newUser.trim() === '') {
      alert('User name cannot be empty.');
      return;
    }

    this.userService.createUser(this.newUser).subscribe((user: User) => {
      this.newUser = '';
      this.userAdded.emit();
    });
  }
}
