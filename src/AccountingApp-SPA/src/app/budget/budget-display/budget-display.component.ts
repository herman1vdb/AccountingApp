import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Budget } from 'src/app/_models/budget';
import { BudgetDisplay } from 'src/app/_models/budgetDisplay';
import { TypeAccount } from 'src/app/_enums/TypeAccount';
import { calcTotalTransPerAccount } from 'src/app/_helpers/calcTotalTrans';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-budget-display',
  templateUrl: './budget-display.component.html',
  styleUrls: ['./budget-display.component.css']
})
export class BudgetDisplayComponent implements OnInit {
  @Input() budget: Budget[];
  @ViewChild('creationForm') creationForm: NgForm;

  budgetForDisplay: BudgetDisplay[];
  grandTotal: number;
  grandTotalTrans: number;
  grandTotalDiff: number;
  note: string;
  fromDate: any;
  toDate: any;

  constructor() { }

  ngOnInit() {
    this.budgetForDisplay = [];
    this.fromDate = moment().startOf('month').format('YYYY-MM-DD');
    this.toDate = moment().endOf('month').format('YYYY-MM-DD');
    this.setUpBudgetForDisplay();
  }
  changeFromDate(event) {
    console.log(event);
    this.fromDate = event;
    this.setUpBudgetForDisplay();
  }


  changeToDate(event) {
    console.log(event);
    this.toDate = event;
    this.setUpBudgetForDisplay();
  }

  nextMonth() {
    this.fromDate = moment(this.fromDate).add(1, 'month').format('YYYY-MM-DD');
    this.toDate = moment(this.toDate).add(1, 'month').endOf('month').format('YYYY-MM-DD');
    this.setUpBudgetForDisplay();
  }

  previousMonth() {
    this.fromDate = moment(this.fromDate).add(-1, 'month').format('YYYY-MM-DD');
    this.toDate = moment(this.toDate).add(-1, 'month').endOf('month').format('YYYY-MM-DD');
    this.setUpBudgetForDisplay();
  }

  setUpBudgetForDisplay() {
    const copiedBudget = JSON.parse(JSON.stringify(this.budget));
    this.budgetForDisplay = [];
    for (let i = 1; i < 5; i++) {
      const budgetDisp: BudgetDisplay = {
        'budgetList': copiedBudget.filter(b => b.account.typeId === i
          && !b.account.isControlAccount
          && b.account.isActive
        ),
        'typeDescription': TypeAccount[i].toString(),
        'typeId': i,
        'totalBudget': 0,
        'totalTransactions': 0,
        'totalDifference' : 0
      };
      this.budgetListByDate(budgetDisp);
      this.calculateTotals(budgetDisp);
      budgetDisp.budgetList = budgetDisp.budgetList.filter(b => b.account.budget !== 0
        || b.totalTransactionsPerAcc !== 0);
      this.budgetForDisplay.push(budgetDisp);
    }
    this.calculateGrandTotal();
    this.calculateGrandTotalTrans();
    this.calculateGrandTotalDif();
  }

  budgetListByDate(budgetDisp) {
    budgetDisp.budgetList.forEach(b => {
      if (this.fromDate !== null && this.toDate !== null && this.fromDate.toString() !== '' && this.fromDate.toString() !== '') {
        b.transactions = b.transactions.filter(t => t.date >= this.fromDate && t.date <= this.toDate);
      }
      b.totalTransactionsPerAcc = calcTotalTransPerAccount(b.transactions, b.account);
      b.totalDifferencePerAcc = this.calculateDifferencePerAccount(b);
    });
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
    if (budgetDisp.budgetList.length > 0) {
      budgetDisp.totalBudget = budgetDisp.budgetList.map(a => a.account.budget).reduce((sum, current) => sum + current);
      budgetDisp.totalTransactions = budgetDisp.budgetList.map(a => a.totalTransactionsPerAcc).reduce((sum, current) => sum + current);
      budgetDisp.totalDifference = budgetDisp.totalBudget - budgetDisp.totalTransactions;
    }
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
