const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Register routes
app.use('/api/auth', require('./routes/auth'));     // <== required for login/register
app.use('/api/notes', require('./routes/notes'));   // <== required for notes

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
