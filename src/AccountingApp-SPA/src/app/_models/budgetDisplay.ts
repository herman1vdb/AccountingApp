import { Budget } from './budget';
import { DecimalPipe } from '@angular/common';
import { Transaction } from './transaction';

export interface BudgetDisplay {
    budgetList: Budget[];
    typeDescription: string;
    typeId: number;
    totalBudget: number;
    totalTransactions: number;
    totalDifference: number;
}
