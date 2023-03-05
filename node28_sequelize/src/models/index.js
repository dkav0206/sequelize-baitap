// kết nối CSDL
// host, database, user, password, port

const { Sequelize } = require('sequelize');
const config = require('../config/index');

const sequelize = new Sequelize(config.database, config.userName, config.passWord, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
});
// sequelize.query("SELECT * FROM user");
module.exports = sequelize;