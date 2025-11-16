
import React from 'react';
import { CashIcon } from './icons/CashIcon';

interface HeaderProps {
  userId: string | null;
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  return (
    <header className="app-top flex items-center justify-between p-3 bg-gray-800/50 border-b border-gray-700/50">
      <div className="brand flex gap-3 items-center">
        <div className="logo w-11 h-11 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center font-black text-white text-lg shadow-md">
          <CashIcon className="w-6 h-6"/>
        </div>
        <div>
          <div className="title font-extrabold text-base text-gray-100">JHONATAN ORELLANA</div>
          <div className="subtitle text-xs text-gray-400">Control de Finanzas</div>
        </div>
      </div>
      <div className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full">
        {userId ? `UID: ...${userId.slice(-6)}` : 'Cargando...'}
      </div>
    </header>
  );
};

export default Header;
