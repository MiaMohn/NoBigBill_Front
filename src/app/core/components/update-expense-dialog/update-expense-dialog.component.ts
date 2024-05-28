import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-update-expense-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-expense-dialog.component.html',
  styleUrl: './update-expense-dialog.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UpdateExpenseDialogComponent implements OnInit {
  updateForm: FormGroup;
  users: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.updateForm = this.fb.group({
      description: [data.description],
      amount: [data.amount],
      user_id: [data.user_id]
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
    const formData = this.updateForm.value;
    formData.user_id = Number(formData.user_id);
    this.dialogRef.close(formData);
  }
}
