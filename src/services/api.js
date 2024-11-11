import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export const cadastrarEleitor = async (dados) => {
  const formData = new FormData();
  Object.keys(dados).forEach(key => {
    formData.append(key, dados[key]);
  });
  const response = await api.post('/eleitores', formData);
  return response.data;
};

export const listarEleitores = async () => {
  const response = await api.get('/eleitores');
  return response.data;
};
// Adicione esta função junto com as outras
export const buscarEstatisticas = async () => {
    const response = await api.get('/estatisticas');
    return response.data;
  };