import { Component, OnInit } from '@angular/core';
import { TransactionType } from 'src/app/models/enum';
import { transactions } from './../../data/transactions';
import { users } from './../../data/users';
import { TabType } from './../../models/enum';
import { Transaction, User } from './../../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userBalance: number;
  showUserBalance = false;
  selectedUser: User;
  usersData: User[];
  transactionData: Transaction[];
  selectedTab: TabType;
  selecteAmount: number;
  showDeposit: boolean;
  showWithDraw: boolean;
  fromUser: User;
  toUser: User;
  showTransfer: boolean;
  userStatement: Transaction[];
  showStatement: boolean;
  resetDD: boolean;
  showSameUserTrasnError: boolean;
  fromUserBalance: number;
  toUserBalance: number;
  noBalanceError: boolean;
  get tabType(): typeof TabType {
    return TabType;
  }
  get transactionType(): typeof TransactionType {
    return TransactionType;
  }
  constructor() { }

  ngOnInit(): void {
    this.selectedTab = TabType.balance;
    this.usersData = users;
    this.transactionData = transactions;
  }
  onChangeUser(user: User): void {
    this.selectedUser = user;
  }
  reset(): void {
    this.resetDD = !this.resetDD;
    this.selectedUser = null;
    this.showUserBalance = false;
    this.showDeposit = false;
    this.showWithDraw = false;
    this.showTransfer = false;
    this.showStatement = false;
    this.toUserBalance = null;
    this.fromUserBalance = null;
    this.noBalanceError = false;
  }
  onChangeAmount(amount: number): void {
    this.selecteAmount = amount;
  }
  checkBalance(): void {
    if (this.selectedUser) {
      this.transactionData = transactions;
      const creditTrans: number[] =
        this.transactionData.filter(t => t.userId === this.selectedUser.id && t.transactionType === TransactionType.credit)
          .map(x => x.amount);
      let creditTotal = 0;
      creditTrans.forEach(element => {
        creditTotal = creditTotal + element;
      });
      const debitTrans: number[] =
        this.transactionData.filter(t => t.userId === this.selectedUser.id && t.transactionType === TransactionType.debit)
          .map(x => x.amount);
      let debitTotal = 0;
      debitTrans.forEach(element => {
        debitTotal = debitTotal + element;
      });
      this.userBalance = creditTotal - debitTotal;
      this.showUserBalance = true;
    }
  }
  depositFund(): void {
    if (this.selectedUser) {
      this.transactionData.push({
        userId: this.selectedUser.id,
        transactionType: TransactionType.credit,
        amount: this.selecteAmount,
        date: new Date()
      });
      this.checkBalance();
      this.showDeposit = true;
    }
  }
  withdrawFund(): void {
    if (this.selectedUser) {
      this.transactionData.push({
        userId: this.selectedUser.id,
        transactionType: TransactionType.debit,
        amount: this.selecteAmount,
        date: new Date()
      });
      this.checkBalance();
      this.showWithDraw = true;
    }
  }
  onChangeToUser(user: User): void {
    this.toUser = user;
    this.showSameUserTrasnError = true;
    this.selectedUser = user;
    this.checkBalance();
    this.toUserBalance = this.userBalance;
  }
  onChangeFromUser(user: User): void {
    this.fromUser = user;
    this.selectedUser = user;
    this.checkBalance();
    this.noBalanceError = true;
    this.fromUserBalance = this.userBalance;
  }
  onTransfer(): void {
    if (this.toUser && this.fromUser) {
      this.transactionData.push({
        userId: this.fromUser.id,
        transactionType: TransactionType.debit,
        amount: this.selecteAmount,
        date: new Date()
      });
      this.transactionData.push({
        userId: this.toUser.id,
        transactionType: TransactionType.credit,
        amount: this.selecteAmount,
        date: new Date()
      });
      this.selectedUser = this.toUser;
      this.checkBalance();
      this.showTransfer = true;
    }
  }
  checkStatement(): void {
    this.showStatement = true;
    this.userStatement = [];
    this.transactionData = transactions;

    this.userStatement = this.transactionData.filter(t => t.userId === this.selectedUser.id);
    this.checkBalance();
  }
}
