import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface Props<T extends object> {
  data: T[];
  columns: Column<T>[];
}

/**
 * Componente genérico de tabela utilizando TanStack Table. Recebe dados e colunas simples
 * e gera automaticamente as definições de coluna para a table.
 */
function DataTable<T extends object>({ data, columns }: Props<T>) {
  const columnDefs = React.useMemo<ColumnDef<T>[]>(() =>
    columns.map((c) => ({
      header: c.header,
      accessorKey: c.accessor as string,
    })),
    [columns]
  );
  const table = useReactTable<T>({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider"
                >
                  {header.isPlaceholder ? null : (header.column.columnDef.header as string)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2 whitespace-nowrap">
                  {cell.getValue() as any}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;