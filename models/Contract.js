// // Import Model and DataTypes from Sequelize
// const { Model, DataTypes } = require('sequelize');

// // Import connection to MySql stored in connection.js inside the config folder
// const sequelize = require('../config/connection');

// // Define Contract Model (Create our Contract Model)
// class Contract extends Model {

// }

// // Create fields/columns for Post Model
// Contract.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         post_url: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 isURL: true
//             }
//         },
//         user_id: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'user',
//                 key: 'id'   
//             }
//         }
//     },
//     // configure the metadata, including naming conventions
//     {
//         sequelize,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'post'
//     },  
// );

// module.exports = Contract;