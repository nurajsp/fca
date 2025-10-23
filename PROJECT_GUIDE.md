# Feedback Collector App - Complete Setup Guide

## 📋 Project Overview

This is a complete full-stack feedback collection application built with:

**Frontend (Next.js + TypeScript):**
- React-based user interface
- Form for submitting feedback (name + message)
- Display of all feedback entries
- Real-time feedback submission and loading states

**Backend (Node.js + Express):**
- RESTful API with MongoDB integration
- Input validation and error handling
- CORS enabled for cross-origin requests
- Environment-based configuration

**Database (MongoDB):**
- Local MongoDB instance
- Collection: `feedbacks`
- Schema: `{ name, message, createdAt }`

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (installed via Homebrew)
- npm or yarn

### 1. Start MongoDB
```bash
brew services start mongodb/brew/mongodb-community@8.0
```

### 2. Start Backend (Terminal 1)
```bash
cd /Users/nurajperera/Documents/fca/backend
npm install
npm run dev
```
Backend will run on: http://localhost:5001

### 3. Start Frontend (Terminal 2)
```bash
cd /Users/nurajperera/Documents/fca/frontend/feedback_collector_app
npm install
npm run dev
```
Frontend will run on: http://localhost:3000

### 4. Access the Application
Open your browser and go to: **http://localhost:3000**

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/feedback` | Get all feedback |
| POST | `/api/feedback` | Create new feedback |

### Example API Usage

**Get all feedback:**
```bash
curl http://localhost:5001/api/feedback
```

**Create feedback:**
```bash
curl -X POST http://localhost:5001/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","message":"Great service!"}'
```

## 📁 Project Structure

```
fca/
├── backend/
│   ├── package.json
│   ├── server.js           # Main server file
│   ├── .env               # Environment variables
│   ├── models/
│   │   └── Feedback.js    # MongoDB schema
│   └── routes/
│       └── feedback.js    # API routes
└── frontend/
    └── feedback_collector_app/
        ├── package.json
        ├── .env.local     # Frontend environment
        └── app/
            ├── page.tsx   # Main React component
            └── ...
```

## 🔧 Environment Configuration

### Backend (.env)
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/feedback_collector
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api/feedback
```

## 🛠 Development Scripts

### Backend
- `npm start` - Production mode
- `npm run dev` - Development with nodemon
- `npm install` - Install dependencies

### Frontend  
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server

## 🗄 Database

**MongoDB Collection: `feedbacks`**

Schema:
```javascript
{
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

## 🔄 MongoDB Management

**Start MongoDB:**
```bash
brew services start mongodb/brew/mongodb-community@8.0
```

**Stop MongoDB:**
```bash
brew services stop mongodb/brew/mongodb-community@8.0
```

**Check MongoDB Status:**
```bash
brew services list | grep mongodb
```

**Connect to MongoDB Shell:**
```bash
mongosh
```

**View Feedback Data:**
```bash
mongosh
use feedback_collector
db.feedbacks.find()
```

## 🎯 Features Implemented

✅ **Backend API**
- Express server with MongoDB integration
- POST `/api/feedback` - Save feedback to database
- GET `/api/feedback` - Retrieve all feedback (sorted by newest)
- Input validation and error handling
- CORS configuration for frontend communication

✅ **Frontend Application**
- React form for feedback submission
- Real-time loading states and error handling
- Display of all feedback entries with timestamps
- Responsive design with inline styling

✅ **Database Integration**
- MongoDB with Mongoose ODM
- Automatic timestamps
- Data persistence and retrieval

✅ **Development Setup**
- Environment-based configuration
- Development servers with hot reload
- Comprehensive error handling

## 🚨 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```bash
# Start MongoDB service
brew services start mongodb/brew/mongodb-community@8.0

# Check if MongoDB is running
brew services list | grep mongodb
```

**2. Port Already in Use**
```bash
# Kill processes on specific ports
lsof -ti:5001 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

**3. Environment Variables Not Loading**
- Restart the development servers after changing .env files
- Ensure .env files are in the correct directories

**4. CORS Issues**
- Verify FRONTEND_URL in backend/.env matches your frontend URL
- Check browser console for CORS errors

## 📊 Testing the Application

1. **Submit Feedback:**
   - Fill out the name and message fields
   - Click "Submit" button
   - Verify feedback appears in the list below

2. **API Testing:**
   ```bash
   # Test health endpoint
   curl http://localhost:5001/api/health
   
   # Test creating feedback
   curl -X POST http://localhost:5001/api/feedback \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","message":"Test message"}'
   
   # Test getting feedback
   curl http://localhost:5001/api/feedback
   ```

3. **Database Verification:**
   ```bash
   mongosh
   use feedback_collector
   db.feedbacks.find().pretty()
   ```

## 🔄 Next Steps / Enhancements

**Possible improvements:**
- Add user authentication
- Implement feedback editing/deletion
- Add feedback categories or ratings
- Implement pagination for large datasets
- Add input sanitization and rate limiting
- Deploy to cloud platforms (Vercel, Railway, MongoDB Atlas)
- Add proper TypeScript types for API responses
- Implement proper error boundaries in React
- Add automated tests (Jest, Cypress)

---

🎉 **Your feedback collector application is now fully functional!**

Backend API: http://localhost:5001
Frontend App: http://localhost:3000
