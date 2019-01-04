import { Component, OnInit } from '@angular/core';
import { Account } from '../../_models/account';
import { AccountService } from '../../_services/account.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[];

  constructor(private accountService: AccountService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.accounts = data['accounts'];
    });
  }
}
