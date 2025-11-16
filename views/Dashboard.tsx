
import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import { useData } from '../context/DataContext';
import { fmtMoney } from '../utils/helpers';
import { generateFinancialSummary } from '../services/geminiService';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { AlertIcon } from '../components/icons/AlertIcon';

const Dashboard: React.FC = () => {
  const { transactions, banks, debts, categories, loading } = useData();
  const [aiSummary, setAiSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const now = new Date();
  const currentMonthName = now.toLocaleString('es-ES', { month: 'long' });

  const summaryData = useMemo(() => {
    let income = 0;
    let expense = 0;
    const month = now.getMonth();
    const year = now.getFullYear();

    const currentMonthTransactions = transactions.filter(t => {
      const d = t.date.toDate();
      return d.getMonth() === month && d.getFullYear() === year;
    });

    currentMonthTransactions.forEach(t => {
      if (t.type === 'Egreso') {
        expense += t.amount;
      } else {
        income += t.amount;
      }
    });

    const totalAssets = banks.reduce((acc, b) => acc + b.balance, 0);
    const totalLiabilities = debts.reduce((acc, d) => acc + d.outstanding, 0);

    return { income, expense, balance: income - expense, netAssets: totalAssets - totalLiabilities, currentMonthTransactions };
  }, [transactions, banks, debts]);

  const alerts = useMemo(() => {
    return categories
      .map(cat => {
        if (!cat.limitMonthly || cat.limitMonthly <= 0) return null;
        
        const total = summaryData.currentMonthTransactions
          .filter(t => t.categoryId === cat.id && t.type === 'Egreso')
          .reduce((acc, t) => acc + t.amount, 0);

        const percentage = (total / cat.limitMonthly) * 100;

        if (percentage >= 100) {
          return { level: 'danger', text: `${cat.name}: ${fmtMoney(total)} / ${fmtMoney(cat.limitMonthly)} (Superado)` };
        }
        if (percentage >= 80) {
          return { level: 'warning', text: `${cat.name}: ${fmtMoney(total)} / ${fmtMoney(cat.limitMonthly)} (Cerca del límite)` };
        }
        return null;
      })
      .filter(Boolean);
  }, [categories, summaryData.currentMonthTransactions]);

  const handleGenerateSummary = async () => {
      setIsSummaryLoading(true);
      setAiSummary('');
      const summary = await generateFinancialSummary(summaryData.currentMonthTransactions, categories, currentMonthName);
      setAiSummary(summary);
      setIsSummaryLoading(false);
  };

  if (loading) return <p className="text-gray-400">Cargando resumen...</p>;

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg text-white">Resumen Mensual</h2>
            <p className="text-sm text-gray-400 capitalize">{currentMonthName} {now.getFullYear()}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-gray-700/50 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Balance del Mes</div>
            <div className="font-extrabold text-2xl text-white mt-1">{fmtMoney(summaryData.balance)}</div>
            <div className="text-xs text-gray-500 mt-2">Ingresos: {fmtMoney(summaryData.income)}</div>
            <div className="text-xs text-gray-500">Egresos: {fmtMoney(summaryData.expense)}</div>
          </div>
          <div className="w-32 bg-gray-700/50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-400">Activos Netos</div>
            <div className="font-extrabold text-lg text-white mt-1">{fmtMoney(summaryData.netAssets)}</div>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-white">Resumen con IA</h3>
             <button
                onClick={handleGenerateSummary}
                disabled={isSummaryLoading}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 text-white font-bold py-2 px-3 rounded-lg text-sm transition-all duration-200"
            >
                <SparklesIcon className="w-4 h-4" />
                {isSummaryLoading ? 'Generando...' : 'Generar'}
            </button>
        </div>
        {isSummaryLoading && <div className="text-center p-4 text-gray-400">Analizando tus finanzas...</div>}
        {aiSummary && (
             <div className="mt-4 p-3 bg-gray-900/50 rounded-lg prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: aiSummary.replace(/\n/g, '<br />') }}></div>
        )}
      </Card>

      <Card>
        <h3 className="font-bold text-base text-white mb-3">Alertas de Presupuesto</h3>
        {alerts.length > 0 ? (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div key={index} className={`flex items-start gap-3 p-2 rounded-lg text-sm ${alert?.level === 'danger' ? 'bg-red-500/10 text-red-300' : 'bg-yellow-500/10 text-yellow-300'}`}>
                <AlertIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{alert?.text}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No hay alertas este mes. ¡Buen trabajo!</p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
