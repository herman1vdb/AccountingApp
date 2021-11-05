import { Component, OnInit } from '@angular/core';
import { Account } from '../../_models/account';
import { AccountService } from '../../_services/account.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { a } from '@angular/core/src/render3';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[];
  incomeAcc: Account[];
  expenseAcc: Account[];
  assetAcc: Account[];
  liabilityAcc: Account[];


  constructor(private accountService: AccountService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.accounts = data['accounts'];
      this.incomeAcc = this.accounts.filter(acc => acc.typeId === 1);
      this.expenseAcc = this.accounts.filter(acc => acc.typeId === 2);
      this.assetAcc = this.accounts.filter(acc => acc.typeId === 3);
      this.liabilityAcc = this.accounts.filter(acc => acc.typeId === 4);
    });
  }
}
