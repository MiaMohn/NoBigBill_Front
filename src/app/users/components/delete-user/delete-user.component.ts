import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../shared/components/delete-dialog/delete-dialog.component';

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

  constructor(private userService: UserService, public dialog: MatDialog) {}

  deleteUser(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      panelClass: 'custom-dialog',
      data: { userId: this.userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(this.userId).subscribe(() => {
          this.userDeleted.emit();
        });
      }
    });
  }
}
