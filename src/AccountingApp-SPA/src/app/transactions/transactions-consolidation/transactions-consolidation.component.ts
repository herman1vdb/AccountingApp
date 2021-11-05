import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Account } from 'src/app/_models/account';
import { TransactionService } from 'src/app/_services/transaction.service';
import { Transaction } from 'src/app/_models/transaction';
import { calcTotalTransPerAccount } from 'src/app/_helpers/calcTotalTrans';

@Component({
  selector: 'app-transactions-consolidation',
  templateUrl: './transactions-consolidation.component.html',
  styleUrls: ['./transactions-consolidation.component.css']
})
export class TransactionsConsolidationComponent implements OnInit {
  bankBalance: number;
  description: string;
  totalAmount: number;
  difference: number;
  constrolAccount: Account;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.selectedControlAccount.subscribe(account => {
      this.constrolAccount = account;
      this.getSummary();
    });
    this.transactionService.transactionAdded.subscribe(() => {
      this.getSummary();
    });
  }

  balanceAdded(event) {
    this.bankBalance = event.target.value;
    this.calculateDifference();
  }

  getSummary() {
    this.transactionService.getTransactions().subscribe((trans) => {
      this.totalAmount = calcTotalTransPerAccount(trans, this.constrolAccount);
      this.description = this.constrolAccount.description;
      this.calculateDifference();
    });
  }

  calculateDifference() {
    this.difference = this.bankBalance - this.totalAmount;
  }
}
