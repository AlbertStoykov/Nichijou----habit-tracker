const express = require('express');
const router = express.Router();

const User = require('../models/user'); // controller control the model

router.get('/', async (req, res) => { // root
    const users = await User.all  // get all the users 
    res.json(users) // response of user data in json 
})

module.exports = router;
