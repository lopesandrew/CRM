import { z } from 'zod';

/**
 * Esquemas de validação usando Zod para as entidades do sistema. Estes esquemas
 * são utilizados pelo React Hook Form para validar os formulários antes de
 * persistir os dados. A validação ajuda a garantir a integridade dos campos.
 */

export const gestoraSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, { message: 'Nome é obrigatório' }),
  aumBRL: z.number().nonnegative().optional(),
  aumHistorico: z.array(
    z.object({
      data: z.string(),
      valorBRL: z.number().nonnegative(),
    })
  ),
  site: z.string().url({ message: 'URL inválida' }).optional(),
  produtosInteresse: z.object({
    cra: z.boolean(),
    cri: z.boolean(),
    debentures: z.boolean(),
    fidc: z.boolean(),
    outros: z.array(z.string()),
  }),
  tags: z.array(z.string()),
  observacoes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const contatoSchema = z.object({
  id: z.string(),
  gestoraId: z.string().min(1),
  nome: z.string().min(1, { message: 'Nome é obrigatório' }),
  cargo: z.string().min(1, { message: 'Cargo é obrigatório' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  telefone: z.string().min(1, { message: 'Telefone é obrigatório' }),
  linkedin: z.string().url().optional(),
  principal: z.boolean(),
  observacoes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const interacaoSchema = z.object({
  id: z.string(),
  gestoraId: z.string().min(1),
  contatoId: z.string().optional(),
  tipo: z.enum(['reuniao', 'call', 'email', 'evento', 'outro']),
  data: z.string(),
  titulo: z.string().min(1, { message: 'Título é obrigatório' }),
  descricao: z.string().min(1, { message: 'Descrição é obrigatória' }),
  proximosPassos: z.string().optional(),
  arquivos: z.array(
    z.object({
      id: z.string(),
      nome: z.string(),
      urlOuPath: z.string(),
      tamanhoBytes: z.number().optional(),
      tipoMime: z.string().optional(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const oportunidadeSchema = z.object({
  id: z.string(),
  gestoraId: z.string().min(1),
  titulo: z.string().min(1, { message: 'Título é obrigatório' }),
  estagio: z.enum([
    'lead',
    'qualificado',
    'em_abordagem',
    'em_analise',
    'bookbuilding',
    'alocado',
    'perdido',
  ]),
  valorPotencialBRL: z.number().nonnegative(),
  produtos: z.array(z.enum(['CRA', 'CRI', 'Debêntures', 'FIDC', 'Outros'])).optional(),
  probabilidade: z.number().min(0).max(100),
  deadline: z.string().optional(),
  responsavelInterno: z.string().optional(),
  observacoes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
