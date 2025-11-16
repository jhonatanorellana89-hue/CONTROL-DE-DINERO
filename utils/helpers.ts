
import { Timestamp } from 'firebase/firestore';

export function fmtMoney(value: number | undefined | null): string {
  const num = Number(value) || 0;
  return 'S/ ' + num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function tsToDateStr(ts?: Timestamp): string {
  if (!ts) return '';
  return ts.toDate().toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}
