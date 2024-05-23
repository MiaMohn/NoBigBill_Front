import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExpenseService } from '../../../services/expense/expense.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-delete-expense',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './delete-expense.component.html',
  styleUrl: './delete-expense.component.css',
})
export class DeleteExpenseComponent {
  @Input() expenseId!: number;
  @Output() expenseDeleted = new EventEmitter<void>();

  constructor(private expenseService: ExpenseService) {}

  deleteExpense(): void {
    this.expenseService.deleteExpense(this.expenseId).subscribe(() => {
      this.expenseDeleted.emit();
    });
  }
}
