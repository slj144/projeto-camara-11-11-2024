import React, { useState } from 'react';
import { Home, Users, Calendar, FileText, BarChart, MessageSquare } from 'lucide-react';
import CadastroEleitor from '../cadastro/CadastroEleitor';
import Dashboard from '../dashboard/Dashboard';
import ListaEleitores from '../eleitores/ListaEleitores';
import Agenda from '../agenda/Agenda';
import Demandas from '../demandas/GerenciamentoDemandas';
import EspacoLegislativo from '../legislativo/EspacoLegislativo';
import RelatorioEleitores from '../relatorios/RelatorioEleitores';

const SistemaGestao = () => {
  const [menuAtivo, setMenuAtivo] = useState('dashboard');
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  const menuItems = [
    { id: 'dashboard', nome: 'Dashboard', icone: Home },
    { id: 'eleitores', nome: 'Eleitores', icone: Users },
    { id: 'agenda', nome: 'Agenda', icone: Calendar },
    { id: 'demandas', nome: 'Demandas', icone: MessageSquare },
    { id: 'documentos', nome: 'Documentos', icone: FileText },
    { id: 'relatorios', nome: 'Relatórios', icone: BarChart },
    { id: 'legislativo', nome: 'Espaço Legislativo', icone: FileText },
];

const renderConteudo = () => {
  switch (menuAtivo) {
    case 'dashboard':
      return <Dashboard />;
    case 'eleitores':
      return mostrarCadastro ? 
        <CadastroEleitor voltarParaLista={() => setMostrarCadastro(false)} /> : 
        <ListaEleitores abrirCadastro={() => setMostrarCadastro(true)} />;
    case 'agenda':
      return <Agenda />;
    case 'demandas':
      return <Demandas />;
    case 'legislativo':
      return <EspacoLegislativo />;
    case 'relatorios':
      return <RelatorioEleitores />;
    default:
      return <div>Em desenvolvimento...</div>;
  }
};

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menu Lateral */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 bg-blue-600">
          <h1 className="text-white text-xl font-bold">Câmara Municipal</h1>
        </div>
        
        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icone;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                  menuAtivo === item.id ? 'bg-blue-50 text-blue-600' : ''
                }`}
                onClick={() => {
                  setMenuAtivo(item.id);
                  if (item.id !== 'eleitores') {
                    setMostrarCadastro(false);
                  }
                }}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.nome}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Área de Conteúdo */}
      <div className="flex-1 p-8 overflow-auto">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {menuItems.find(item => item.id === menuAtivo)?.nome}
            {menuAtivo === 'eleitores' && mostrarCadastro && ' - Novo Cadastro'}
          </h2>
        </header>

        <div className="bg-white rounded-lg shadow p-6">
          {renderConteudo()}
        </div>
      </div>
    </div>
  );
};

export default SistemaGestao;