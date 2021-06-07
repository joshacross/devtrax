const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {};

// define table columns and configuration
User.init(
    {
        // define column id
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true,
            // turn off auto increment
            autoIncrement: true
        },
        user_first_name: {
            type: DataTypes.STRING,
        },
        user_last_name: {
            type: DataTypes.STRING,
        },
        // define username
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            // check for duplicates
            unique: true,
        },
        auth_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_company_name: {
            type: DataTypes.STRING
        },
        user_billing_address: {
            type: DataTypes.STRING
        },
        user_city: {
            type: DataTypes.STRING
        },
        user_zipcode: {
            type: DataTypes.INTEGER
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
      }
    );
    
    module.exports = User;