import { Component, OnInit, ViewChild, Input, SystemJsNgModuleLoader } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/_models/transaction';
import { TransactionService } from 'src/app/_services/transaction.service';
import { Account } from 'src/app/_models/account';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { using } from 'rxjs';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  transaction: Transaction;
  accounts: Account[];
  controlAccounts: Account[];
  selectedControlAccount: Account;
  displayTransactionInput: boolean;

  @ViewChild('creationForm') creationForm: NgForm;

  constructor(private transactionService: TransactionService, private authService: AuthService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.displayTransactionInput = false;
    this.route.data.subscribe(data => {
      this.accounts = data['accounts'];
      this.controlAccounts = this.accounts.filter(a => a.isControlAccount);
    });
    this.transactionService.newTransaction
    .subscribe((transaction) => {
      this.transaction = transaction;
      this.assignAccountId();
      console.log(this.transaction);
      this.saveTransaction();
    });
  }

  selectTab(event) {
    this.transactionService.selectedTab.next(event.id);
  }

  controlSelected(event) {
    this.selectedControlAccount = this.controlAccounts.find(a => a.id.toString() === event.target.value.toString());
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
    console.log(this.transactionService.selectedTab.value);
    if (this.transactionService.selectedTab.value === 'receipts') {
      this.transaction.accountDebitId = this.selectedControlAccount.id;
    } else if (this.transactionService.selectedTab.value === 'payments') {
      this.transaction.accountCreditId = this.selectedControlAccount.id;
    }
  }
  }


