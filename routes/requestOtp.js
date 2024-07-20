const express = require('express');
const route = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../database');
const crypto = require('crypto');
const bcrypt = require('bcryptjs/dist/bcrypt');
const ratelimiter = require('../middleware/rateLimiter')


//POST Request to otp for register user
route.post('/request-otp', ratelimiter, [
    check('email').notEmpty().withMessage("Require Email").isEmail().withMessage("Invalid Email Format")
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ error: errors.array() })
    }

    const email = req.body.email;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ msg: 'Database Error', err });
        }
        if (!user) {
            return res.status(400).json({ msg: 'User Not Exist' });
        }
        else {
            const otp = crypto.randomInt(100000, 999999).toString();
            const otpToStore = bcrypt.hashSync(otp, 10);
            const otpexpiry = new Date(Date.now() + 10 * 60 * 1000);
            db.run(`UPDATE users SET otp=?, expires_at=? WHERE email=?`, [otpToStore, otpexpiry, email], (err) => {
                if (err) {
                    return res.status(500).json({ msg: "Failed to send OTP", err });
                }
                else {
                    return res.status(200).json({ msg: `OTP:${otp} Send to your email ${email}` })
                }
            })
        }
    })
})


module.exports = route;

