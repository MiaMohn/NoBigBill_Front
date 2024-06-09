import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../users/models/user.model';
import { ExpenseService } from '../../services/expense.service';
import { UserService } from '../../../users/services/user.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css',
})
export class AddExpenseComponent implements OnInit {
  @Output() expenseAdded = new EventEmitter<void>();
  users: User[] = [];
  description: string = '';
  amount: number | null = null;
  userId: number | null = null;

  constructor(
    private expenseService: ExpenseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  addExpense(): void {
    if (!this.description.trim()) {
      alert('Description cannot be empty');
      return;
    }

    if (this.amount === null || this.amount <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    if (this.userId === null) {
      alert('You must select an user');
      return;
    }

    const newExpense = {
      description: this.description,
      amount: this.amount,
      user_id: this.userId,
    };

    this.expenseService.createExpense(newExpense).subscribe(() => {
      this.expenseAdded.emit();
      this.description = '';
      this.amount = null;
      this.userId = null;
    });
  }
}
