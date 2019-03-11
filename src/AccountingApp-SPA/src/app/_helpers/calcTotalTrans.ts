import { Transaction } from '../_models/transaction';
import { Account } from '../_models/account';

export function calcTotalTransPerAccount(transactions: Transaction[], account: Account) {

    let debits = 0;
    let credits = 0;

    const debitTransactions = transactions.filter(t => t.accountDebitId === account.id);
    const creditTransactions = transactions.filter(t => t.accountCreditId === account.id);

    if (debitTransactions.length > 0) {
        debits = debitTransactions.map(a => a.amount).reduce((sum, current) => sum + current);
    }

    if (creditTransactions.length > 0) {
        credits = creditTransactions.map(a => a.amount).reduce((sum, current) => sum + current);
    }

    if (account.typeId === 1 || account.typeId === 4) {
        return (credits - debits);
    } else
    if (account.typeId === 2 || account.typeId === 3) {
        return (debits - credits);
    } else {
        return (0);
    }
}
