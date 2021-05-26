const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    first_name: 'josh',
    last_name: 'cross',
    username: 'alesmonde0',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123'
  },
  {
    first_name: 'james',
    last_name: 'cross',
    username: 'jwilloughway1',
    email: 'rmebes1@sogou.com',
    password: 'password123'
  },
  {
    first_name: 'alex',
    last_name: 'cross',
    username: 'iboddam2',
    email: 'cstoneman2@last.fm',
    password: 'password123'
  },
  {
    first_name: 'alexa',
    last_name: 'cross',
    username: 'dstanmer3',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123'
  },
  {
    first_name: 'alexis',
    last_name: 'cross',
    username: 'djiri4',
    email: 'gmidgley4@weather.com',
    password: 'password123'
  },
  {
    first_name: 'alexandria',
    last_name: 'cross',
    username: 'msprague5',
    email: 'larnout5@imdb.com',
    password: 'password123'
  },
  {
    first_name: 'xander',
    last_name: 'cross',
    username: 'mpergens6',
    email: 'hnapleton6@feedburner.com',
    password: 'password123'
  },
  {
    first_name: 'marco',
    last_name: 'cross',
    username: 'tpenniell7',
    email: 'kperigo7@china.com.cn',
    password: 'password123'
  },
  {
    first_name: 'mera',
    last_name: 'cross',
    username: 'msabbins8',
    email: 'lmongain8@google.ru',
    password: 'password123'
  },
  {
    first_name: 'lexy',
    last_name: 'cross',
    username: 'jmacarthur9',
    email: 'bsteen9@epa.gov',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;