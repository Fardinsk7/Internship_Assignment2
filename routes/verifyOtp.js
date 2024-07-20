const express = require('express');
const route = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../database');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');


//POST Request to Verify OTP
route.post('/verify-otp', [
    check('email').notEmpty().withMessage("Require Email").isEmail().withMessage("Invalid Email Format"),
    check('otp').notEmpty().withMessage("OTP Required")
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ error: errors.array() })
    }

    const { email, otp } = req.body;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ msg: 'Database Error', err });
        }
        if (!user) {
            return res.status(400).json({ msg: 'User Not Exist' });
        }
        if (!user.otp) {
            return res.status(404).json({ msg: "Please generate OTP first" })
        }
        const currentTime = new Date();
        if (currentTime > new Date(user.expires_at)) {
            return res.status(500).json({ msg: "OTP Expired." })
        }
        bcrypt.compare(otp, user.otp, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ msg: "OTP comparision Failed" })
            }
            if (!isMatch) {
                return res.status(400).json({ msg: "OTP not Match" })
            }
            const token = jsonwebtoken.sign({ userId: user.id }, 'lksjdfoi49+86$%$nkl#@$&^&*', { expiresIn: '1h' });
            if (isMatch) {
                db.run(`UPDATE users SET otp=?, expires_at=? WHERE email=?`, [null, null, email], (err) => {
                    if (err) {
                        return res.status(500).json({ msg: "Error while OTP process" })
                    } else {
                        return res.status(200).json({ msg: "Login Successfull",token });
                    }
                })
            }
        })
    })
})


module.exports = route;

