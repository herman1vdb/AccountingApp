import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Account } from 'src/app/_models/account';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {
  account: Account;
  @ViewChild('creationForm') creationForm: NgForm;
  constructor(private accountService: AccountService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  createAccount() {
    this.account = {
      id: null,
      description: this.creationForm.value.description,
      typeId: 3,
      type: null,
      budget: 500.50
    };
    console.log(this.account);
    this.accountService.createAccount(this.account).subscribe(next => {
      this.alertify.success('Account updated successfully');
      this.creationForm.reset(this.account);
    }, error => {
      this.alertify.error(error);
    });
  }
}
