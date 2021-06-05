// const User = require('./User');
const Project = require('./Project');
// // const Client = require('./Client');

// // // define and create model associations

// // Users have many projects
// User.hasMany(Project, {
//     foreignKey: 'auth'
// });

// Project.belongsTo(User, {
//     foreignKey: 'auth',
//     onDelete: 'SET NULL'
// });

// // // users have many clients
// // User.hasMany(Client, {
// //     foriegnKey: 'user_id',
// //     onDelete: 'SET NULL'
// // });

// // // Clients have one user
// // Client.belongsTo(User, {
// //     foreignKey: 'user_id'
// // });

// // // Clients have many projects
// // Client.hasMany(Project, {
// //     foreignKey: 'client_id'
// // });

// // // Projects have one client
// // Project.belongsTo(Client, {
// //     foreignKey: 'client_id'
// // });

module.exports = { Project };