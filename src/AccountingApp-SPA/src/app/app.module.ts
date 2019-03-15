import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { UserComponent } from './users/user/user.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';

import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { AccountsComponent } from './accounts/accounts/accounts.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { AccountService } from './_services/account.service';
import { BudgetService } from './_services/budget.service';
import { AccountDetailResolver } from './_resolvers/account-detail.resolver';
import { AccountListResolver } from './_resolvers/account-list.resolver';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { AccountEditComponent } from './accounts/account-edit/account-edit/account-edit.component';
import { AccountEditResolver } from './_resolvers/account-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { TransactionsComponent } from './transactions/transactions/transactions.component';
import { TransactionEditComponent } from './transactions/transaction-edit/transaction-edit.component';
import { TransactionService } from './_services/transaction.service';
import { TransactionEditResolver } from './_resolvers/transaction-edit.resolver';
import { TransactionListResolver } from './_resolvers/transaction-list.resolver';
import { AccountCreateComponent } from './accounts/account-create/account-create.component';
import { TransactionCreateComponent } from './transactions/transaction-create/transaction-create.component';
import { AccountCreateResolver } from './_resolvers/account-create.resolver';
import { BudgetComponent } from './budget/budget/budget.component';
import { BudgetDisplayComponent } from './budget/budget-display/budget-display.component';
import { BudgetDisplayResolver } from './_resolvers/budget-display.resolver';
import { TransactionCreateInputformComponent } from './transactions/transaction-create-inputform/transaction-create-inputform.component';
import { TransactionsConsolidationComponent } from './transactions/transactions-consolidation/transactions-consolidation.component';
import { BudgetSummaryComponent } from './budget/budget-summary/budget-summary.component';
import { TransactionsDisplayComponent } from './transactions/transactions-display/transactions-display.component';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      AccountsComponent,
      UserEditComponent,
      AccountEditComponent,
      AccountCreateComponent,
      TransactionsComponent,
      TransactionEditComponent,
      TransactionCreateComponent,
      TransactionCreateInputformComponent,
      TransactionsDisplayComponent,
      TransactionsConsolidationComponent,
      BudgetComponent,
      BudgetDisplayComponent,
      BudgetSummaryComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
})
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      BudgetService,
      AuthGuard,
      PreventUnsavedChanges,
      AccountService,
      AccountDetailResolver,
      AccountListResolver,
      UserEditResolver,
      AccountEditResolver,
      AccountCreateResolver,
      TransactionService,
      TransactionEditResolver,
      TransactionListResolver,
      BudgetDisplayResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
