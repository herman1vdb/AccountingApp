import { Component, OnInit } from "@angular/core";
import { typeTotalByMonth } from "../../../_helpers/calcTotalTrans";
import { ActivatedRoute } from "@angular/router";
import { Transaction } from "src/app/_models/transaction";

@Component({
  selector: "app-report-expinc-chart",
  templateUrl: "./report-expinc-chart.component.html",
  styleUrls: ["./report-expinc-chart.component.css"]
})
export class ReportExpincChartComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  transactions: Transaction[];
  filteredTransactions: Transaction[];
  chartData: any;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transactions = data["transactions"];
    });
    this.getBarChartData();
  }

  getBarChartData() {
    this.chartData = [];
    this.chartData.push({ data: [], label: "Income" });
    this.chartData.forEach(c => {
      for (let i = 0; i < 12; i++) {
        c.data.push(
          typeTotalByMonth(i, 1, this.transactions) 
        );
      }
    });
    this.chartData.push({ data: [], label: "Expenses" });
    this.chartData.forEach(c => {
      for (let i = 0; i < 12; i++) {
        c.data.push(
          typeTotalByMonth(i, 2, this.transactions) 
        );
      }
    });
  }
}
