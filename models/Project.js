// Import Model and DataTypes from Sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

// Import connection to MySql stored in connection.js inside the config folder
const sequelize = require('../config/connection');

// Define Project Model (Create our Project Model)
class Project extends Model {
    static aligator(body, models) {
        return models.Client.create({
          user_id: body.user_id,
          project_id: body.project_id
        }).then(() => {
          return Project.findOne({
            where: {
              id: body.project_id
            },
            attributes: [
              'project_id',
              'project_url',
              'project_title',
              'services_rendered',
              'project_start_date',
              'project_completion_date',
              'total_price_of_project',
              'fee_schedule',
              'length_of_project',
              'contract_created',
              'contract_signed'
            ],
            include: [
              {
                model: models.Client,
                attributes: ['client_id', 'client_first_name', 'client_last_name', 'client_company_name', 'client_email'],
                include: {
                  model: models.User,
                  attributes: ['username', 'user_first_name', 'user_last_name']
                }
              }
            ]
          });
        });
      }
    }

// Create fields/columns for Post Model
Project.init(
    {
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        project_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        project_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        project_description: {
            type: DataTypes.STRING,
        },
        services_rendered: {
            type: DataTypes.STRING,
            allowNull: false
        },
        project_start_date: {
            type: DataTypes.TIME
        },
        project_completion_date: {
            type: DataTypes.TIME
        },
        total_price_of_project: {
            type: DataTypes.INTEGER,
        },
        fee_schedule: {
            type: DataTypes.STRING
        },
        length_of_project: {
            type: DataTypes.DATE
        },
        client_first_name: {
            type: DataTypes.STRING,
            references: {
                model: 'client',
                key: 'client_id'
            }
        },
        client_last_name: {
            type: DataTypes.STRING,
            references: {
                model: 'client',
                key: 'client_id'
            }
        },
        client_company_name: {
            type: DataTypes.STRING,
            references: {
                model: 'client',
                key: 'client_id'
            }
        },
        client_email: {
            type: DataTypes.STRING,
            references: {
                model: 'client',
                key: 'client_id'
            }
        },
        contract_signed: {
            type: DataTypes.BOOLEAN
        },
        contract_created_date: {
            type: DataTypes.DATE
        },
        contract_signed_date: {
            type: DataTypes.DATE
        },
        username: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'user_id'
            }
        },
        user_first_name: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'user_id'
            }

        },
        user_last_name: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'user_id'
            }
        },
        //Project Timestamps
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

module.exports = Project;