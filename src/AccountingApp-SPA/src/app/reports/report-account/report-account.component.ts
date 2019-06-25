import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Transaction } from "src/app/_models/transaction";

@Component({
  selector: "app-report-account",
  templateUrl: "./report-account.component.html",
  styleUrls: ["./report-account.component.css"]
})
export class ReportAccountComponent implements OnInit {
  transactions: Transaction[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transactions = data["transactions"];
      console.log(this.transactions);
    });
  }
}
