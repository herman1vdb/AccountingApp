import { Component, OnInit, ViewChild, Input, SystemJsNgModuleLoader, OnDestroy } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/_models/transaction';
import { TransactionService } from 'src/app/_services/transaction.service';
import { Account } from 'src/app/_models/account';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit, OnDestroy {
  transaction: Transaction;
  controlAccounts: Account[];
  selectedControlAccount: Account;
  displayTransactionInput: boolean;
  subscription: Subscription;

  @ViewChild('creationForm') creationForm: NgForm;
  @Input() accounts: Account[];

  constructor(private transactionService: TransactionService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.displayTransactionInput = false;
    this.controlAccounts = this.accounts.filter(a => a.isControlAccount);

    this.subscription = this.transactionService.newTransaction
    .subscribe((transaction) => {
      this.transaction = transaction;
      this.assignAccountId();
      this.saveTransaction();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

  selectTab(event) {
    this.transactionService.selectedTab.next(event.id);
  }

  controlSelected(event) {
    const id = event.target.value.toString();
    this.selectedControlAccount = this.controlAccounts.find(a => a.id.toString() === id);
    this.transactionService.selectedControlAccount.next(this.selectedControlAccount);
    this.displayTransactionInput = true;
  }

  saveTransaction() {
      this.transactionService.createTransaction(this.transaction).subscribe(next => {
        this.alertify.success('Transaction added successfully');
        this.transaction = null;
        this.transactionService.transactionAdded.next();
      }, error => {
        this.alertify.error(error);
      });
  }

  assignAccountId() {
    if (this.transactionService.selectedTab.value === 'receipts') {
      this.transaction.accountDebitId = this.selectedControlAccount.id;
    } else if (this.transactionService.selectedTab.value === 'payments') {
      this.transaction.accountCreditId = this.selectedControlAccount.id;
    }
  }
}


