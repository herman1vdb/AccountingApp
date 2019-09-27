import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AccountsComponent } from "./accounts/accounts/accounts.component";
import { AuthGuard } from "./_guards/auth.guard";
import { AccountDetailResolver } from "./_resolvers/account-detail.resolver";
import { AccountListResolver } from "./_resolvers/account-list.resolver";
import { AccountEditResolver } from "./_resolvers/account-edit.resolver";
import { AccountEditComponent } from "./accounts/account-edit/account-edit/account-edit.component";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { TransactionsComponent } from "./transactions/transactions/transactions.component";
import { TransactionEditComponent } from "./transactions/transaction-edit/transaction-edit.component";
import { TransactionEditResolver } from "./_resolvers/transaction-edit.resolver";
import { AccountCreateComponent } from "./accounts/account-create/account-create.component";
import { AccountCreateResolver } from "./_resolvers/account-create.resolver";
import { BudgetComponent } from "./budget/budget/budget.component";
import { BudgetDisplayResolver } from "./_resolvers/budget-display.resolver";
import { ReportComponent } from "./reports/report/report.component";
import { TransactionListResolver } from "./_resolvers/transaction-list.resolver";
import { ReportFilterComponent } from "./reports/report-filter/report-filter.component";
import { ReportChartComponent } from "./reports/report-chart/report-chart.component";
import { ReportExpincChartComponent } from "./reports/report-chart/report-expinc-chart/report-expinc-chart.component";
import { ReportLiabassetsChartComponent } from "./reports/report-chart/report-liabassets-chart/report-liabassets-chart.component";
import { ReportCashflowChartComponent } from "./reports/report-chart/report-cashflow-chart/report-cashflow-chart.component";
import { ReportAccountChartComponent } from "./reports/report-chart/report-account-chart/report-account-chart.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "budget",
        component: BudgetComponent,
        resolve: { budget: BudgetDisplayResolver }
      },
      {
        path: "accounts",
        component: AccountsComponent,
        resolve: { accounts: AccountListResolver }
      },
      // tslint:disable-next-line:max-line-length
      {
        path: "accounts/create",
        component: AccountCreateComponent,
        resolve: { types: AccountCreateResolver }
      },
      {
        path: "accounts/edit/:id",
        component: AccountEditComponent,
        resolve: { account: AccountEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: "transactions",
        component: TransactionsComponent,
        resolve: { accounts: AccountListResolver }
      },
      {
        path: "transactions/edit/:id",
        component: TransactionEditComponent,
        resolve: {
          transaction: TransactionEditResolver,
          accounts: AccountListResolver
        },
        canDeactivate: [PreventUnsavedChanges]
      },
      { path: "reports", component: ReportComponent },
      {
        path: "report/filter",
        component: ReportFilterComponent,
        resolve: {
          transactions: TransactionListResolver,
          accounts: AccountListResolver
        }
      },
      {
        path: "report/chart",
        component: ReportChartComponent,
        resolve: {
          transactions: TransactionListResolver,
          accounts: AccountListResolver
        }
      },
      {
        path: "report/accountchart",
        component: ReportAccountChartComponent,
        resolve: {
          transactions: TransactionListResolver,
          accounts: AccountListResolver
        }
      },
      {
        path: "report/expincchart",
        component: ReportExpincChartComponent,
        resolve: {
          transactions: TransactionListResolver,
          accounts: AccountListResolver
        }
      },
      {
        path: "report/liabassetschart",
        component: ReportLiabassetsChartComponent,
        resolve: {
          transactions: TransactionListResolver,
          accounts: AccountListResolver
        }
      },
      {
        path: "report/cashflowchart",
        component: ReportCashflowChartComponent,
        resolve: {
          transactions: TransactionListResolver,
          accounts: AccountListResolver
        }
      }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
