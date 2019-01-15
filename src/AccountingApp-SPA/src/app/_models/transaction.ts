export interface Transaction {
    id: number;
    date: Date;
    debitCredit: string;
    description: string;
    amount: number;
}
