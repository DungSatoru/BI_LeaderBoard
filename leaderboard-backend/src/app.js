// const express = require('express');

// const apiRoutes = require('./routes/api.routes');

// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api', apiRoutes);

// module.exports = app;


const express = require('express');
const cors = require('cors');  // Import cors middleware
const apiRoutes = require('./routes/api.routes'); // Import routes

const app = express();

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000', // Địa chỉ frontend (React app)
  methods: 'GET,POST', // Các phương thức HTTP được phép
  allowedHeaders: 'Content-Type,Authorization', // Các header được phép
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

module.exports = app;
