import React, { useState } from 'react';
// Remova os ícones que não estão sendo usados da importação
import { Camera, Save } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/car';
import { Alert, AlertDescription } from '../ui/arlet';

const CadastroEleitor = () => {
  // Removemos a variável 'foto' já que não estamos usando
  const [previewFoto, setPreviewFoto] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [eleitor, setEleitor] = useState({
    nome: '',
    dataNascimento: '',
    endereco: '',
    bairro: '',
    telefone: '',
    email: '',
    observacoes: ''
  });

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEleitor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensagem('Eleitor cadastrado com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Cadastro de Eleitor</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload de Foto */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {previewFoto ? (
                  <img
                    src={previewFoto}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFotoChange}
                  />
                </label>
              </div>
            </div>

            {/* Campos do Formulário */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="nome"
                  value={eleitor.nome}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={eleitor.dataNascimento}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={eleitor.endereco}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={eleitor.telefone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={eleitor.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bairro
                </label>
                <input
                  type="text"
                  name="bairro"
                  value={eleitor.bairro}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                name="observacoes"
                value={eleitor.observacoes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows="3"
              />
            </div>

            {/* Botão Salvar */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
            >
              <Save className="w-4 h-4" />
              Salvar Cadastro
            </button>
          </form>

          {/* Mensagem de Sucesso */}
          {mensagem && (
            <Alert className="mt-4 bg-green-50 text-green-800">
              <AlertDescription>{mensagem}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastroEleitor;