import { Component, OnInit } from '@angular/core';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense/expense.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ExpenseListComponent],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[] = [];
  users: User[] = [];

  constructor(
    private expenseService: ExpenseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe((data: Expense[]) => {
      this.expenses = data;
    });
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((data: Expense[]) => {
      this.expenses = data;
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  onExpenseAdded(): void {
    this.loadExpenses();
  }

  getUserById(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
  }
}
