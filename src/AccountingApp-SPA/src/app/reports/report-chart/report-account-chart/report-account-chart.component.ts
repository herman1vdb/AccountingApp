import { Component, OnInit } from "@angular/core";
import { calcTotalTransPerAccount } from "../../../_helpers/calcTotalTrans";
import { ActivatedRoute } from "@angular/router";
import { Transaction } from "src/app/_models/transaction";
import { Account } from "src/app/_models/account";
import * as moment from "moment";

@Component({
  selector: "app-report-account-chart",
  templateUrl: "./report-account-chart.component.html",
  styleUrls: ["./report-account-chart.component.css"]
})
export class ReportAccountChartComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  transactions: Transaction[];
  accounts: Account[];
  selectedAccount: Account;
  displayTransactionTotals: Transaction[];
  chartData: any;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transactions = data["transactions"];
      this.accounts = data["accounts"];
    });
    this.getBarChartData();
  }

  getBarChartData() {
    this.chartData = [
      {
        data: [],
        label: this.selectedAccount.description
      }
    ];
    this.chartData.forEach(c => {
      for (let i = 0; i < 12; i++) {
        c.data.push(this.accountTotalByMonth(this.selectedAccount, i));
      }
    });
  }

  changeAccount(event) {
    const id = event.target.value.toString();
    this.selectedAccount = this.accounts.find(a => {
      return a.id.toString() === id;
    });
    this.getBarChartData();
  }

  accountTotalByMonth(account, month) {
    this.displayTransactionTotals = this.transactions.filter(t => {
      return moment(t.date).month() === month;
    });
    return calcTotalTransPerAccount(this.displayTransactionTotals, account);
  }
}
