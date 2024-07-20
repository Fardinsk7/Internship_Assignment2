const express = require('express');
const route = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../database');


//POST Request to register a user
route.post('/register', [
    check('email').notEmpty().withMessage("Require Email").isEmail().withMessage("Invalid Email Format")
], (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ error: errors.array() })
    }

    const email = req.body.email;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ msg: 'Database Error', err });
        }
        if (row) {
            return res.status(400).json({ msg: 'User Already Exists' });
        }
        else {
            db.run(`INSERT INTO users (email) VALUES (?)`, [email], (err) => {
                if (err) {
                    return res.status(500).json({ msg: "User Registration Failed", err });
                }
                else {
                    return res.status(200).json({ msg: "Registration successful. Please verify your email" })
                }
            })
        }
    })
})


module.exports = route;

