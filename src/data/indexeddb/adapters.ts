import { db } from './client';
import { Gestora, Contato, Interacao, Oportunidade } from '../../types/domain';

/**
 * Implementações de repositório utilizando IndexedDB via Dexie. Cada repositório
 * expõe métodos CRUD assíncronos que se integram com o banco local.
 */
export const IndexedDbGestoraRepo = {
  async list(): Promise<Gestora[]> {
    return db.gestoras.toArray();
  },
  async get(id: string): Promise<Gestora | undefined> {
    return db.gestoras.get(id);
  },
  async create(data: Gestora): Promise<void> {
    await db.gestoras.put(data);
  },
  async update(id: string, data: Partial<Gestora>): Promise<void> {
    await db.gestoras.update(id, data);
  },
  async delete(id: string): Promise<void> {
    await db.gestoras.delete(id);
  },
};

export const IndexedDbContatoRepo = {
  async list(): Promise<Contato[]> {
    return db.contatos.toArray();
  },
  async get(id: string): Promise<Contato | undefined> {
    return db.contatos.get(id);
  },
  async create(data: Contato): Promise<void> {
    await db.contatos.put(data);
  },
  async update(id: string, data: Partial<Contato>): Promise<void> {
    await db.contatos.update(id, data);
  },
  async delete(id: string): Promise<void> {
    await db.contatos.delete(id);
  },
};

export const IndexedDbInteracaoRepo = {
  async list(): Promise<Interacao[]> {
    return db.interacoes.toArray();
  },
  async get(id: string): Promise<Interacao | undefined> {
    return db.interacoes.get(id);
  },
  async create(data: Interacao): Promise<void> {
    await db.interacoes.put(data);
  },
  async update(id: string, data: Partial<Interacao>): Promise<void> {
    await db.interacoes.update(id, data);
  },
  async delete(id: string): Promise<void> {
    await db.interacoes.delete(id);
  },
};

export const IndexedDbOportunidadeRepo = {
  async list(): Promise<Oportunidade[]> {
    return db.oportunidades.toArray();
  },
  async get(id: string): Promise<Oportunidade | undefined> {
    return db.oportunidades.get(id);
  },
  async create(data: Oportunidade): Promise<void> {
    await db.oportunidades.put(data);
  },
  async update(id: string, data: Partial<Oportunidade>): Promise<void> {
    await db.oportunidades.update(id, data);
  },
  async delete(id: string): Promise<void> {
    await db.oportunidades.delete(id);
  },
};
