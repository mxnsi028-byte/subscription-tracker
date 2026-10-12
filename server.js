
const express = require('express');
const sequelize = require('./models').sequelize;

const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');


const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Subscription & SaaS Billing Tracker API is running!'
  });
});

// Database health check
app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      message: 'Database connection successful!'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// CRUD API routes
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/invoices', invoiceRoutes);

// Start server
const PORT = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error.message);
  }
}

startServer();
