import { Component, OnInit, Input } from '@angular/core';
import { Budget } from 'src/app/_models/budget';
import { BudgetDisplay } from 'src/app/_models/budgetDisplay';
import { TypeAccount } from 'src/app/_enums/TypeAccount';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-budget-display',
  templateUrl: './budget-display.component.html',
  styleUrls: ['./budget-display.component.css']
})

export class BudgetDisplayComponent implements OnInit {
  @Input() budget: Budget[];

  budgetForDisplay: BudgetDisplay[];
  grandTotal: number;

  constructor() { }

  ngOnInit() {
    this.budgetForDisplay = [];
    for (let i = 1; i < 5; i++) {
      const budgetDisp: BudgetDisplay = {
        'budgetList': this.budget.filter(b => b.account.typeId === i),
        'transactionTotal': this.budget.filter(b => b.account.typeId === i)
          .map(t => t.transactions.amount).reduce((sum, current) => sum + current),
        'typeDescription': TypeAccount[i].toString(),
        'typeId': i,
        'total': 0
      };
      budgetDisp.total = budgetDisp.budgetList.map(a => a.account.budget).reduce((sum, current) => sum + current);
      this.budgetForDisplay.push(budgetDisp);
    }
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.grandTotal = this.budgetForDisplay[0].total
      - this.budgetForDisplay[1].total
      - this.budgetForDisplay[2].total
      - this.budgetForDisplay[3].total;
  }
}
