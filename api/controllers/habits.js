const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const Habit = require('../models/habit'); 

async function index(req, res) {
  try {
    const habits = await Habit.all;
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function show(req, res) {
  try {
    const habit = await Habit.findById(req.params.id);
    res.status(200).json(habit);
  } catch (err) {
    res.status(404).json({ err });
  }
}

async function create(req, res) {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (err) {
    res.status(422).json({ err });
  }
}

async function destroy(req, res) {
  try {
    const habit = await Habit.findById(req.params.id);
    const resp = await habit.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ err });
  }
}


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
