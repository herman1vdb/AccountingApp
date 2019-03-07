import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/_models/transaction';
import { TransactionService } from 'src/app/_services/transaction.service';
import { Account } from 'src/app/_models/account';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  transaction: Transaction;
  accounts: Account[];
  controlAccounts: Account[];

  @ViewChild('creationForm') creationForm: NgForm;

  constructor(private transactionService: TransactionService, private alertify: AlertifyService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.accounts = data['accounts'];
      this.controlAccounts = this.accounts.filter(a => a.isControlAccount);
    });
  }

  selectTab(event) {
    this.transactionService.selectedTab.next(event.id);
  }

  createTransaction() {
    this.transactionService.newTransaction
      .subscribe((transaction) => {
        this.transaction = transaction;
        if (this.transactionService.selectedTab.value === 'receipts') {
          this.transaction.accountDebitId = this.creationForm.value.controlAccount[0].id;
        } else if (this.transactionService.selectedTab.value === 'payments') {
          this.transaction.accountCreditId = this.creationForm.value.controlAccount[0].id;
        }
      });
        if (this.creationForm.value.controlAccount === '' || this.creationForm.value.controlAccount === null) {
          this.alertify.warning('Please select control account');
        } else {
          if (this.transaction.date.toString() !== '' && this.transaction.accountDebitId.toString() !== ''
            && this.transaction.description !== '' && this.transaction.amount.toString() !== '') {
            this.transactionService.createTransaction(this.transaction).subscribe(next => {
              this.alertify.success('Transaction added successfully');
              this.transaction = null;
              this.transactionService.transactionAdded.next();
            }, error => {
              this.alertify.error(error);
            });
          }
        }
      }
  }


