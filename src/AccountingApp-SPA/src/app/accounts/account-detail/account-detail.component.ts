import { Component, OnInit } from '@angular/core';
import { Account } from '../../_models/account';
import { AccountService } from '../../_services/account.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  account: Account;

  constructor(private accountService: AccountService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.account = data['account'];
    });
  }
}
