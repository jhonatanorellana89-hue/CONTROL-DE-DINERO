
import React from 'react';
import Card from '../components/Card';
import { useData } from '../context/DataContext';
import { fmtMoney } from '../utils/helpers';
import { TagIcon } from '../components/icons/TagIcon';

const Categories: React.FC = () => {
  const { categories, loading } = useData();

  if (loading) return <p className="text-gray-400">Cargando categorías...</p>;

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-lg text-white">Categorías</h2>
          <p className="text-sm text-gray-400">Gestiona tus categorías de gastos</p>
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg text-sm">
          Nueva
        </button>
      </div>
      <div className="space-y-2">
        {categories.map(category => (
          <div key={category.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <TagIcon className="w-5 h-5 text-gray-300" />
              <p className="font-semibold text-white">{category.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white font-medium">
                {category.limitMonthly > 0 ? fmtMoney(category.limitMonthly) : 'Sin límite'}
              </p>
              <p className="text-xs text-gray-400">Límite Mensual</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Categories;
