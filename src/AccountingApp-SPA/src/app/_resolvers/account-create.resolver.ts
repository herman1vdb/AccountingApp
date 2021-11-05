import { Injectable } from '@angular/core';
import { Type } from '../_models/type';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AccountCreateResolver implements Resolve<Type[]> {
    constructor(private accountService: AccountService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Type[]> {
        return this.accountService.getTypes().pipe(
            catchError(err => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
