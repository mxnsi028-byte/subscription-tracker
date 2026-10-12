
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'subscription_tracker',
  'root',
  '',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

testConnection();
