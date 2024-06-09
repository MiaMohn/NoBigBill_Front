import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateExpenseDialogComponent } from '../update-expense-dialog/update-expense-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-update-expense',
  standalone: true,
  imports: [CommonModule, MatDialogModule, UpdateExpenseDialogComponent],
  templateUrl: './update-expense.component.html',
  styleUrl: './update-expense.component.css',
})
export class UpdateExpenseComponent {
  @Input() expense: any;
  @Output() expenseUpdated = new EventEmitter<void>();

  constructor(
    private expenseService: ExpenseService,
    public dialog: MatDialog
  ) {}

  updateExpense(): void {
    const dialogRef = this.dialog.open(UpdateExpenseDialogComponent, {
      panelClass: 'custom-dialog',
      data: { ...this.expense }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          console.log('Updating expense:', result); // Depuración
          this.expenseService.updateExpense(result, this.expense.id).subscribe({
            next: () => {
              console.log('Expense updated successfully'); // Depuración
              this.expenseUpdated.emit();
            },
            error: (error) => {
              console.error('Update expense error:', error); // Depuración
            }
          });
        }
      },
      error: (error) => {
        console.error('Dialog close error:', error); // Depuración
      }
    });
  }
}
