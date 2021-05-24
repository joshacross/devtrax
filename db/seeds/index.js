const seedUsers = require('./user-seeds');
const seedProjects = require('./project-seeds');
const seedsClients = require('./client-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedClients();
  console.log('--------------');

  await seedProjects();
  console.log('--------------');

  process.exit(0);
};

seedAll();
