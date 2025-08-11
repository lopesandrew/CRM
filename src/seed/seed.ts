import { db } from '../data/indexeddb/client';
import { Gestora, Contato, Interacao, Oportunidade } from '../types/domain';

/**
 * Script de seed para popular o banco IndexedDB com dados de exemplo. Use
 * `npm run seed` para executar via ts-node. Estes dados não são
 * sincronizados e servem apenas para demonstração.
 */
async function seed() {
  // Verifica se já existe alguma gestora para não duplicar
  const count = await db.gestoras.count();
  if (count > 0) {
    console.log('O banco já possui dados. Nenhum seed será realizado.');
    return;
  }
  const now = new Date().toISOString();
  const gestora: Gestora = {
    id: crypto.randomUUID(),
    nome: 'Gestora Exemplo',
    aumBRL: 100000000,
    aumHistorico: [],
    produtosInteresse: { cra: true, cri: false, debentures: true, fidc: false, outros: [] },
    tags: ['demo'],
    createdAt: now,
    updatedAt: now,
  };
  await db.gestoras.put(gestora);
  const contato: Contato = {
    id: crypto.randomUUID(),
    gestoraId: gestora.id,
    nome: 'Fulano de Tal',
    cargo: 'Diretor',
    email: 'fulano@example.com',
    telefone: '(21) 99999-0000',
    linkedin: '',
    principal: true,
    createdAt: now,
    updatedAt: now,
  };
  await db.contatos.put(contato);
  const interacao: Interacao = {
    id: crypto.randomUUID(),
    gestoraId: gestora.id,
    contatoId: contato.id,
    tipo: 'reuniao',
    data: now,
    titulo: 'Reunião de Apresentação',
    descricao: 'Apresentação da plataforma e coleta de requisitos.',
    proximosPassos: 'Enviar proposta',
    arquivos: [],
    createdAt: now,
    updatedAt: now,
  };
  await db.interacoes.put(interacao);
  const oportunidade: Oportunidade = {
    id: crypto.randomUUID(),
    gestoraId: gestora.id,
    titulo: 'CRA Agrovale 2025 – Book',
    estagio: 'lead',
    valorPotencialBRL: 5000000,
    produtos: ['CRA'],
    probabilidade: 50,
    deadline: undefined,
    responsavelInterno: 'Time Comercial',
    createdAt: now,
    updatedAt: now,
  };
  await db.oportunidades.put(oportunidade);
  console.log('Seed concluído');
}

seed().catch((err) => console.error(err));