import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../../models/expense.model';

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
    user_id: number;
  }): Observable<Expense> {
    return this.http.post<Expense>(this.expenseApiUrl, expense);
  }

  getExpenseById(id: number): Observable<any> {
    const url = `${this.expenseApiUrl}/${id}`;
    return this.http.get(url);
  }

  getExpenseByUserId(user_id: number): Observable<any> {
    const url = `${this.expenseApiUrl}/user/${user_id}`;
    return this.http.get(url);
  }

  updateExpense(expense: any, id: number): Observable<any> {
    const url = `${this.expenseApiUrl}/${id}`;
    return this.http.put(url, expense);
  }

  deleteExpense(id: number): Observable<any> {
    const url = `${this.expenseApiUrl}/${id}`;
    return this.http.delete(url);
  }
}