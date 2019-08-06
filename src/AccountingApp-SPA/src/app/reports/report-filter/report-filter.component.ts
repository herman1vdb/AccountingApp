import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/_models/transaction";
import { Account } from "src/app/_models/account";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: "app-report-filter",
  templateUrl: "./report-filter.component.html",
  styleUrls: ["./report-filter.component.css"]
})
export class ReportFilterComponent implements OnInit {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  accounts: Account[];
  selectedAccount: string;
  fromDate: Date;
  toDate: Date;
  keyword: string;
  total: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transactions = data["transactions"];
      this.accounts = data["accounts"];
    });
  }

  filterByDate(event) {
    if (event.target.id === "fromDate") {
      this.fromDate = event.target.value;
      if (!this.toDate) {
        return;
      }
    } else {
      this.toDate = event.target.value;
      if (!this.fromDate) {
        return;
      }
    }
    this.filterDate(this.transactions);

    if (this.selectedAccount) {
      this.filterAccount(this.filteredTransactions);
    }
    this.sumValues();
  }

  filterByAccount(event) {
    this.selectedAccount = event.target.value;
    this.filterAccount(this.transactions);
    if (this.fromDate && this.toDate) {
      this.filterDate(this.filteredTransactions);
    }
    this.sumValues();
  }
  filterByKeyword(event) {
    this.keyword = event.target.value;
    console.log(this.keyword);
    this.filteredTransactions = this.transactions.filter(t =>
      t.description.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  filterDate(transactions) {
    this.filteredTransactions = transactions.filter(
      t =>
        t.date >= this.fromDate &&
        moment(t.date).format("YYYY-MM-DD") <=
          moment(this.toDate).format("YYYY-MM-DD")
    );
  }

  filterAccount(transactions) {
    this.filteredTransactions = transactions.filter(
      t =>
        t.accountDebit.description === this.selectedAccount ||
        t.accountCredit.description === this.selectedAccount
    );
  }

  sumValues() {
    this.total = this.filteredTransactions.reduce(
      (sum, current) => sum + current.amount,
      0
    );
  }
}
