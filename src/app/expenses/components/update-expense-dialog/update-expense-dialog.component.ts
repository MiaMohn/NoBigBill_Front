import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/models/user.model';
import { ExpenseService } from '../../services/expense.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-update-expense-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './update-expense-dialog.component.html',
  styleUrl: './update-expense-dialog.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UpdateExpenseDialogComponent implements OnInit {
  updateForm: FormGroup;
  users: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.updateForm = this.fb.group({
      description: [data.description, [Validators.required]],
      amount: [data.amount, [Validators.required, Validators.min(0.01)]],
      user_id: [data.user_id, [Validators.required]]
    });

    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {

    if (this.updateForm.invalid) {
      if (this.updateForm.get('description')?.hasError('required')) {
        alert('Description cannot be empty.');
      }

      if (this.updateForm.get('amount')?.hasError('required') || this.updateForm.get('amount')?.hasError('min')) {
        alert('Amount must be greater than 0.');
      }

      if (this.updateForm.get('user_id')?.hasError('required')) {
        alert('Please select a user.');
      }

      return;
    }

    const formData = this.updateForm.value;
    formData.user_id = Number(formData.user_id);
    this.dialogRef.close(formData);
  }
}
