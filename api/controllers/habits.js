const Habit = require("../models/habit");
const router = express.Router();
const jwt = require("jsonwebtoken");

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

module.exports = { index, show, create, destroy };
