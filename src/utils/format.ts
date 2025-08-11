import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Formata um número em reais (BRL) com separadores de milhar e duas casas decimais.
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Formata uma data ISO ou objeto Date usando date-fns e locale pt-BR.
 * O padrão de formatação pode ser alterado conforme necessário.
 */
export function formatDate(value: string | Date, pattern = 'dd/MM/yyyy'): string {
  const date = value instanceof Date ? value : parseISO(value);
  return format(date, pattern, { locale: ptBR });
}