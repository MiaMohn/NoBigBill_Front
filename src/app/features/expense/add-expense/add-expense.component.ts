import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';
import { ExpenseService } from '../../../services/expense/expense.service';
import { UserService } from '../../../services/user/user.service';
import { Expense } from '../../../models/expense.model';

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
  amount: number = 0;
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
    if (this.description.trim() && this.amount > 0 && this.userId !== null) {
      const newExpense = {
        description: this.description,
        amount: this.amount,
        user_id: this.userId,
      };

      this.expenseService.createExpense(newExpense).subscribe(() => {
        this.expenseAdded.emit();
        this.description = '';
        this.amount = 0;
        this.userId = null;
      });
    }
  }
}
