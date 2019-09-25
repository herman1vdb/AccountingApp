import { Component, OnInit } from "@angular/core";
import { calcTotalTransPerAccount } from "../../_helpers/calcTotalTrans";
import { ActivatedRoute } from "@angular/router";
import { Transaction } from "src/app/_models/transaction";
import { Account } from "src/app/_models/account";
import * as moment from "moment";

@Component({
  selector: "app-report-chart",
  templateUrl: "./report-chart.component.html",
  styleUrls: ["./report-chart.component.css"]
})
export class ReportChartComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  transactions: Transaction[];
  accounts: Account[];
  selectedAccount: Account;
  displayTransactionTotals: Transaction[];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September"
  ];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [];

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transactions = data["transactions"];
      this.accounts = data["accounts"];
    });
  }

  getBarChartData() {
    this.barChartData = [
      {
        data: [],
        label: "Groceries"
      }
      // { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" }
      // Income and expenses also add as chart
    ];
    this.barChartData.forEach(c => {
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
