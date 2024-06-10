import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenseApiUrl = '/api/expense';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<any> {
    return this.http.get(this.expenseApiUrl);
  }

  createExpense(expense: {
    description: string;
    amount: number;
    user_id: UserId;
  }): Observable<Expense> {
    return this.http.post<Expense>(this.expenseApiUrl, expense);
  }

  getExpenseById(id: ExpenseId): Observable<any> {
    const url = `${this.expenseApiUrl}/${id}`;
    return this.http.get(url);
  }

  getExpenseByUserId(user_id: UserId): Observable<any> {
    const url = `${this.expenseApiUrl}/user/${user_id}`;
    return this.http.get(url);
  }

  updateExpense(expense: any, id: ExpenseId): Observable<any> {
    const url = `${this.expenseApiUrl}/${id}`;
    return this.http.put(url, expense);
  }

  deleteExpense(id: ExpenseId): Observable<void> {
    return this.http.delete<void>(`${this.expenseApiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}

export type ExpenseId = number;
export type UserId = number;