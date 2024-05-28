import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateUserDialogComponent } from '../../../core/components/update-user-dialog/update-user-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, MatDialogModule, UpdateUserDialogComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {

  @Input() user: User = { id: 0, name: '' }; // Inicializa con un valor por defecto
  @Output() userUpdated = new EventEmitter<void>();

  constructor(private userService: UserService, public dialog: MatDialog) {}

  updateUser(): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      panelClass: 'custom-dialog',
      data: { ...this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result, this.user.id).subscribe(() => {
          this.userUpdated.emit();
        });
      }
    });
  }
}
