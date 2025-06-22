const express = require('express');
const connectDB = require('./config/db.config');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();
connectDB();

// Importing routes
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const suggestionsRoutes = require('./routes/suggestions.routes');

app.use(cors());
app.use(express.json())

// Using routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/suggestions', suggestionsRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
