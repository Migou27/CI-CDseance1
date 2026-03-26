const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(express.json());

// On préfixe toutes les routes par /api/students
app.use('/api/students', studentRoutes);

module.exports = app;