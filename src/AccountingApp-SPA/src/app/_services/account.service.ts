import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../_models/account';
import { Type } from '../_models/type';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl + 'accounts');
  }
  getAccount(id): Observable<Account> {
    return this.http.get<Account>(this.baseUrl + 'accounts/' + id);
  }
  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.baseUrl + 'types');
  }
  updateAccount(id: number, account: Account) {
    return this.http.put(this.baseUrl + 'accounts/' + id, account);
  }
  createAccount(account: Account) {
    return this.http.post(this.baseUrl + 'accounts/', account);
  }
}
