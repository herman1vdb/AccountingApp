import { Injectable } from '@angular/core';
import { Budget } from '../_models/budget';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BudgetService } from '../_services/budget.service';

@Injectable()
export class BudgetDisplayResolver implements Resolve<Budget[]> {
    constructor(private budgetService: BudgetService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Budget[]> {
        console.log('jhkhk');
        return this.budgetService.getBudget().pipe(
            catchError(err => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
