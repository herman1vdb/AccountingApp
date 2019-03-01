import { Component, OnInit } from '@angular/core';
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

  constructor(private transactionService: TransactionService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transactions = data['transactions'];
      console.log(this.transactions);
    });
  }

}
