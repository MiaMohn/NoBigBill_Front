import { Routes } from '@angular/router';
import { UserComponent } from './users/components/user/user.component';
import { ExpenseComponent } from './expenses/components/expense/expense.component';
import { BalanceListComponent } from './balance/components/balance-list/balance-list.component';

export const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'expense', loadComponent: () => import('./expenses/components/expense/expense.component').then(c => c.ExpenseComponent)},
  { path: 'balance', loadComponent: () => import('./balance/components/balance-list/balance-list.component').then(c => c.BalanceListComponent)},
  { path: '', redirectTo: '/user', pathMatch: 'full' },
];
