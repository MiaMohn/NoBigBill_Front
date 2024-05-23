import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Expense } from '../../../models/expense.model';
import { ExpenseService } from '../../../services/expense/expense.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user/user.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';
import { UpdateExpenseComponent } from '../update-expense/update-expense.component';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AddExpenseComponent, DeleteExpenseComponent, UpdateExpenseComponent],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css',
})
export class ExpenseListComponent implements OnInit {
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

  onExpenseDeleted(): void {
    this.loadExpenses();
  }

  onUserDeleted(): void {
    this.loadUsers();
    this.loadExpenses();
  }

}
