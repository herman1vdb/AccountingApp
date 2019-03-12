import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Transaction } from '../_models/transaction';
import { Account } from '../_models/account';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  newTransaction = new Subject<Transaction>();
  transactionAdded = new Subject();
  selectedTab = new BehaviorSubject<string>('payments');
  selectedControlAccount = new Subject<Account>();

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
  createTransaction(transaction: Transaction) {
    return this.http.post(this.baseUrl + 'transactions/', transaction);
  }
}
