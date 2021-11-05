import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-report-chart",
  templateUrl: "./report-chart.component.html",
  styleUrls: ["./report-chart.component.css"]
})
export class ReportChartComponent implements OnInit {
  @Input() chartData: any;
  constructor() {}

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
    this.barChartData = this.chartData;
  }

  ngOnChanges() {
    this.barChartData = this.chartData;
  }
}
