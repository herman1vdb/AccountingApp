import { Injectable } from '@angular/core';
import { Account } from '../_models/account';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AccountDetailResolver implements Resolve<Account> {
    constructor(private accountService: AccountService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Account> {
        return this.accountService.getAccount(route.params['id']).pipe(
            catchError(err => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/accounts']);
                return of(null);
            })
        );
    }
}
