import { Component, OnInit } from "@angular/core";
import { typeTotalByMonth } from "../../../_helpers/calcTotalTrans";
import { ActivatedRoute } from "@angular/router";
import { Transaction } from "src/app/_models/transaction";

@Component({
  selector: "app-report-liabassets-chart",
  templateUrl: "./report-liabassets-chart.component.html",
  styleUrls: ["./report-liabassets-chart.component.css"]
})
export class ReportLiabassetsChartComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  transactions: Transaction[];
  displayTransactionTotals: Transaction[];
  chartData: any;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transactions = data["transactions"];
    });
    this.getBarChartData();
  }

  getBarChartData() {
    this.chartData = [];
    this.chartData.push({ data: [], label: "Assets" });
    this.chartData.forEach(c => {
      for (let i = 0; i < 12; i++) {
        c.data.push(typeTotalByMonth(i, 3, this.transactions));
      }
    });
    this.chartData.push({ data: [], label: "Liabilities" });
    this.chartData.forEach(c => {
      for (let i = 0; i < 12; i++) {
        c.data.push(typeTotalByMonth(i, 4, this.transactions));
      }
    });
  }
}
