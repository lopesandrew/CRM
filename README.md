# CRM para Gestoras de Crédito Privado

Uma plataforma CRM focada em gestoras de recursos de crédito privado. Este projeto é um MVP sólido escrito em TypeScript e React que roda inteiramente no frontend utilizando Vite. O objetivo principal é possibilitar o gerenciamento de gestoras, contatos, interações e oportunidades de negócios com dados persistidos em `IndexedDB` (modo estático) ou Supabase (modo opcional) sem necessidade de backend próprio.

## Visão geral

A aplicação oferece:

- **Dashboard** com métricas rápidas, gráfico de AUM agregado e pipeline Kanban de oportunidades.
- **CRUD completo** para Gestoras, Contatos, Interações e Oportunidades.
- **Filtros e buscas** por nome, tags, estágio e períodos.
- **Importação e exportação** de dados via CSV.
- **Agenda** com exportação `.ics`.
- **Upload de arquivos** com armazenamento local (IndexedDB) ou no Supabase Storage.
- **Anotações ricas** em Markdown.
- **PWA** com funcionamento offline (modo IndexedDB).
- **Tema claro/escuro** com persistência.
- **Responsivo e acessível**, pronto para desktop, tablet e mobile.

## Estrutura de Pastas

```
/
├─ README.md
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
├─ index.html
├─ public/
│  ├─ favicon.ico
│  └─ icons/
├─ .github/workflows/
│  └─ deploy-pages.yml
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ config.ts
│  ├─ routes/
│  │  ├─ index.tsx
│  │  ├─ gestoras/
│  │  │  ├─ list.tsx
│  │  │  ├─ form.tsx
│  │  │  └─ detail.tsx
│  │  ├─ contatos/
│  │  │  ├─ list.tsx
│  │  │  └─ form.tsx
│  │  ├─ interacoes/
│  │  │  ├─ list.tsx
│  │  │  └─ form.tsx
│  │  └─ oportunidades/
│  │     ├─ board.tsx
│  │     ├─ list.tsx
│  │     └─ form.tsx
│  ├─ components/
│  │  ├─ DataTable.tsx
│  │  ├─ Charts.tsx
│  │  ├─ Upload.tsx
│  │  ├─ MarkdownEditor.tsx
│  │  └─ CalendarList.tsx
│  ├─ styles/
│  │  └─ globals.css
│  ├─ types/
│  │  └─ domain.ts
│  ├─ validation/
│  │  └─ schemas.ts
│  ├─ data/
│  │  ├─ repo/
│  │  │  ├─ gestoras.ts
│  │  │  ├─ contatos.ts
│  │  │  ├─ interacoes.ts
│  │  │  └─ oportunidades.ts
│  │  ├─ indexeddb/
│  │  │  ├─ client.ts
│  │  │  └─ adapters.ts
│  │  └─ supabase/
│  │     ├─ client.ts
│  │     ├─ adapters.ts
│  │     └─ sql.sql
│  ├─ pwa/
│  │  ├─ service-worker.ts
│  │  └─ manifest.webmanifest
│  ├─ utils/
│  │  ├─ csv.ts
│  │  ├─ format.ts
│  │  └─ ics.ts
│  ├─ seed/
│  │  └─ seed.ts
│  └─ env.example
└─ .env
```

## Como rodar localmente

Instale as dependências e execute em modo de desenvolvimento:

```bash
npm install
npm run dev
```

O projeto utiliza Vite e o modo padrão de dados é `IndexedDB`. Para alternar para Supabase, edite `src/config.ts` definindo `DATA_MODE` para `"supabase"` e preencha as variáveis de ambiente em `.env` ou `env.example`.

### Supabase

1. Crie um projeto no [Supabase](https://supabase.com/).
2. Copie o conteúdo de `src/data/supabase/sql.sql` e execute no SQL Editor para criar as tabelas e políticas.
3. Gere sua `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
4. Adicione esses valores em `.env` seguindo o padrão de `env.example`.
5. Altere `DATA_MODE` em `src/config.ts` para `"supabase"`.

### Deploy no GitHub Pages

Um workflow já está configurado em `.github/workflows/deploy-pages.yml`. Ele instala as dependências, gera o build e publica a pasta `dist` no GitHub Pages.

Para publicar manualmente execute:

```bash
npm run deploy
```

### Roadmap Sugerido

- Controle de acesso (RBAC).
- Relatórios avançados e gráficos.
- Integrações externas (ANBIMA, CVM, etc).
- Notificações e automações de e‑mail.
- Dashboard customizável por usuário.

### Limitações do Modo IndexedDB

Os dados ficam armazenados localmente por navegador/dispositivo. Ao limpar o cache ou acessar em outro navegador, os dados não são sincronizados. O modo Supabase oferece sincronização online.

---

Ferramentas: React, Vite, Tailwind, Shadcn UI, Zustand, React Hook Form, Zod, TanStack Table, Recharts, Papaparse, Dexie, Supabase, Workbox.
