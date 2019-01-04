import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_guards/auth.guard';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountDetailResolver } from './_resolvers/account-detail.resolver';
import { AccountListResolver } from './_resolvers/account-list.resolver';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'accounts', component: AccountsComponent, resolve: {accounts: AccountListResolver}  },
            { path: 'accounts/:id', component: AccountDetailComponent, resolve: {account: AccountDetailResolver} },
            { path: 'user', component: UserComponent },
            { path: 'user/edit', component: UserEditComponent, resolve: {user: UserEditResolver} },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
