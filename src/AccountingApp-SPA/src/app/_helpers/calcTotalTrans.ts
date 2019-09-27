import { Transaction } from "../_models/transaction";
import { Account } from "../_models/account";
import * as moment from 'moment';

var totals = { debits: 0, credits: 0 };

export function calcTotalTransPerAccount(
  transactions: Transaction[],
  account: Account
) {
  totals.debits = 0;
  totals.credits = 0;

  const debitTransactions = transactions.filter(
    t => t.accountDebitId === account.id
  );
  const creditTransactions = transactions.filter(
    t => t.accountCreditId === account.id
  );

  sumTransactions(debitTransactions, "d");
  sumTransactions(creditTransactions, "c");

  return calculateTotal(account.typeId);
}

export function calcTotalTransPerType(
  transactions: Transaction[],
  typeId: number
) {
  totals.debits = 0;
  totals.credits = 0;

  const debitTransactions = transactions.filter(
    t => t.accountDebit.typeId === typeId
  );

  const creditTransactions = transactions.filter(
    t => t.accountCredit.typeId === typeId
  );

  sumTransactions(debitTransactions, "d");
  sumTransactions(creditTransactions, "c");

  return calculateTotal(typeId);
}

export function typeTotalByMonth(month, type, transactions) {  
  return calcTotalTransPerType(transactions.filter(t => {
    return moment(t.date).month() === month;
  }), type);
}

function sumTransactions(transactions, typeTrans) {
  if (transactions.length > 0) {
    if (typeTrans === "d") {
      totals.debits = sum(transactions);
    }
    if (typeTrans === "c") {
      totals.credits = sum(transactions);
    }
  }
}

function sum(transactions) {
  return transactions
    .map(a => a.amount)
    .reduce((sum, current) => sum + current);
}

function calculateTotal(typeId) {
  if (typeId === 1 || typeId === 4) {
    return totals.credits - totals.debits;
  } else if (typeId === 2 || typeId === 3) {
    return totals.debits - totals.credits;
  } else {
    return 0;
  }
}
