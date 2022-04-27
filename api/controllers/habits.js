const express = require('express');
const router = express.Router();

const Habit = require('../models/habit');

router.get('/', async (req, res) => {
    try {
        const hab = await Habit.all
        res.json(hab)
    } catch (err) {
        res.status(500).send({ err })
    }
})

module.exports = router
