const User = require('./User');
const Project = require('./Project');
const CC = require('./Client');

// // define and create model associations

// Users have many projects
User.hasMany(Project, {
    foreignKey: 'user_id'
});

Project.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

module.exports = { User, Project };