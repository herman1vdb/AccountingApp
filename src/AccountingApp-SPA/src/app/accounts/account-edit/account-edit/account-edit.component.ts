import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Account } from '../../../_models/account';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  account: Account;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute, private accountService: AccountService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.account = data['account'];
      console.log(this.account);
    });
  }
  updateAccount() {
    this.accountService.updateAccount(this.account.id, this.account).subscribe(next => {
      this.alertify.success('Account updated successfully');
      this.editForm.reset(this.account);
    }, error => {
      this.alertify.error(error);
    });
  }

}
