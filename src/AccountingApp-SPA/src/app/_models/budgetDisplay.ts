import { Budget } from './budget';
import { DecimalPipe } from '@angular/common';
import { Transaction } from './transaction';

export interface BudgetDisplay {
    budgetList: Budget[];
    transactionTotal: number;
    typeDescription: string;
    typeId: number;
    total: number;
}
