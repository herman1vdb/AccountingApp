import { Account } from './account';

export interface Transaction {
    id: number;
    date: Date;
    accountDebit?: Account;
    accountDebitId: number;
    accountCredit?: Account;
    accountCreditId: number;
    description: string;
    amount: number;
}
