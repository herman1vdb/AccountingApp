import { Component, OnInit } from '@angular/core';
import { Account } from '../_models/account';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[];

  constructor(private accountService: AccountService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe((accounts: Account[]) => {
      this.accounts = accounts;
    }, error => {
      this.alertify.error(error);
    });
  }

}
