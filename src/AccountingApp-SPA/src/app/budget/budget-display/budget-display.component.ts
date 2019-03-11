import { Component, OnInit, Input } from '@angular/core';
import { Budget } from 'src/app/_models/budget';
import { BudgetDisplay } from 'src/app/_models/budgetDisplay';
import { TypeAccount } from 'src/app/_enums/TypeAccount';
import { DecimalPipe } from '@angular/common';
import { calcTotalTransPerAccount } from 'src/app/_helpers/calcTotalTrans';

@Component({
  selector: 'app-budget-display',
  templateUrl: './budget-display.component.html',
  styleUrls: ['./budget-display.component.css']
})

export class BudgetDisplayComponent implements OnInit {
  @Input() budget: Budget[];

  budgetForDisplay: BudgetDisplay[];
  grandTotal: number;
  grandTotalTrans: number;
  grandTotalDiff: number;
  note: string;

  constructor() { }

  ngOnInit() {
    const t = 'red';
    this.budgetForDisplay = [];
    for (let i = 1; i < 5; i++) {
      const budgetDisp: BudgetDisplay = {
        'budgetList': this.budget.filter(b => b.account.typeId === i && !b.account.isControlAccount),
        'typeDescription': TypeAccount[i].toString(),
        'typeId': i,
        'totalBudget': 0,
        'totalTransactions': 0,
        'totalDifference' : 0
      };
      budgetDisp.budgetList.forEach(b => {
        b.totalTransactionsPerAcc = calcTotalTransPerAccount(b.transactions, b.account);
        b.totalDifferencePerAcc = this.calculateDifferencePerAccount(b);
      });
      this.calculateTotals(budgetDisp);
      this.calculateTotalDifference(budgetDisp);
      this.budgetForDisplay.push(budgetDisp);
    }
    this.calculateGrandTotal();
    this.calculateGrandTotalTrans();
    this.calculateGrandTotalDif();
  }

  calculateGrandTotal() {
    this.grandTotal = this.budgetForDisplay[0].totalBudget
      - this.budgetForDisplay[1].totalBudget
      - this.budgetForDisplay[2].totalBudget
      - this.budgetForDisplay[3].totalBudget;
  }
  calculateGrandTotalTrans() {
    this.grandTotalTrans = this.budgetForDisplay[0].totalTransactions
      - this.budgetForDisplay[1].totalTransactions
      - this.budgetForDisplay[2].totalTransactions
      - this.budgetForDisplay[3].totalTransactions;
  }
  calculateGrandTotalDif() {
    this.grandTotalDiff = this.budgetForDisplay[0].totalDifference
      - this.budgetForDisplay[1].totalDifference
      - this.budgetForDisplay[2].totalDifference
      - this.budgetForDisplay[3].totalDifference;
  }
  calculateTotals(budgetDisp: BudgetDisplay) {
      budgetDisp.totalBudget = budgetDisp.budgetList.map(a => a.account.budget).reduce((sum, current) => sum + current);
      budgetDisp.totalTransactions = budgetDisp.budgetList.map(a => a.totalTransactionsPerAcc).reduce((sum, current) => sum + current);
  }
  calculateTotalDifference(budgetDisp: BudgetDisplay) {
    budgetDisp.totalDifference = budgetDisp.totalBudget - budgetDisp.totalTransactions;
  }
  calculateDifferencePerAccount(b: Budget) {
    return (b.account.budget - b.totalTransactionsPerAcc);
  }
  getColor(budget: Budget) {
    if (budget.totalTransactionsPerAcc === 0) {
      this.note = 'Unpaid';
      return 'red';
    }
    if (budget.account.budget > budget.totalTransactionsPerAcc) {
      this.note = 'Under';
      return 'green';
    }
    if (budget.account.budget < budget.totalTransactionsPerAcc) {
      this.note = 'Over';
      return 'yellow';
    }
    this.note = '';
    return 'white';
  }
}
