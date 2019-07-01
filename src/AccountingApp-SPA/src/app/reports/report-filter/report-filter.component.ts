import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/_models/transaction";
import { Account } from "src/app/_models/account";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";

@Component({
  selector: "app-report-filter",
  templateUrl: "./report-filter.component.html",
  styleUrls: ["./report-filter.component.css"]
})
export class ReportFilterComponent implements OnInit {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  accounts: Account[];
  fromDate: Date;
  toDate: Date;
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
    this.filteredTransactions = this.transactions.filter(
      t =>
        t.date >= this.fromDate &&
        moment(t.date).format("YYYY-MM-DD") <=
          moment(this.toDate).format("YYYY-MM-DD")
    );
  }

  filterByAccount(event) {
    this.filteredTransactions = this.transactions.filter(
      t =>
        t.accountDebit.description === event.target.value ||
        t.accountCredit.description === event.target.value
    );
  }
  filterByKeyword() {
    alert("HALLO");
  }
}
