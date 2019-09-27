import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/_models/transaction";
import { TransactionService } from "src/app/_services/transaction.service";

@Component({
  selector: "app-report-display-transactions",
  templateUrl: "./report-display-transactions.component.html",
  styleUrls: ["./report-display-transactions.component.css"]
})
export class ReportDisplayTransactionsComponent implements OnInit {
  @Input() transactions: Transaction[];
  constructor(private transactionService: TransactionService) {}

  deleteTransaction(id) {
    this.transactionService
      .removeTransaction(id)
      .subscribe(next => {}, error => {});
  }

  ngOnInit() {}
}
