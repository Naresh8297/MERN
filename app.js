// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const vendorRoutes = require('./routes/vendorRoutes');


const app = express();


mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/vendors', vendorRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
