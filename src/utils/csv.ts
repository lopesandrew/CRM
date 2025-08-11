import Papa from 'papaparse';

/**
 * Exporta um array de objetos para um arquivo CSV e inicia o download no
 * navegador. Inclui o BOM UTF‑8 para garantir compatibilidade com Excel.
 */
export function exportToCSV<T>(data: T[], filename: string) {
  const csv = Papa.unparse(data, { bom: true });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Importa um arquivo CSV e converte em array de objetos tipados. Retorna uma
 * Promise que resolve para os dados lidos. Cabe ao chamador mapear colunas
 * adequadamente.
 */
export function importFromCSV<T>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data as T[]);
      },
      error: (err) => reject(err),
    });
  });
}