const expressRateLimiter = require('express-rate-limit');

//Rate Limiter Middlware to avoid too many request at a time
const ratelimiter = expressRateLimiter({
    window: 15*60*1000,
    max:5,
    message: 'Too many OTP requests, please try again after 15 minutes'
})

module.exports = ratelimiter;