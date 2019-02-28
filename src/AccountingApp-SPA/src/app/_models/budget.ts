import { Transaction } from './transaction';
import { Account } from './account';

export interface Budget {
    account: Account;
    transactions: Transaction;
}
