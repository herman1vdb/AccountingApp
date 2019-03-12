import { Component, OnInit, Input } from '@angular/core';
import { Budget } from 'src/app/_models/budget';
import { BudgetSummary } from 'src/app/_models/budgetSummary';
import { calcTotalTransPerAccount } from 'src/app/_helpers/calcTotalTrans';

@Component({
  selector: 'app-budget-summary',
  templateUrl: './budget-summary.component.html',
  styleUrls: ['./budget-summary.component.css']
})
export class BudgetSummaryComponent implements OnInit {
  @Input() budget: Budget[];
  budgetSummary: BudgetSummary[];
  constructor() { }

  ngOnInit() {
    this.budgetSummary = [];
    this.budget = this.budget.filter(b => b.account.isControlAccount);
    this.budget.forEach(b => {
      const summary: BudgetSummary = {
        budget: b,
        totalTransactions: calcTotalTransPerAccount(b.transactions, b.account)
      };
      this.budgetSummary.push(summary);
    });
  }

}
