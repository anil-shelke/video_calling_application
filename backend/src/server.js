import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.route.js';
import connectDB from "./lib/db.js";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ API routes FIRST
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);

// ✅ Serve static frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ✅ Wildcard fallback for frontend routes
app.get('*', (req, res, next) => {
  const url = req.originalUrl;

  if (url.startsWith('/api')) return next();
  const isAsset = url.includes('.') || url.startsWith('/favicon') || url.startsWith('/manifest');
  if (isAsset) return next();

  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
});
