import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExpenseService } from '../../../services/expense/expense.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../core/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-delete-expense',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    DeleteDialogComponent,
  ],
  templateUrl: './delete-expense.component.html',
  styleUrl: './delete-expense.component.css',
})
export class DeleteExpenseComponent {
  @Input() expenseId!: number;
  @Output() expenseDeleted = new EventEmitter<void>();

  constructor(
    private expenseService: ExpenseService,
    public dialog: MatDialog
  ) {}

  deleteExpense(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { expenseId: this.expenseId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.expenseService.deleteExpense(this.expenseId).subscribe(() => {
          this.expenseDeleted.emit();
        });
      }
    });
  }

  /*deleteExpense(): void {
    this.expenseService.deleteExpense(this.expenseId).subscribe(() => {
      this.expenseDeleted.emit();
    });
  }*/
}
