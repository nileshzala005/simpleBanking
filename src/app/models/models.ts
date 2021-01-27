import { TransactionType } from "./enum";

export interface User {
  id: number;
  name: string;
}
export interface Transaction {
  userId: number;
  transactionType: TransactionType;
  amount: number;
  date: Date;
}
