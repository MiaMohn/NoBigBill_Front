import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../users/services/user.service';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { DeleteExpenseComponent } from '../delete-expense/delete-expense.component';
import { UpdateExpenseComponent } from '../update-expense/update-expense.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AddExpenseComponent, DeleteExpenseComponent, UpdateExpenseComponent, MatDialogModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css',
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  users: User[] = [];
  moment = moment;

  constructor(
    private expenseService: ExpenseService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
    this.loadUsers();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((data: Expense[]) => {
      this.expenses = data.sort((a, b) => new Date(b.expenseDate).getTime() - new Date(a.expenseDate).getTime());
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

  getUserById(user_id: number): User | undefined {
    return this.users.find((user) => user.id === user_id);
  }

  onExpenseDeleted(): void {
    this.loadExpenses();
  }

  onUserDeleted(): void {
    this.loadUsers();
    this.loadExpenses();
  }

  onExpenseUpdated(): void {
    this.loadExpenses();
  }

}
