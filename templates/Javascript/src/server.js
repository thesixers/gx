/***** genesix *****/

const express = require('express');
const mainRoutes = require('./routes/mainRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static('./public'));

// Middlewares
app.use(express.json())

// Routes
app.use('/', mainRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
