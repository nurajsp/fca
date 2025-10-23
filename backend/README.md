# Feedback Collector Backend

Express.js backend API for the feedback collector application with MongoDB integration.

## Features

- RESTful API endpoints for feedback management
- MongoDB integration with Mongoose ODM
- CORS enabled for frontend communication
- Input validation and error handling
- Environment-based configuration

## API Endpoints

### GET /api/feedback
Returns all feedback entries sorted by creation date (newest first).

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "message": "Great service!",
    "createdAt": "2023-10-23T10:30:00.000Z"
  }
]
```

### POST /api/feedback
Creates a new feedback entry.

**Request Body:**
```json
{
  "name": "John Doe",
  "message": "Great service!"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "message": "Great service!",
  "createdAt": "2023-10-23T10:30:00.000Z"
}
```

### GET /api/health
Health check endpoint to verify API status.

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   - Copy `.env.example` to `.env` (if available)
   - Configure your MongoDB connection string in `.env`
   - For local MongoDB: `mongodb://localhost:27017/feedback_collector`
   - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/feedback_collector`

3. **Start the Server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## MongoDB Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The database `feedback_collector` and collection `feedbacks` will be created automatically

### MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

## Data Schema

```javascript
{
  name: String (required),
  message: String (required), 
  createdAt: Date (auto-generated)
}
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid input data
- Database connection issues
- Server errors
- Route not found (404)

## CORS Configuration

CORS is configured to allow requests from your frontend application. Update the `FRONTEND_URL` environment variable to match your frontend's URL.
