const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
const mysql12 = require('mysql12');

// import sequelize connection
const sequelize = new Sequelize('sqlite::memory:')
//testing sequelize connection
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
