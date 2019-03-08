import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../../_services/transaction.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../_models/transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  transactionsForDisplay: Transaction[];
  constructor(public transactionService: TransactionService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTransactions();

    this.transactionService.transactionAdded.subscribe(() => {
      this.getTransactions();
    });
    this.transactionService.selectedTab.subscribe((val) => {
      this.getTransactions();
    });
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe(
      (res) => {
        this.transactions = res.filter(t => !t.posted);
        if (this.transactionService.selectedTab.value === 'payments') {
          this.transactionsForDisplay = this.transactions.filter(t => t.accountCredit.isControlAccount);
        }
        // tslint:disable-next-line:one-line
        else if (this.transactionService.selectedTab.value === 'receipts') {
          this.transactionsForDisplay = this.transactions.filter(t => t.accountDebit.isControlAccount);
        }
      },
      (err) => {
        this.alertify.error('Problem retrieving data');
      }
  );
  }
  postTransactions() {
    this.transactions.forEach(transaction => {
      transaction.posted = true;
      this.transactionService.updateTransaction(transaction.id, transaction).subscribe(next => {
        this.alertify.success('Transaction updated successfully');
      }, error => {
        this.alertify.error(error);
      });
    });
    this.getTransactions();
  }
}
