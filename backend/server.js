const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
// app.use(helmet());
app.use(limiter);
app.use(cors({
  origin: "*",   // allow production access
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Content Media App API is running',
    timestamp: new Date().toISOString()
  });
});

/* ===============================
   SERVE FRONTEND (IMPORTANT)
================================ */

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// For React/Vite routing (SPA support)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

/* =============================== */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
