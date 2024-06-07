import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../../services/balance/balance.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BalanceChartComponent } from '../../../core/components/balance-chart/balance-chart.component';
import { TransactionsListComponent } from '../transactions-list/transactions-list.component';

@Component({
  selector: 'app-balance-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BalanceChartComponent,
    TransactionsListComponent
  ],
  templateUrl: './balance-list.component.html',
  styleUrl: './balance-list.component.css'
})
export class BalanceListComponent implements OnInit{

  balances: {[key: string]: number } = {};

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.balanceService.getBalances().subscribe((data) => {
      this.balances = data;
    });
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}