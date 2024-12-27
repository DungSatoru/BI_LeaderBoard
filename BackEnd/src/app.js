const { default: helmet } = require('helmet');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');  // Import cors middleware
const apiRoutes = require('./routes/api.routes'); // Import routes

const app = express();

app.use(morgan('combined')); // combined, common, short, tiny
app.use(helmet()); // protect info header

// Cấu hình CORS chi tiết hơn
const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép tất cả các origin trong development
    callback(null, true);
  },
  credentials: true, // Cho phép gửi credentials
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes 
app.use("/api", apiRoutes);

module.exports = app;