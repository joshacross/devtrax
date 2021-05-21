const User = require('./User');
const Contract = require('./Contract');

// // define and create model associations

// // define/create model associations
// // This is a onetomany relationship
// User.hasMany(Contract, {
//     foreignKey: 'user_id'   
// });

// Contract.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// // Associate User & Contracts to one another using ManytoMany
// User.belongsToMany(Contract, {
//     // through: Vote,
//     // as: 'voted_posts',
//     foreignKey: 'user_id'
// });

// Contract.belongsToMany(User, {
//     // through: Vote,
//     // as: 'voted_posts',
//     foreignKey: 'post_id'
// });

module.exports = { User, Contract };