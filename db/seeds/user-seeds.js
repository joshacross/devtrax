const sequelize = require('../../config/connection');
const { User, Post } = require('../../models');

const userdata = [
  {
    user_first_name: 'josh',
    user_last_name: 'cross',
    username: 'alesmonde0',
    user_email: 'nwestnedge0@cbc.ca',
    user_company_name: 'killajmgmt',
    user_billing_address: '123 Authorization Drive',
    user_city: 'nashville',
    user_zipcode: '37204',
    auth_id: 'Auth0|11234567890'
  },
  {
    user_first_name: 'j',
    user_last_name: 'thomas',
    username: 'jthomas1',
    user_email: 'jthomas@bakerboards.com',
    user_company_name: 'baker',
    user_billing_address: '123 Cali way',
    user_city: 'Orange County',
    user_zipcode: '90210',
    auth_id: 'Auth0|10234567890'
  },
  {
    user_first_name: 'Gerard',
    user_last_name: 'Butler',
    username: 'Taken123',
    user_email: 'Gerard@gbutler.com',
    user_company_name: 'Gerard Butler, LLC',
    user_billing_address: '90 Golden Globes Drive',
    user_city: 'Los Angeles',
    user_zipcode: '90210',
    auth_id: 'Auth0|9234567890'
  },
  {
    user_first_name: 'Jesse',
    user_last_name: 'James',
    username: 'trainxrobber123',
    user_email: 'jesse@jj.com',
    user_company_name: 'Jesse James and the fantastic 5',
    user_billing_address: 'unknown',
    user_city: 'unknown',
    user_zipcode: '00000',
    auth_id: 'Auth0|8234567890'
  },
  {
    user_first_name: 'Alex',
    user_last_name: 'cross',
    username: 'alexcinvestigations',
    user_email: 'alex@alexcross.com',
    user_company_name: 'Alex Cross Investigations, LLC',
    user_billing_address: '123 Mystery Way',
    user_city: 'Chicago',
    user_zipcode: '60652',
    auth_id: 'Auth0|7234567890'
  },
  {
    user_first_name: 'Smokey',
    user_last_name: 'Bear',
    username: 'Smokey@smokeybear.com',
    user_email: 'smokey@smokeybear.com',
    user_company_name: 'Smokey Bear, LLC',
    user_billing_address: '555 Fire Safety Lane',
    user_city: 'Chicago',
    user_zipcode: '60652',
    auth_id: 'Auth0|6234567890'
  },
  {
    user_first_name: 'Tommy',
    user_last_name: 'Christopher',
    username: 'tommyc',
    user_email: 'tommy@tchristophers.com',
    user_company_name: 'Tommy Christophers Rare Diamonds',
    user_billing_address: '1000 Grand Court',
    user_city: 'Emerald',
    user_zipcode: '55555',
    auth_id: 'Auth0|5234567890'
  },
  {
    user_first_name: 'Jorge',
    user_last_name: 'Limon',
    username: 'jlimon',
    user_email: 'jorge@limonauto.com',
    user_company_name: 'Limon Auto, LLC',
    user_billing_address: '44 4th Street',
    user_city: 'nashville',
    user_zipcode: '37204',
    auth_id: 'Auth0|4234567890'
  },
  {
    user_first_name: 'Lana',
    user_last_name: 'Del Ray',
    username: 'Lanadelray',
    user_email: 'lana@lanadelray.com',
    user_company_name: 'Lana Del Ray and Friends',
    user_billing_address: '123 Summertime Sadness Drive',
    user_city: 'nashville',
    user_zipcode: '37204',
    auth_id: 'Auth0|3234567890'
  },
  {
    user_first_name: 'Havier',
    user_last_name: 'Christopher',
    username: 'Havierc',
    user_email: 'havier@hc.com',
    user_company_name: 'HC Board Shop',
    user_billing_address: '40 Surfer Drive',
    user_city: 'San Diego',
    user_zipcode: '90010',
    auth_id: 'Auth0|2234567890'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;