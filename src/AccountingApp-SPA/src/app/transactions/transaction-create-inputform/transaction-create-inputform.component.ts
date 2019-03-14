import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Account } from 'src/app/_models/account';
import { NgForm } from '@angular/forms';
import { Transaction } from 'src/app/_models/transaction';
import { TransactionService } from 'src/app/_services/transaction.service';

@Component({
  selector: 'app-transaction-create-inputform',
  templateUrl: './transaction-create-inputform.component.html',
  styleUrls: ['./transaction-create-inputform.component.css']
})
export class TransactionCreateInputformComponent implements OnInit {
  @ViewChild('creationForm') creationForm: NgForm;
  @ViewChild('description') descriptionElement: ElementRef;
  @Input() accounts: Account[];
  account: Account;

  constructor(public transactionService: TransactionService) { }

  ngOnInit() {
    // this.transactionService.transactionAdded.subscribe(() => {
    //   // console.log(this.descriptionElement.nativeElement());
    // });
  }

  changeTransaction() {
    const transaction: Transaction = {
      id: null,
      date: this.creationForm.value.date,
      accountDebitId: this.creationForm.value.account.id,
      accountCreditId: this.creationForm.value.account.id,
      description: this.creationForm.value.description,
      amount: this.creationForm.value.amount,
      posted: false
    };

    if (transaction.date.toString() !== '' && transaction.accountDebitId.toString() !== ''
      && transaction.description !== '' && transaction.amount.toString() !== '') {
      this.transactionService.newTransaction.next(transaction);
      this.creationForm.controls['account'].reset();
      this.creationForm.controls['description'].reset();
      this.creationForm.controls['amount'].reset();
    }
  }
}
