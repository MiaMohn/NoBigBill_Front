import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private balanceApiUrl = '/api/balance';

  constructor(private http: HttpClient) {}

  getBalances(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(this.balanceApiUrl);
  }
}