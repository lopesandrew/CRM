import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Item {
  date: string;
  title: string;
}

/**
 * Lista simples para exibir próximos passos ou eventos. Recebe itens com data
 * e título e formata a data para exibição.
 */
const CalendarList: React.FC<{ items: Item[] }> = ({ items }) => {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="p-2 border rounded bg-white dark:bg-gray-800">
          <div className="font-medium">{item.title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {format(new Date(item.date), 'PPPP', { locale: ptBR })}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CalendarList;