const Sequelize = require('sequelize');
// module.exports = new Sequelize('AlumniWebApp', 'postgres', 'password', {
//     host: 'localhost',
//     dialect: 'postgres',
//     operatorsAliases: 0,
//     //local database port
//     port: 8081,
//     //dialect: 'mssql',
//     define: {
//         timestamps: false,
//         freezeTableName: true
//     },
//     logging: false
// });

module.exports = new Sequelize('AlumniWebApp', 'yellowmango', 'password', {
    host: 'fruit.database.windows.net',
    dialect: 'mssql',
    operatorsAliases: 0,
    define: {
        timestamps: false,
        freezeTableName: true
    },
    logging: false
});