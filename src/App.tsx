import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './routes/index';
import GestorasList from './routes/gestoras/list';
import GestorasForm from './routes/gestoras/form';
import GestorasDetail from './routes/gestoras/detail';
import ContatosList from './routes/contatos/list';
import ContatosForm from './routes/contatos/form';
import InteracoesList from './routes/interacoes/list';
import InteracoesForm from './routes/interacoes/form';
import OportunidadesBoard from './routes/oportunidades/board';
import OportunidadesList from './routes/oportunidades/list';
import OportunidadesForm from './routes/oportunidades/form';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex space-x-4">
          <Link to="/">Dashboard</Link>
          <Link to="/gestoras">Gestoras</Link>
          <Link to="/contatos">Contatos</Link>
          <Link to="/interacoes">Interações</Link>
          <Link to="/oportunidades">Oportunidades</Link>
        </div>
      </nav>
      <main className="flex-1 container mx-auto p-4 space-y-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gestoras" element={<GestorasList />} />
          <Route path="/gestoras/new" element={<GestorasForm />} />
          <Route path="/gestoras/:id" element={<GestorasDetail />} />
          <Route path="/gestoras/:id/edit" element={<GestorasForm />} />
          <Route path="/contatos" element={<ContatosList />} />
          <Route path="/contatos/new" element={<ContatosForm />} />
          <Route path="/contatos/:id/edit" element={<ContatosForm />} />
          <Route path="/interacoes" element={<InteracoesList />} />
          <Route path="/interacoes/new" element={<InteracoesForm />} />
          <Route path="/interacoes/:id/edit" element={<InteracoesForm />} />
          <Route path="/oportunidades" element={<OportunidadesList />} />
          <Route path="/oportunidades/board" element={<OportunidadesBoard />} />
          <Route path="/oportunidades/new" element={<OportunidadesForm />} />
          <Route path="/oportunidades/:id/edit" element={<OportunidadesForm />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;