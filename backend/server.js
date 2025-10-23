const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/feedback', feedbackRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Feedback Collector API is running' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    console.log('✅ Connected to MongoDB');
    console.log(`📂 Database: ${mongoose.connection.name}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n📋 MongoDB Setup Instructions:');
    console.log('1. Local MongoDB:');
    console.log('   - Install MongoDB: brew install mongodb-community');
    console.log('   - Start MongoDB: brew services start mongodb-community');
    console.log('   - Update .env: MONGODB_URI=mongodb://localhost:27017/feedback_collector');
    console.log('\n2. MongoDB Atlas (Recommended):');
    console.log('   - Sign up at https://mongodb.com/atlas');
    console.log('   - Create a cluster and get connection string');
    console.log('   - Update .env with your Atlas connection string');
    console.log('\n3. For now, the server will run without database (some features may not work)');
  }
};

// Start server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 API endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/api/feedback`);
    console.log(`   POST http://localhost:${PORT}/api/feedback`);
    console.log(`   GET  http://localhost:${PORT}/api/health`);
    console.log(`\n🌐 Test the API:`);
    console.log(`   curl http://localhost:${PORT}/api/health`);
  });
};

// Initialize database and start server
connectDB().then(() => {
  startServer();
}).catch(() => {
  // Start server even if DB connection fails (for testing)
  console.log('⚠️  Starting server without database connection...');
  startServer();
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});
