import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../_models/transaction';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl + 'transactions');
  }
  getTransaction(id): Observable<Transaction> {
    return this.http.get<Transaction>(this.baseUrl + 'transactions/' + id);
  }
  updateTransaction(id: number, transaction: Transaction) {
    return this.http.put(this.baseUrl + 'transactions/' + id, transaction);
  }
}
