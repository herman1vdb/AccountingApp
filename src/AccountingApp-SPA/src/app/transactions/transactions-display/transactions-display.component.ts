import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TransactionService } from '../../_services/transaction.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../_models/transaction';
import { Account } from 'src/app/_models/account';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions-display',
  templateUrl: './transactions-display.component.html',
  styleUrls: ['./transactions-display.component.css']
})
export class TransactionsDisplayComponent implements OnInit, OnDestroy {
  transactions: Transaction[];
  transactionsForDisplay: Transaction[];
  controlAccount: Account;
  transactionAddedSubscription: Subscription;
  selectedTabSubscription: Subscription;
  selectedControlAccount: Subscription;

  constructor(public transactionService: TransactionService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.transactionAddedSubscription = this.transactionService.transactionAdded.subscribe(() => {
      this.getTransactions();
    });
    this.selectedTabSubscription = this.transactionService.selectedTab.subscribe((val) => {
      this.getTransactions();
    });

    this.selectedControlAccount = this.transactionService.selectedControlAccount.subscribe((account) => {
      this.controlAccount = account;
      this.getTransactions();
    });
  }

  ngOnDestroy() {
    this.transactionAddedSubscription.unsubscribe();
    this.selectedTabSubscription.unsubscribe();
    this.selectedControlAccount.unsubscribe();
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe(
      (res) => {
        this.transactions = res.filter(t => !t.posted);
        if (this.transactionService.selectedTab.value === 'payments') {
          this.transactionsForDisplay = this.transactions.filter(t => t.accountCreditId === this.controlAccount.id);
        }
        // tslint:disable-next-line:one-line
        else if (this.transactionService.selectedTab.value === 'receipts') {
          this.transactionsForDisplay = this.transactions.filter(t => t.accountDebitId === this.controlAccount.id);
        }
      },
      (err) => {
        this.alertify.error('Problem retrieving data');
      }
  );
  }

  deleteTransaction(id) {
    this.transactionService.removeTransaction(id).subscribe(next => {
      this.alertify.success('Transaction removed successfully');
      this.getTransactions();
    }, error => {
      this.alertify.error(error);
    });
  }
  postTransactions() {
    this.transactions.forEach(transaction => {
        if (transaction.accountCreditId === this.controlAccount.id || transaction.accountDebitId === this.controlAccount.id) {
          transaction.posted = true;
          this.transactionService.updateTransaction(transaction.id, transaction).subscribe(next => {
            this.alertify.success('Transaction updated successfully');
          }, error => {
            this.alertify.error(error);
          });
      }
    });
    this.getTransactions();
  }
}
