// Import Model and DataTypes from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import connection to MySql stored in connection.js inside the config folder
const sequelize = require('../config/connection');

// Define Project Model (Create our Project Model)
class Project extends Model {}
    // static aligator(body, models) {
    //     return models.Client.create({
    //     //   user_id: body.user_id,
    //       project_id: body.project_id
    //     }).then(() => {
    //       return Project.findOne({
    //         where: {
    //           id: body.project_id
    //         },
            // attributes: [
    //           'project_id',
    //           'project_url',
    //           'project_title',
    //           'project_description',
    //           'services_rendered',
    //           'services_rendered_description',
    //           'project_start_date',
    //           'project_completion_date',
    //           'total_price_of_project',
    //           'fee_schedule',
    //           'length_of_project',
    //           'client_first_name',
    //           'client_last_name',
    //           'client_email_address',
    //           'client_company_name',
    //           'client_billing_address',
    //           'client_city',
    //           'client_zipcode',
    //           'contract_signed',
    //           'contract_created_date',
    //           'contract_signed_date',
    //           'user_id',
    //           'username',
    //           'user_email',
    //           'user_first_name',
    //           'user_last_name',
    //           'created_at',
    //           'updated_at'
    //         ]
    //         // include: {
    //         //     model: models.User,
    //         //     attributes: ['user_id', 'username', 'user_first_name', 'user_last_name', 'auth']
    //         //     }
    //           });
    //     });
    //   }
    // }

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
        services_rendered_description: {
            type: DataTypes.STRING
        },
        project_start_date: {
            type: DataTypes.DATEONLY
        },
        project_completion_date: {
            type: DataTypes.DATEONLY
        },
        total_price_of_project: {
            type: DataTypes.INTEGER(10,2)
        },
        fee_schedule: {
            type: DataTypes.STRING
        },
        length_of_project: {
            type: DataTypes.STRING
        },
        // client_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
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
        contract_signed: {
            type: DataTypes.BOOLEAN
        },
        contract_created_date: {
            type: DataTypes.DATEONLY
        },
        contract_signed_date: {
            type: DataTypes.DATEONLY
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTabName: true,
        underscored: true,
        modelName: 'Project'
    });

module.exports = Project;