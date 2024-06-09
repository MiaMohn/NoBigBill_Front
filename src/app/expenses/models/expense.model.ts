export interface Expense {
  id: number;
  description: string;
  amount: number;
  userName: string;
  expenseDate: string;
  userId?: number;
}
