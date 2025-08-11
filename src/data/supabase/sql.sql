-- Script de criação de tabelas para o modo Supabase
-- Certifique-se de executar este script no SQL Editor do seu projeto Supabase.

-- Extensões necessárias
create extension if not exists "uuid-ossp";

-- Tabela de gestoras
create table if not exists public.gestoras (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  nome text not null,
  aum_brl numeric,
  site text,
  produtos jsonb,
  tags text[],
  observacoes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Contatos
create table if not exists public.contatos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  gestora_id uuid references public.gestoras(id) on delete cascade,
  nome text not null,
  cargo text not null,
  email text not null,
  telefone text not null,
  linkedin text,
  principal boolean default false,
  observacoes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Interações
create table if not exists public.interacoes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  gestora_id uuid references public.gestoras(id) on delete cascade,
  contato_id uuid references public.contatos(id),
  tipo text not null,
  data timestamp with time zone not null,
  titulo text not null,
  descricao text not null,
  proximos_passos text,
  arquivos jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Oportunidades
create table if not exists public.oportunidades (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  gestora_id uuid references public.gestoras(id) on delete cascade,
  titulo text not null,
  estagio text not null,
  valor_potencial_brl numeric,
  produtos text[],
  probabilidade numeric,
  deadline date,
  responsavel_interno text,
  observacoes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Índices úteis
create index if not exists gestoras_nome_idx on public.gestoras using btree (nome);
create index if not exists contatos_email_idx on public.contatos using btree (email);
create index if not exists oportunidades_estagio_idx on public.oportunidades using btree (estagio);

-- Políticas de RLS
alter table public.gestoras enable row level security;
alter table public.contatos enable row level security;
alter table public.interacoes enable row level security;
alter table public.oportunidades enable row level security;

create policy gestoras_select on public.gestoras
  for select using (auth.uid() = user_id);
create policy gestoras_mod on public.gestoras
  for all using (auth.uid() = user_id);

create policy contatos_select on public.contatos
  for select using (auth.uid() = user_id);
create policy contatos_mod on public.contatos
  for all using (auth.uid() = user_id);

create policy interacoes_select on public.interacoes
  for select using (auth.uid() = user_id);
create policy interacoes_mod on public.interacoes
  for all using (auth.uid() = user_id);

create policy oportunidades_select on public.oportunidades
  for select using (auth.uid() = user_id);
create policy oportunidades_mod on public.oportunidades
  for all using (auth.uid() = user_id);