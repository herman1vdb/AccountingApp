import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { TransactionService } from "src/app/_services/transaction.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { Transaction } from "src/app/_models/transaction";
import { Account } from "src/app/_models/account";

@Component({
  selector: "app-transaction-edit",
  templateUrl: "./transaction-edit.component.html",
  styleUrls: ["./transaction-edit.component.css"]
})
export class TransactionEditComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm;
  transaction: Transaction;
  accounts: Account[];
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.transaction = data["transaction"];
      this.accounts = data["accounts"];
      this.transaction.accountDebit = this.accounts.find(
        a => a.id.toString() === this.transaction.accountDebitId.toString()
      );
      this.transaction.accountCredit = this.accounts.find(
        a => a.id.toString() === this.transaction.accountCreditId.toString()
      );
    });
  }

  updateTransaction() {    
    this.transactionService
      .updateTransaction(this.transaction.id, this.transaction)
      .subscribe(
        next => {
          this.alertify.success("Transaction updated successfully");
          this.editForm.reset(this.transaction);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
