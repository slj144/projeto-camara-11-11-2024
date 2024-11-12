import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Edit2, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card.jsx';

const Agenda = () => {
  const [eventos, setEventos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [novoEvento, setNovoEvento] = useState({
    titulo: '',
    dataEvento: '',
    horaInicio: '',
    horaFim: '',
    local: '',
    tipo: 'Sessão Ordinária',
    descricao: '',
    participantes: '',
    responsavel: '',
    observacoes: ''
  });

  useEffect(() => {
    carregarEventos();
  }, []);

  const carregarEventos = async () => {
    try {
      // Aqui virá a chamada à API
      const response = await fetch('http://localhost:3001/api/agenda');
      const data = await response.json();
      setEventos(data);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/agenda', {
        method: eventoSelecionado ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...novoEvento,
          participantes: novoEvento.participantes.split(',').map(p => p.trim())
        })
      });

      if (response.ok) {
        setMostrarFormulario(false);
        setNovoEvento({
          titulo: '',
          dataEvento: '',
          horaInicio: '',
          horaFim: '',
          local: '',
          tipo: 'Sessão Ordinária',
          descricao: '',
          participantes: '',
          responsavel: '',
          observacoes: ''
        });
        carregarEventos();
      }
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com botão de novo evento */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agenda</h2>
        <button
          onClick={() => {
            setEventoSelecionado(null);
            setMostrarFormulario(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Evento
        </button>
      </div>

      {/* Formulário de Evento */}
      {mostrarFormulario && (
        <Card>
          <CardHeader>
            <CardTitle>{eventoSelecionado ? 'Editar Evento' : 'Novo Evento'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={novoEvento.titulo}
                    onChange={e => setNovoEvento({...novoEvento, titulo: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tipo</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={novoEvento.tipo}
                    onChange={e => setNovoEvento({...novoEvento, tipo: e.target.value})}
                  >
                    <option value="Sessão Ordinária">Sessão Ordinária</option>
                    <option value="Sessão Extraordinária">Sessão Extraordinária</option>
                    <option value="Reunião">Reunião</option>
                    <option value="Audiência Pública">Audiência Pública</option>
                    <option value="Evento">Evento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Data</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={novoEvento.dataEvento}
                    onChange={e => setNovoEvento({...novoEvento, dataEvento: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Local</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={novoEvento.local}
                    onChange={e => setNovoEvento({...novoEvento, local: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Hora Início</label>
                  <input
                    type="time"
                    className="w-full p-2 border rounded-md"
                    value={novoEvento.horaInicio}
                    onChange={e => setNovoEvento({...novoEvento, horaInicio: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Hora Fim</label>
                  <input
                    type="time"
                    className="w-full p-2 border rounded-md"
                    value={novoEvento.horaFim}
                    onChange={e => setNovoEvento({...novoEvento, horaFim: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Responsável</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={novoEvento.responsavel}
                    onChange={e => setNovoEvento({...novoEvento, responsavel: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Participantes</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Separe os nomes por vírgula"
                    value={novoEvento.participantes}
                    onChange={e => setNovoEvento({...novoEvento, participantes: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows="3"
                    value={novoEvento.descricao}
                    onChange={e => setNovoEvento({...novoEvento, descricao: e.target.value})}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Observações</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows="2"
                    value={novoEvento.observacoes}
                    onChange={e => setNovoEvento({...novoEvento, observacoes: e.target.value})}
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
                  {eventoSelecionado ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Eventos */}
      <div className="grid grid-cols-1 gap-4">
        {eventos.map(evento => (
          <Card key={evento._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{evento.titulo}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(evento.dataEvento).toLocaleDateString()} | {evento.horaInicio} - {evento.horaFim}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{evento.local}</span>
                  </div>
                  {evento.participantes?.length > 0 && (
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Users className="w-4 h-4" />
                      <span>{evento.participantes.join(', ')}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEventoSelecionado(evento);
                      setNovoEvento({
                        ...evento,
                        participantes: evento.participantes.join(', '),
                        dataEvento: new Date(evento.dataEvento).toISOString().split('T')[0]
                      });
                      setMostrarFormulario(true);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Edit2 className="w-4 h-4 text-blue-500" />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm('Tem certeza que deseja excluir este evento?')) {
                        try {
                          await fetch(`http://localhost:3001/api/agenda/${evento._id}`, {
                            method: 'DELETE'
                          });
                          carregarEventos();
                        } catch (error) {
                          console.error('Erro ao excluir evento:', error);
                        }
                      }
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              {evento.descricao && (
                <p className="mt-3 text-gray-600">{evento.descricao}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Agenda;