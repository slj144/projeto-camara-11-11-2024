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

// Modelo do Eleitor
const eleitorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  endereco: { type: String, required: true },
  bairro: { type: String, required: true },
  telefone: { type: String, required: true },
  email: String,
  observacoes: String,
  foto: String,
  dataCadastro: { type: Date, default: Date.now }
});

const Eleitor = mongoose.model('Eleitor', eleitorSchema);

// Rotas
app.post('/api/eleitores', upload.single('foto'), async (req, res) => {
  try {
    const eleitor = new Eleitor({
      ...req.body,
      foto: req.file ? `/uploads/${req.file.filename}` : null
    });
    await eleitor.save();
    res.status(201).json(eleitor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/eleitores', async (req, res) => {
  try {
    const eleitores = await Eleitor.find().sort({ dataCadastro: -1 });
    res.json(eleitores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar eleitor por ID
app.get('/api/eleitores/:id', async (req, res) => {
  try {
    const eleitor = await Eleitor.findById(req.params.id);
    if (!eleitor) {
      return res.status(404).json({ message: 'Eleitor não encontrado' });
    }
    res.json(eleitor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar eleitor
app.put('/api/eleitores/:id', upload.single('foto'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.foto = `/uploads/${req.file.filename}`;
    }
    const eleitor = await Eleitor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(eleitor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar eleitor
app.delete('/api/eleitores/:id', async (req, res) => {
  try {
    await Eleitor.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  // Adicione esta rota junto com as outras
app.get('/api/estatisticas', async (req, res) => {
  try {
    // Total de eleitores
    const totalEleitores = await Eleitor.countDocuments();

    // Aniversariantes do mês atual
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    
    const aniversariantes = await Eleitor.countDocuments({
      $expr: {
        $eq: [{ $month: "$dataNascimento" }, mesAtual]
      }
    });

    // Bairros mais ativos
    const bairrosMaisAtivos = await Eleitor.aggregate([
      { $group: { 
        _id: "$bairro", 
        quantidade: { $sum: 1 } 
      }},
      { $sort: { quantidade: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalEleitores,
      eleitoresTotais: totalEleitores,
      bairrosMaisAtivos: bairrosMaisAtivos.map(b => ({
        nome: b._id,
        quantidade: b.quantidade
      })),
      aniversariantes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});