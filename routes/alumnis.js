const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Alumni = require('../models/Alumni');
const Sequelize = require('sequelize');
const { query } = require('express');
const Op = Sequelize.Op;

// Get alumni list
router.get('/', (req, res) =>
    Alumni.findAll()
    .then(alumnis =>
        res.render('alumnis', {
            alumnis
        }))
    .catch(err => console.log(err)));

// Display add alumnis form
router.get('/add', (req, res) => res.render('add'));

// Add a alumni
router.post('/add', (req, res) => {
    let { id, name, surname, district, province } = req.body;
    let errors = [];
    myFunction(id);
    async function myFunction(id) {
        const idCheck = await Alumni.findByPk(id);
        if (idCheck === null) {
            errors.push({
                text: 'This ' + (id) + ' are not in KMITL ID database'
            });
        }
    }
    if (id === '') {
        errors.push({ text: 'Please fill in ID' });
    } else
    if (id.length != 8) {
        errors.push({ text: 'Please fill in ID, KMITL id must took 8 units' });
    }

    if (!name) {
        errors.push({ text: 'Please fill in name' });
    }
    if (!surname) {
        errors.push({ text: 'Please fill in surname' });
    }
    if (!district) {
        errors.push({ text: 'Please fill in district' });
    }
    if (!province) {
        errors.push({ text: 'Please fill in province' });
    }
    //check error
    if (errors.length > 0) {
        res.render('add', {
            errors,
            id,
            name,
            surname,
            district,
            province,
        });
    } else {
        // insert to table
        /*not recommend, but somehow we use it right now*/
        Alumni.upsert({
                id,
                name,
                surname,
                district,
                province,
            })
            .then(alumni = res.redirect('/alumnis'))
            .catch(err => console.log(err));
    }
    /*
        let { id, name, surname, province } = req.body;
        let errors = [];


        if (!id) {
            errors.push({ text: 'Please fill in ID' });
        } else
        if (id.value.length != 8) {
            errors.push({ text: 'Please fill in ID, your id must took 8 units' });
        }
        if (!name) {
            errors.push({ text: 'Please fill in name' });
        }
        if (!surname) {
            errors.push({ text: 'Please fill in surname' });
        }
        if (!province) {
            errors.push({ text: 'Please fill in province' });
        }
        //check error
        if (errors.length > 0) {
            res.render('add', {
                errors,
                id,
                name,
                surname,
                province
            });
        } else {
            // insert to table
            Alumni.create({
                    id,
                    name,
                    surname,
                    province
                })
                .then(alumni = res.redirect('/alumnis'))
                .catch(err => console.log(err));
        }
    */
});

// Seach for alumnis
router.get('/search', (req, res) => {
    const { term } = req.query;
    //console.log("\n\nTEST :" + term + "\n\n");
    Alumni.findAll({
            where: {
                [Op.or]: {
                    id: {
                        [Op.like]: '%' + (term) + '%'
                    },
                    name: {
                        [Op.like]: '%' + (term) + '%'
                    },
                    surname: {
                        [Op.like]: '%' + (term) + '%'
                    },
                    province: {
                        [Op.like]: '%' + (term) + '%'
                    }
                }
            }
        })
        .then(alumnis => res.render('alumnis', { alumnis }))
        .catch(err => console.log('Router seach :' + err + '\n' + (term)))
});

module.exports = router;