// Tipos e interfaces de domínio para a aplicação CRM

export type ISODateString = string;

export interface AumHistorico {
  data: ISODateString;
  valorBRL: number;
}

export interface ProdutoInteresse {
  cra: boolean;
  cri: boolean;
  debentures: boolean;
  fidc: boolean;
  outros: string[];
}

export interface Gestora {
  id: string;
  nome: string;
  aumBRL?: number;
  aumHistorico: AumHistorico[];
  site?: string;
  produtosInteresse: ProdutoInteresse;
  tags: string[];
  observacoes?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface Contato {
  id: string;
  gestoraId: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  linkedin?: string;
  principal: boolean;
  observacoes?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type InteracaoTipo = 'reuniao' | 'call' | 'email' | 'evento' | 'outro';

export interface ArquivoRef {
  id: string;
  nome: string;
  urlOuPath: string;
  tamanhoBytes?: number;
  tipoMime?: string;
}

export interface Interacao {
  id: string;
  gestoraId: string;
  contatoId?: string;
  tipo: InteracaoTipo;
  data: ISODateString;
  titulo: string;
  descricao: string;
  proximosPassos?: string;
  arquivos: ArquivoRef[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type OportunidadeEstagio =
  | 'lead'
  | 'qualificado'
  | 'em_abordagem'
  | 'em_analise'
  | 'bookbuilding'
  | 'alocado'
  | 'perdido';

export type Produto = 'CRA' | 'CRI' | 'Debêntures' | 'FIDC' | 'Outros';

export interface Oportunidade {
  id: string;
  gestoraId: string;
  titulo: string;
  estagio: OportunidadeEstagio;
  valorPotencialBRL: number;
  produtos: Produto[];
  probabilidade: number;
  deadline?: ISODateString;
  responsavelInterno?: string;
  observacoes?: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}