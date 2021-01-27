import { TransactionType } from './../models/enum';
import { Transaction } from '../models/models';

export const transactions: Transaction[] = [{
  userId: 1,
  transactionType: TransactionType.credit,
  amount: 2500,
  date: new Date(2020, 11, 20, 10, 33, 30, 0),
}, {
  userId: 1,
  transactionType: TransactionType.debit,
  amount: 500,
  date: new Date(2020, 11, 22, 10, 33, 30, 0),
}, {
  userId: 1,
  transactionType: TransactionType.debit,
  amount: 100,
  date: new Date(2020, 11, 23, 10, 33, 30, 0),
}, {
  userId: 2,
  transactionType: TransactionType.credit,
  amount: 5500,
  date: new Date(2020, 11, 24, 10, 33, 30, 0),
}];
