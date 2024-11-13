import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Search, UserPlus, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import axios from 'axios';

// Adicione abrirCadastro nas props do componente
const ListaEleitores = ({ abrirCadastro }) => {
  const [eleitores, setEleitores] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEleitores();
  }, []);

  const carregarEleitores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/eleitores');
      setEleitores(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar eleitores:', error);
      setLoading(false);
    }
  };

  const deletarEleitor = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este eleitor?')) {
      try {
        await axios.delete(`http://localhost:3001/api/eleitores/${id}`);
        carregarEleitores();
      } catch (error) {
        console.error('Erro ao deletar eleitor:', error);
      }
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const filtrarEleitores = () => {
    return eleitores.filter(eleitor => 
      eleitor.nome.toLowerCase().includes(busca.toLowerCase()) ||
      eleitor.bairro.toLowerCase().includes(busca.toLowerCase()) ||
      eleitor.telefone.includes(busca)
    );
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Eleitores Cadastrados</CardTitle>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
            onClick={abrirCadastro} // Aqui usamos a prop abrirCadastro
          >
            <UserPlus className="w-4 h-4" />
            Novo Eleitor
          </button>
        </CardHeader>
        <CardContent>
          {/* Barra de Busca */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eleitor..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>

          {/* Lista de Eleitores */}
          {loading ? (
            <div className="text-center py-4">Carregando...</div>
          ) : (
            <div className="space-y-4">
              {filtrarEleitores().map((eleitor) => (
                <div
                  key={eleitor._id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{eleitor.nome}</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Nascimento: {formatarData(eleitor.dataNascimento)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{eleitor.endereco}, {eleitor.bairro}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{eleitor.telefone}</span>
                        </div>
                        {eleitor.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{eleitor.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {/* Implementar edição */}}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deletarEleitor(eleitor._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ListaEleitores;