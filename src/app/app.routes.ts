import { Routes } from '@angular/router';
import { UserComponent } from './features/user/user.component';
import { ExpenseComponent } from './features/expense/expense.component';
import { BalanceListComponent } from './features/balance/balance-list/balance-list.component';

export const routes: Routes = [
    {path: 'user', component: UserComponent},
    {path: 'expense', component: ExpenseComponent},
    {path: 'balance', component: BalanceListComponent}
];
