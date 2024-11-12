import React, { useState, useEffect } from 'react';
import { Plus, Filter, File, FileText, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const EspacoLegislativo = () => {
  const [documentos, setDocumentos] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState('Requerimento');
  const [filtros, setFiltros] = useState({
    ano: new Date().getFullYear(),
    situacao: '',
    autor: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoDocumento, setNovoDocumento] = useState({
    numero: '',
    ano: new Date().getFullYear(),
    autor: '',
    assunto: '',
    conteudo: '',
    situacao: 'Em Tramitação',
    observacoes: '',
    tipo: 'Requerimento'
  });

  const tiposDocumento = [
    'Requerimento',
    'Ofício',
    'Indicação',
    'Moção',
    'Projeto'
  ];

  useEffect(() => {
    carregarDocumentos();
  }, [tipoSelecionado, filtros]);

  const carregarDocumentos = async () => {
    try {
      // Aqui virá a chamada à API
      setDocumentos([
        {
          id: 1,
          numero: '001',
          ano: 2024,
          autor: 'Vereador Silva',
          assunto: 'Solicitação de Melhorias',
          situacao: 'Em Tramitação',
          tipo: 'Requerimento',
          dataApresentacao: new Date()
        }
      ]);
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aqui virá a chamada à API para salvar
      console.log('Novo documento:', novoDocumento);
      setMostrarFormulario(false);
      carregarDocumentos();
    } catch (error) {
      console.error('Erro ao criar documento:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtros e Navegação */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {tiposDocumento.map(tipo => (
            <button
              key={tipo}
              className={`px-4 py-2 rounded-lg ${
                tipoSelecionado === tipo
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTipoSelecionado(tipo)}
            >
              {tipo}
            </button>
          ))}
        </div>
        <button
          onClick={() => setMostrarFormulario(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo {tipoSelecionado}
        </button>
      </div>

      {/* Formulário de Novo Documento */}
      {mostrarFormulario && (
        <Card>
          <CardHeader>
            <CardTitle>Novo {tipoSelecionado}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Número</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={novoDocumento.numero}
                    onChange={e => setNovoDocumento({...novoDocumento, numero: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Ano</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={novoDocumento.ano}
                    onChange={e => setNovoDocumento({...novoDocumento, ano: parseInt(e.target.value)})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Autor</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={novoDocumento.autor}
                    onChange={e => setNovoDocumento({...novoDocumento, autor: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Situação</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={novoDocumento.situacao}
                    onChange={e => setNovoDocumento({...novoDocumento, situacao: e.target.value})}
                  >
                    <option value="Em Tramitação">Em Tramitação</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Rejeitado">Rejeitado</option>
                    <option value="Arquivado">Arquivado</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Assunto</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={novoDocumento.assunto}
                    onChange={e => setNovoDocumento({...novoDocumento, assunto: e.target.value})}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Conteúdo</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows="6"
                    value={novoDocumento.conteudo}
                    onChange={e => setNovoDocumento({...novoDocumento, conteudo: e.target.value})}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Observações</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows="3"
                    value={novoDocumento.observacoes}
                    onChange={e => setNovoDocumento({...novoDocumento, observacoes: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Anexos</label>
                  <input
                    type="file"
                    multiple
                    className="w-full p-2 border rounded-md"
                    onChange={e => {/* Implementar upload de arquivos */}}
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
                  Salvar {tipoSelecionado}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Documentos */}
      <div className="grid grid-cols-1 gap-4">
        {documentos.map(documento => (
          <Card key={documento.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold">
                      {documento.tipo} Nº {documento.numero}/{documento.ano}
                    </h3>
                  </div>
                  <p className="text-gray-600 mt-1">{documento.assunto}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  documento.situacao === 'Aprovado' ? 'bg-green-100 text-green-800' :
                  documento.situacao === 'Rejeitado' ? 'bg-red-100 text-red-800' :
                  documento.situacao === 'Arquivado' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {documento.situacao}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <span>{documento.autor}</span>
                <span>{new Date(documento.dataApresentacao).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EspacoLegislativo;