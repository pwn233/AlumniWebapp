const Sequelize = require('sequelize');
// module.exports = new Sequelize('AlumniWebApp', 'postgres', 'Gamers23', {
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

module.exports = new Sequelize('AlumniWebApp', 'yellowmango', 'Gamers23', {
    host: 'fruit.database.windows.net',
    dialect: 'mssql',
    operatorsAliases: 0,
    define: {
        timestamps: false,
        freezeTableName: true
    },
    logging: false
});