const User = require("../models/user");

async function index(req, res) {
  try {
    const users = await User.all; // do not change ".all"
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function show(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const habits = await user.habits;
    res.status(200).json({ habits });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json({ err });
  }
}

async function destroy(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const resp = await user.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = { index, show, create, destroy };
