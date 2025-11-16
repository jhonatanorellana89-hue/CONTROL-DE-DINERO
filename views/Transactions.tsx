
import React from 'react';
import Card from '../components/Card';

const Transactions: React.FC = () => {
  // Placeholder content. Full implementation would require state management for filters, transaction list, and a modal for adding/editing.
  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg text-white">Transacciones</h2>
          <p className="text-sm text-gray-400">Historial de ingresos y egresos</p>
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg text-sm">
          Agregar
        </button>
      </div>
      <div className="mt-4 text-center text-gray-400">
        <p>La vista de transacciones está en construcción.</p>
        <p className="text-xs mt-2">Aquí se mostrará la lista completa de transacciones con filtros y búsqueda.</p>
      </div>
    </Card>
  );
};

export default Transactions;
