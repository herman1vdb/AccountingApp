import { Budget } from './budget';
import { Transaction } from './transaction';

export interface BudgetSummary {
    budget: Budget;
    totalTransactions: number;
}
