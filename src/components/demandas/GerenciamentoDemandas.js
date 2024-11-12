import React, { useState, useEffect } from 'react';
import { Plus, Filter, Check, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card.jsx';

const GerenciamentoDemandas = () => {
  const [demandas, setDemandas] = useState([]);
  const [filtros, setFiltros] = useState({
    status: '',
    prioridade: '',
    bairro: ''
  });
  const [novaDemanda, setNovaDemanda] = useState({
    titulo: '',
    descricao: '',
    prioridade: 'Média',
    solicitante: {
      nome: '',
      telefone: '',
      email: ''
    },
    bairro: '',
    previsaoConclusao: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    carregarDemandas();
  }, [filtros]);

  const carregarDemandas = async () => {
    try {
      // Aqui virá a chamada à API
      setDemandas([
        {
          id: 1,
          titulo: "Manutenção de Praça",
          descricao: "Necessidade de manutenção na praça central",
          status: "Pendente",
          prioridade: "Alta",
          solicitante: {
            nome: "João Silva",
            telefone: "11999999999"
          },
          bairro: "Centro",
          dataCriacao: new Date()
        }
      ]);
    } catch (error) {
      console.error('Erro ao carregar demandas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aqui virá a chamada à API para salvar
      console.log('Nova demanda:', novaDemanda);
      setMostrarFormulario(false);
      carregarDemandas();
    } catch (error) {
      console.error('Erro ao criar demanda:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com botões de ação */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Demanda
          </button>
          <button
            className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => {/* Implementar filtros */}}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      {/* Formulário de Nova Demanda */}
      {mostrarFormulario && (
        <Card>
          <CardHeader>
            <CardTitle>Nova Demanda</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={novaDemanda.titulo}
                    onChange={e => setNovaDemanda({...novaDemanda, titulo: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Prioridade</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={novaDemanda.prioridade}
                    onChange={e => setNovaDemanda({...novaDemanda, prioridade: e.target.value})}
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                    <option value="Urgente">Urgente</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows="3"
                    value={novaDemanda.descricao}
                    onChange={e => setNovaDemanda({...novaDemanda, descricao: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Solicitante</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={novaDemanda.solicitante.nome}
                    onChange={e => setNovaDemanda({
                      ...novaDemanda,
                      solicitante: {...novaDemanda.solicitante, nome: e.target.value}
                    })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bairro</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={novaDemanda.bairro}
                    onChange={e => setNovaDemanda({...novaDemanda, bairro: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Salvar Demanda
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Demandas */}
      <div className="grid grid-cols-1 gap-4">
        {demandas.map(demanda => (
          <Card key={demanda.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{demanda.titulo}</h3>
                  <p className="text-gray-600 mt-1">{demanda.descricao}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    demanda.prioridade === 'Alta' ? 'bg-red-100 text-red-800' :
                    demanda.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {demanda.prioridade}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    demanda.status === 'Pendente' ? 'bg-gray-100 text-gray-800' :
                    demanda.status === 'Em Andamento' ? 'bg-blue-100 text-blue-800' :
                    demanda.status === 'Concluída' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {demanda.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <span>{demanda.solicitante.nome}</span>
                <span>{demanda.bairro}</span>
                <span>{new Date(demanda.dataCriacao).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GerenciamentoDemandas;