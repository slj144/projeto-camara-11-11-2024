import React, { useState, useEffect } from 'react';
import { Users, CalendarClock, MapPin, BarChart2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/car.jsx';

const Dashboard = () => {
  const [estatisticas, setEstatisticas] = useState({
    totalEleitores: 0,
    eleitoresTotais: 0,
    bairrosMaisAtivos: [],
    aniversariantes: 0
  });

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      setEstatisticas({
        totalEleitores: 150,
        eleitoresTotais: 2500,
        bairrosMaisAtivos: [
          { nome: 'Centro', quantidade: 45 },
          { nome: 'Jardim América', quantidade: 32 },
          { nome: 'Vila Nova', quantidade: 28 }
        ],
        aniversariantes: 3
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eleitores Cadastrados</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {estatisticas.totalEleitores}
                </h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aniversariantes do Mês</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {estatisticas.aniversariantes}
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CalendarClock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Bairros</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {estatisticas.bairrosMaisAtivos.length}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Base Eleitoral</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">
                  {estatisticas.eleitoresTotais}
                </h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <BarChart2 className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bairros Mais Ativos */}
      <Card className="bg-white mb-8">
        <CardHeader>
          <CardTitle>Bairros Mais Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {estatisticas.bairrosMaisAtivos.map((bairro, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="font-medium">{bairro.nome}</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {bairro.quantidade} eleitores
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;