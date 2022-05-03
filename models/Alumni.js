const Sequelize = require('sequelize');
const db = require('../config/database');

const Alumni = db.define('alumnis', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    district: {
        type: Sequelize.STRING
    },
    province: {
        type: Sequelize.STRING
    },
    // createdAt: {
    //     type: Sequelize.DATE
    // },
    // updatedAt: {
    //     type: Sequelize.DATE
    // }
})


module.exports = Alumni;