import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('creationForm') creationForm: NgForm;


  constructor(private transactionService: TransactionService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.accounts = data['accounts'];
    });
  }

  createTransaction() {
    const date = new Date();
    this.transaction = {
      id: null,
      description: this.creationForm.value.description,
      accountDebitId: 1,
      accountCreditId: 2,
      date: date,
      amount: null
    };
    this.transactionService.createTransaction(this.transaction).subscribe(next => {
      this.alertify.success('Transaction updated successfully');
      this.creationForm.reset(this.transaction);
    }, error => {
      this.alertify.error(error);
    });
  }
}


