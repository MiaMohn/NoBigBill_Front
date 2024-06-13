import { Component, OnInit } from '@angular/core';
import { TransactionsListComponent } from '../transactions-list/transactions-list.component';
import { BalanceListComponent } from '../balance-list/balance-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BalanceService } from '../../services/balance.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    BalanceListComponent,
    TransactionsListComponent,
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css',
})
export class BalanceComponent implements OnInit {
  balances: {[key: string]: number } = {};
  transactions: string[] = [];

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.loadBalances();
    this.loadTransactions();
  }

  loadBalances(): void {
    this.balanceService.getBalances().subscribe((data) => {
      this.balances = data;
    });
  }


  loadTransactions(): void {
    this.balanceService.getTransactions().subscribe((data) => {
        this.transactions = data;
      }
    );
  }
}
