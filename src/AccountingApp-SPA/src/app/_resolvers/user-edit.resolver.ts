import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UserEditResolver implements Resolve<User> {
    constructor(private router: Router, private alertify: AlertifyService, private authService: AuthService) { }
    resolve(route: ActivatedRouteSnapshot): User {
        try {
            const user: User = {
                id: this.authService.decodedToken.nameid,
                username: this.authService.decodedToken.unique_name
            };
            return user;
        } catch {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/home']);
            return null;
        }
    }
}
