const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Habit = require('../models/habit'); 

function verifyToken(req, res, next){
    const header = req.headers['authorization'];
    if (header) { 
        const token = header.split(' ')[1]; 
        jwt.verify(token, "super-secret", async (err, data) => { 
            console.log(data);
            if(err){  
                res.status(403).json({ err: 'Invalid token' })
            } else { 
                next();
            }
        })
    } else { 
        res.status(403).json({ err: 'Missing token' })
    }
}
//passing it to a function that can be used when relevant in reference to the verify
router.get('/', verifyToken, async (req, res) => { //just before you do this repsonse(post all ) verify the token 
    //setting this up for express to handle this 
    try {
        const posts = await Post.all
        res.json(posts)
    } catch (err) {
        res.status(500).send({ err })
    }
})

module.exports = router;
