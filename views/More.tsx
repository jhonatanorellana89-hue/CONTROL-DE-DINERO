
import React from 'react';
import Card from '../components/Card';
import { ClockIcon } from '../components/icons/ClockIcon';
import { PiggyBankIcon } from '../components/icons/PiggyBankIcon';
import { UploadIcon } from '../components/icons/UploadIcon';
import { DownloadIcon } from '../components/icons/DownloadIcon';

const More: React.FC = () => {
  // This view aggregates multiple features. Data would be pulled from useData hook.
  return (
    <div>
      <Card>
        <h2 className="font-bold text-lg text-white mb-3">Gastos Fijos</h2>
        <p className="text-sm text-gray-400 mb-4">Pagos recurrentes como alquiler, suscripciones, etc.</p>
        <button className="w-full flex items-center justify-center gap-2 border border-gray-600 hover:bg-gray-700 text-gray-300 font-bold py-2 px-3 rounded-lg text-sm">
          <ClockIcon className="w-5 h-5" />
          Gestionar Gastos Fijos
        </button>
      </Card>
      <Card>
        <h2 className="font-bold text-lg text-white mb-3">Ahorros</h2>
        <p className="text-sm text-gray-400 mb-4">Define y sigue tus metas de ahorro.</p>
        <button className="w-full flex items-center justify-center gap-2 border border-gray-600 hover:bg-gray-700 text-gray-300 font-bold py-2 px-3 rounded-lg text-sm">
          <PiggyBankIcon className="w-5 h-5" />
          Gestionar Planes de Ahorro
        </button>
      </Card>
      <Card>
        <h2 className="font-bold text-lg text-white mb-3">Importar / Exportar</h2>
        <p className="text-sm text-gray-400 mb-4">Haz un respaldo o importa datos de otras fuentes.</p>
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg text-sm">
            <UploadIcon className="w-5 h-5" />
            Importar
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-lg text-sm">
            <DownloadIcon className="w-5 h-5" />
            Exportar
          </button>
        </div>
      </Card>
    </div>
  );
};

export default More;
