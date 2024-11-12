const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Criar pasta uploads se não existir
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Modelo do Documento Legislativo
const documentoLegislativoSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  ano: { type: Number, required: true },
  dataApresentacao: { type: Date, default: Date.now },
  autor: { type: String, required: true },
  assunto: { type: String, required: true },
  situacao: { 
    type: String, 
    enum: ['Em Tramitação', 'Aprovado', 'Rejeitado', 'Arquivado'],
    default: 'Em Tramitação'
  },
  conteudo: { type: String, required: true },
  observacoes: String,
  anexos: [String],
  tipo: { 
    type: String, 
    required: true,
    enum: ['Requerimento', 'Ofício', 'Indicação', 'Moção', 'Projeto']
  }
});

const DocumentoLegislativo = mongoose.model('DocumentoLegislativo', documentoLegislativoSchema);

// Rotas para Documentos
app.post('/api/documentos', upload.array('anexos'), async (req, res) => {
  try {
    const documento = new DocumentoLegislativo({
      ...req.body,
      anexos: req.files ? req.files.map(file => `/uploads/${file.filename}`) : []
    });
    await documento.save();
    res.status(201).json(documento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/documentos', async (req, res) => {
  try {
    const { tipo, autor, situacao, ano } = req.query;
    let filtro = {};
    
    if (tipo) filtro.tipo = tipo;
    if (autor) filtro.autor = autor;
    if (situacao) filtro.situacao = situacao;
    if (ano) filtro.ano = parseInt(ano);

    const documentos = await DocumentoLegislativo.find(filtro)
      .sort({ dataApresentacao: -1 });
    res.json(documentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/documentos/:id', async (req, res) => {
  try {
    const documento = await DocumentoLegislativo.findById(req.params.id);
    if (!documento) {
      return res.status(404).json({ message: 'Documento não encontrado' });
    }
    res.json(documento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/documentos/:id', upload.array('anexos'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.files && req.files.length > 0) {
      updateData.anexos = req.files.map(file => `/uploads/${file.filename}`);
    }
    const documento = await DocumentoLegislativo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(documento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com MongoDB:', error);
  });