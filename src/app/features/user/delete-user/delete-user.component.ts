import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css',
})
export class DeleteUserComponent {
  @Input() userId!: number;
  @Output() userDeleted = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  deleteUser(): void {
    this.userService.deleteUser(this.userId).subscribe(() => {
      this.userDeleted.emit();
    });
  }
}
