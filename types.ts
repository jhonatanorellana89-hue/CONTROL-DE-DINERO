
import { Timestamp } from 'firebase/firestore';

export interface Transaction {
  id: string;
  type: 'Ingreso' | 'Egreso';
  amount: number;
  bankId: string;
  categoryId: string;
  categoryName?: string;
  description: string;
  date: Timestamp;
  createdAt: Timestamp;
}

export interface Bank {
  id: string;
  name: string;
  balance: number;
  type: string;
  currency: string;
  createdAt: Timestamp;
}

export interface Debt {
  id: string;
  name: string;
  bankId: string;
  outstanding: number;
  monthlyPayment: number;
  createdAt: Timestamp;
}

export interface Category {
  id: string;
  name: string;
  limitMonthly: number;
  createdAt: Timestamp;
}

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  bankId: string;
  categoryId: string;
  nextDueDay: number;
  createdAt: Timestamp;
}

export interface Saving {
  id: string;
  name: string;
  target: number;
  balance: number;
  bankId: string;
  createdAt: Timestamp;
}
