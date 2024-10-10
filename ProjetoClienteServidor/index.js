const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});
