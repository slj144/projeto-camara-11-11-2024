import React, { useState } from 'react';
import { Home, Users, Calendar, FileText, BarChart, AlertCircle } from 'lucide-react';
import CadastroEleitor from '../cadastro/cadastroEleitor';
import Dashboard from '../dashboard/Dashboard'; // Adicione esta linha
import GerenciamentoDemandas from '../demandas/GerenciamentoDemandas';
import EspacoLegislativo from '../legislativo/EspacoLegislativo';
import Agenda from '../agenda/Agenda';





const SistemaGestao = () => {
  const [menuAtivo, setMenuAtivo] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', nome: 'Dashboard', icone: Home },
    { id: 'vereadores', nome: 'Eleitores', icone: Users },
    { id: 'agenda', nome: 'Agenda', icone: Calendar },
    { id: 'documentos', nome: 'Documentos', icone: FileText },
    { id: 'relatorios', nome: 'Relatórios', icone: BarChart },
    { id: 'demandas', nome: 'Demandas', icone: AlertCircle },
    { id: 'legislativo', nome: 'Espaço Legislativo', icone: FileText },
  ];

  const renderConteudo = () => {
    switch (menuAtivo) {
      case 'dashboard':
        return <Dashboard />;
      case 'vereadores':
        return <CadastroEleitor />;
      default:
        return <div>Em desenvolvimento...</div>;
        case 'demandas':
  return <GerenciamentoDemandas />;
  case 'legislativo':
  return <EspacoLegislativo />;
  case 'agenda':
  return <Agenda />;
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
                onClick={() => setMenuAtivo(item.id)}
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