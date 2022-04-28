
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.create({ ...req.body, password: hashed })
        res.status(201).json({ msg: 'User created' })

    } catch (err) {
        res.status(500).json({ err });
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email)
        if (!user) { throw new Error('NO user with this email') }
        const authed = await bcrypt.compare(req.body.password, user.passwordDigest);
        if (!!authed) {
            const payload = {
                user: username,
                role: "admin"
            }
            const secret = "super-secret"
            jwt.sign(payload,
                secret,
                { expiresIn: 60 * 20 }, (err, token) => {
                    if (err) {
                        throw new Error('Error generating token');
                    } else {
                        res.status(200).json({ token: "Bearer" + token, user: user.username })
                    }
                })

        } else {
            throw new Error('User could nor authenicated ')
        }
    } catch (err) {
        res.status(401).json({ err });
    }
})

module.exports = router;