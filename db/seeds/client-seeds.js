const sequelize = require('../config/connection');
const { Client } = require('../models');

const clientdata = [
    {
        client_first_name: "jameson",
        client_last_name: "hendrix",
        client_email_address: "jhendrix@numberone.com",
        company_name: "NumberOne",
        billing_address: "123 Alpha Omega Court",
        city: "Nashville",
        state: "TN",
        zipcode: "37210",
        project_name: "One-Page Ad Campaign"
    },
    {
        client_first_name: "Jean",
        client_last_name: "Short",
        client_email_address: "jShorts@jimmyeatworld.com",
        company_name: "JimmyEatWord",
        billing_address: "5 Deeter Lane",
        city: "Nashville",
        state: "TN",
        zipcode: "37210",
        project_name: "Web-Design"
    },
    {
        client_first_name: "Justin",
        client_last_name: "Hoffman",
        client_email_address: "jhoffman@LDT.com",
        company_name: "Lets Do This",
        billing_address: "15 Junk Haul Street",
        city: "Nashville",
        state: "TN",
        zipcode: "37210",
        project_name: "The Let's Do This App"
    }
];

const seedClients = () => Client.bulkCreate(clientdata);

module.exports = seedClients;

