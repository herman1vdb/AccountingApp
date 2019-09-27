import { Component, OnInit } from "@angular/core";
import {
  calcTotalTransPerAccount,
  calcTotalTransPerType
} from "../../../_helpers/calcTotalTrans";
import { ActivatedRoute } from "@angular/router";
import { Transaction } from "src/app/_models/transaction";
import { Account } from "src/app/_models/account";
import * as moment from "moment";

@Component({
  selector: "app-report-expinc-chart",
  templateUrl: "./report-expinc-chart.component.html",
  styleUrls: ["./report-expinc-chart.component.css"]
})
export class ReportExpincChartComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  transactions: Transaction[];
  filteredTransactions: Transaction[];
  accounts: Account[];

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
    this.getBarChartData();
  }

  getBarChartData() {
    this.barChartData = [];
    this.barChartData.push({ data: [], label: "Income" });
    this.barChartData.forEach(c => {
      for (let i = 0; i < 12; i++) {
        c.data.push(this.typeTotalByMonth(i, 1));
      }
    });
    this.barChartData.push({ data: [], label: "Expenses" });
    this.barChartData.forEach(c => {
      for (let i = 0; i < 12; i++) {
        c.data.push(this.typeTotalByMonth(i, 2));
      }
    });
  }

  typeTotalByMonth(month, type) {
    console.log(month);
    this.filteredTransactions = this.transactions.filter(t => {
      return moment(t.date).month() === month;
    });
    return (calcTotalTransPerType(this.filteredTransactions, type));
  }
}
