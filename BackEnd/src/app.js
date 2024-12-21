const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api.routes");

const app = express();

// Cấu hình CORS chi tiết hơn
const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép tất cả các origin trong development
    callback(null, true);
  },
  credentials: true, // Cho phép gửi credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes 
app.use("/api", apiRoutes);

module.exports = app;