import React, { useState, useEffect } from 'react';
import { BarChart2, Calendar, Users, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import axios from 'axios';

const RelatorioEleitores = () => {
  const [dados, setDados] = useState({
    totalEleitores: 0,
    porBairro: [],
    aniversariantes: [],
    novosCadastros: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/relatorios/eleitores');
      setDados(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Relatório de Eleitores</h2>
      
      {/* Cards de resumo virão aqui */}
      {/* Cards de Resumo */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Total de Eleitores</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {dados.totalEleitores}
          </h3>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Bairros Atendidos</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {dados.porBairro.length}
          </h3>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <MapPin className="w-6 h-6 text-green-600" />
        </div>
      </div>
    </CardContent>
  </Card>
</div>
      
    </div>
  );
};

export default RelatorioEleitores;