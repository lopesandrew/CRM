import Dexie, { Table } from 'dexie';
import { Gestora, Contato, Interacao, Oportunidade } from '../../types/domain';

/**
 * Instância do banco Dexie com as tabelas necessárias. As chaves primárias são
 * baseadas nos campos `id` e índices simples são criados nos campos mais
 * pesquisados conforme especificação.
 */
class CRMDB extends Dexie {
  gestoras!: Table<Gestora, string>;
  contatos!: Table<Contato, string>;
  interacoes!: Table<Interacao, string>;
  oportunidades!: Table<Oportunidade, string>;

  constructor() {
    super('crm-db');
    this.version(1).stores({
      gestoras: 'id, nome',
      contatos: 'id, gestoraId, email',
      interacoes: 'id, gestoraId, data',
      oportunidades: 'id, gestoraId, estagio',
    });
  }
}

export const db = new CRMDB();