import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Account } from 'src/app/_models/account';
import { NgForm } from '@angular/forms';
import { Type } from 'src/app/_models/type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {
  account: Account;
  types: Type;
  @ViewChild('creationForm') creationForm: NgForm;
  constructor(private route: ActivatedRoute, private accountService: AccountService, private alertify: AlertifyService) { }

  ngOnInit() {
      this.route.data.subscribe(data => {
        this.types = data['types'];
      });
  }

  createAccount() {
    this.account = {
      id: null,
      description: this.creationForm.value.description,
      typeId: this.creationForm.value.types.id,
      type: this.creationForm.value.types,
      budget: Number(this.creationForm.value.budget),
      isActive: 1,
      isControlAccount: 0
    };
    this.accountService.createAccount(this.account).subscribe(next => {
      this.alertify.success('Account updated successfully');
      this.creationForm.reset();
    }, error => {
      this.alertify.error(error);
    });
  }
}
