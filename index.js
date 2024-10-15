const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Import routes and middlewares
const productRoutes = require('./Controllers/ProductRoutes');
const authMiddleware = require('./Middleware/AuthMiddleware');
const upload = require('./Middleware/upload');

// Initialize environment variables
dotenv.config();

// Initialize Express
const app = express();

// CORS configuration (update with your actual frontend URLs)
app.use(cors({
  origin: ["http://localhost:5173", 'https://krishnacollection.vercel.app'],
  credentials: true
}));

// Middleware configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files (e.g., images)
app.use('/uploads', express.static('uploads'));

// Define routes
app.post('/addproducts', upload.single('image'), productRoutes.addProduct); // POST to add product
app.get('/getproducts', productRoutes.getProducts); // GET to retrieve products
app.put('/updateproducts/:id', productRoutes.updateproduct); // PUT to update product

// Dashboard route with authentication middleware
app.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the dashboard!' });
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Krishna Collection backend!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});