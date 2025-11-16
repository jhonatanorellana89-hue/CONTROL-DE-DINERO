
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { Transaction, Bank, Debt, Category, FixedExpense, Saving } from '../types';

interface DataContextProps {
  transactions: Transaction[];
  banks: Bank[];
  debts: Debt[];
  categories: Category[];
  fixedExpenses: FixedExpense[];
  savings: Saving[];
  loading: boolean;
}

const DataContext = createContext<DataContextProps>({
  transactions: [],
  banks: [],
  debts: [],
  categories: [],
  fixedExpenses: [],
  savings: [],
  loading: true,
});

export const useData = () => useContext(DataContext);

interface DataProviderProps {
  children: ReactNode;
  userId: string;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children, userId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);
  const [savings, setSavings] = useState<Saving[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const collections: { name: string; setter: Function; orderField: string, orderDirection?: 'asc'|'desc' }[] = [
      { name: 'transactions', setter: setTransactions, orderField: 'date', orderDirection: 'desc' },
      { name: 'banks', setter: setBanks, orderField: 'name' },
      { name: 'debts', setter: setDebts, orderField: 'createdAt', orderDirection: 'desc' },
      { name: 'categories', setter: setCategories, orderField: 'name' },
      { name: 'fixedExpenses', setter: setFixedExpenses, orderField: 'name' },
      { name: 'savings', setter: setSavings, orderField: 'createdAt', orderDirection: 'desc' },
    ];
    
    const unsubscribers = collections.map(({ name, setter, orderField, orderDirection = 'asc' }) => {
      const collRef = collection(db, `users/${userId}/${name}`);
      const q = query(collRef, orderBy(orderField, orderDirection));
      return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setter(data);
      }, (error) => {
        console.error(`Error fetching ${name}: `, error);
      });
    });

    setLoading(false);

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [userId]);

  const value = { transactions, banks, debts, categories, fixedExpenses, savings, loading };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
