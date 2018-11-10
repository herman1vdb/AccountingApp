import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UserComponent } from './user/user.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'accounts', component: AccountsComponent },
    { path: 'user', component: UserComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
