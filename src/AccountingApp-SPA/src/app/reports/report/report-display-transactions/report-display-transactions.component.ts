import { Component, OnInit, Input } from "@angular/core";
import { Transaction } from "src/app/_models/transaction";

@Component({
  selector: "app-report-display-transactions",
  templateUrl: "./report-display-transactions.component.html",
  styleUrls: ["./report-display-transactions.component.css"]
})
export class ReportDisplayTransactionsComponent implements OnInit {
  @Input() transactions: Transaction[];
  constructor() {}

  ngOnInit() {}
}
