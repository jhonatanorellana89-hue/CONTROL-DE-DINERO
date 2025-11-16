
import React from 'react';
import { DashboardIcon } from './icons/DashboardIcon';
import { TransactionIcon } from './icons/TransactionIcon';
import { BankIcon } from './icons/BankIcon';
import { CategoryIcon } from './icons/CategoryIcon';
import { MoreIcon } from './icons/MoreIcon';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const NavButton: React.FC<{
  label: string;
  view: string;
  activeView: string;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, view, activeView, onClick, children }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'text-teal-400 bg-teal-400/10'
          : 'text-gray-400 hover:bg-gray-700/50'
      }`}
    >
      {children}
      <span className="text-xs font-bold mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="bottom-nav flex gap-2 p-2 justify-between bg-gray-800/50 border-t border-gray-700/50">
      <NavButton label="Resumen" view="dashboard" activeView={activeView} onClick={() => setActiveView('dashboard')}>
        <DashboardIcon className="w-6 h-6" />
      </NavButton>
      <NavButton label="Transacciones" view="transactions" activeView={activeView} onClick={() => setActiveView('transactions')}>
        <TransactionIcon className="w-6 h-6" />
      </NavButton>
      <NavButton label="Cuentas" view="accounts" activeView={activeView} onClick={() => setActiveView('accounts')}>
        <BankIcon className="w-6 h-6" />
      </NavButton>
      <NavButton label="Categorías" view="categories" activeView={activeView} onClick={() => setActiveView('categories')}>
        <CategoryIcon className="w-6 h-6" />
      </NavButton>
      <NavButton label="Más" view="more" activeView={activeView} onClick={() => setActiveView('more')}>
        <MoreIcon className="w-6 h-6" />
      </NavButton>
    </nav>
  );
};

export default BottomNav;
