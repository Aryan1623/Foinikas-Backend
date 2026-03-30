const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const forgotPassword = require('./routes/forgotPasswordRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS (fixed)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://foinikas.netlify.app",
    "https://fonikas-frontend-37jx.vercel.app", // ✅ fixed
    "http://34.252.136.246",
    "https://foinikasinvest.com"
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/pass', forgotPassword);

// ✅ Connect DB + start server (ONLY ONCE)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
