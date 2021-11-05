import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../_models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBudget(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.baseUrl + 'budget');
  }
}
