const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

const habitsRoutes = require("./routes/habits");
const usersRoutes = require("./routes/users");
server.use("/habits", habitsRoutes);
server.use("/users", usersRoutes);

// Root route
server.get("/", (req, res) => res.send("Welcome to Nichijou!"));

module.exports = server;
