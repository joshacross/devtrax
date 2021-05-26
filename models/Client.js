// Import Model and DataTypes from Sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

// Import connection to MySql stored in connection.js inside the config folder
const sequelize = require('../config/connection');

// Define Project Model (Create our Project Model)
class Client extends Model {
    static aligator(body, models) {
        return models.Project.create({
          user_id: body.user_id,
          client_id: body.client_id
        }).then(() => {
          return Client.findOne({
            where: {
              id: body.client_id
            },
            attributes: [
                'client_id',
                'client_first_name',
                'client_last_name',
                'client_company_name',
                'client_billing_address',
                'client_city',
                'client_state',
                'client_zipcode',
            ],
            include: [
              {
                model: models.Project,
                attributes: ['project_id', 'project_title'],
                include: {
                  model: models.User,
                  attributes: ['username']
                }
              }
            ]
          });
        });
      }
    }

// Create fields/columns for Post Model
Client.init(
    {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        client_first_name: {
            type: DataTypes.STRING
            },
        client_last_name: {
            type: DataTypes.STRING
            },
        client_email_address: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        client_company_name: {
            type: DataTypes.STRING,
            allowNull: false
            },
        client_billing_address: {
            type: DataTypes.STRING,
        },
        client_city: {
            type: DataTypes.STRING,
        },
        client_zipcode: {
            type: DataTypes.INTEGER
        },
        project_title: {
            type: DataTypes.STRING,
            references: {
                model: 'project',
                key: 'project_id'
            }
        },
        username: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'user_id'
            }
        },
        //Client Created Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    },
    {
        sequelize,
        freezeTabName: true,
        underscored: true,
        modelName: 'client'
    });

module.exports = Client;