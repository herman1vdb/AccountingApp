import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountsComponent } from './accounts/accounts/accounts.component';
import { AuthGuard } from './_guards/auth.guard';
import { AccountDetailResolver } from './_resolvers/account-detail.resolver';
import { AccountListResolver } from './_resolvers/account-list.resolver';
import { AccountEditResolver } from './_resolvers/account-edit.resolver';
import { AccountEditComponent } from './accounts/account-edit/account-edit/account-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { TransactionsComponent } from './transactions/transactions/transactions.component';
import { TransactionListResolver } from './_resolvers/transaction-list.resolver';
import { TransactionEditComponent } from './transactions/transaction-edit/transaction-edit.component';
import { TransactionEditResolver } from './_resolvers/transaction-edit.resolver';
import { AccountCreateComponent } from './accounts/account-create/account-create.component';
import { TransactionCreateComponent } from './transactions/transaction-create/transaction-create.component';
import { AccountCreateResolver } from './_resolvers/account-create.resolver';
import { BudgetComponent } from './budget/budget/budget.component';
import { BudgetDisplayResolver } from './_resolvers/budget-display.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'budget', component: BudgetComponent, resolve: { budget: BudgetDisplayResolver }  },
            { path: 'accounts', component: AccountsComponent, resolve: { accounts: AccountListResolver } },
            // tslint:disable-next-line:max-line-length
            { path: 'accounts/create', component: AccountCreateComponent, resolve: {types: AccountCreateResolver} },
            {
                path: 'accounts/edit/:id', component: AccountEditComponent,
                resolve: { account: AccountEditResolver },
                canDeactivate: [PreventUnsavedChanges]
            },
            { path: 'transactions', component: TransactionsComponent, resolve: { transactions: TransactionListResolver } },
            // tslint:disable-next-line:max-line-length
            { path: 'transactions/create', component: TransactionCreateComponent, resolve: { accounts: AccountListResolver } },
            {
                path: 'transactions/edit/:id', component: TransactionEditComponent,
                resolve: { transaction: TransactionEditResolver },
                canDeactivate: [PreventUnsavedChanges]
        },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
