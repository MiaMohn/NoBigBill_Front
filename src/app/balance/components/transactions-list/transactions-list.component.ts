import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css',
})
export class TransactionsListComponent implements OnInit {
  transactions: string[] = [];

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.balanceService.getTransactions().subscribe(
      (data: string[]) => {
        this.transactions = data;
      }
    );
  }
}
