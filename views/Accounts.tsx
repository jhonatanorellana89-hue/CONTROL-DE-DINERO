
import React from 'react';
import Card from '../components/Card';
import { useData } from '../context/DataContext';
import { fmtMoney } from '../utils/helpers';
import { BankIcon } from '../components/icons/BankIcon';

const Accounts: React.FC = () => {
    const { banks, debts, loading } = useData();

    if (loading) return <p className="text-gray-400">Cargando cuentas...</p>;

    return (
        <div>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="font-bold text-lg text-white">Cuentas Bancarias</h2>
                        <p className="text-sm text-gray-400">Tus activos y cuentas de ahorro</p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg text-sm">
                        Nueva Cuenta
                    </button>
                </div>
                <div className="space-y-3">
                    {banks.map(bank => (
                        <div key={bank.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-600 p-2 rounded-full">
                                    <BankIcon className="w-5 h-5 text-gray-300"/>
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{bank.name}</p>
                                    <p className="text-xs text-gray-400">{bank.type} - {bank.currency}</p>
                                </div>
                            </div>
                            <p className="font-bold text-white">{fmtMoney(bank.balance)}</p>
                        </div>
                    ))}
                </div>
            </Card>

             <Card>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="font-bold text-lg text-white">Deudas</h2>
                        <p className="text-sm text-gray-400">Préstamos y saldos pendientes</p>
                    </div>
                    <button className="border border-gray-600 hover:bg-gray-700 text-gray-300 font-bold py-2 px-3 rounded-lg text-sm">
                        Nueva Deuda
                    </button>
                </div>
                 <div className="space-y-3">
                    {debts.map(debt => (
                        <div key={debt.id} className="p-3 bg-gray-700/50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-white">{debt.name}</p>
                                <p className="font-bold text-red-400">{fmtMoney(debt.outstanding)}</p>
                            </div>
                             <p className="text-xs text-gray-400 mt-1">Cuota mensual: {fmtMoney(debt.monthlyPayment)}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Accounts;
