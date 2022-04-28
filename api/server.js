const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

const habitsRoutes = require("./controllers/habits");
const usersRoutes = require("./controllers/users");
const authRoutes = require("./controllers/auth");

server.use("/auth", authRoutes);
server.use("/habits", habitsRoutes);
server.use("/users", usersRoutes);

// Root route
server.get("/", (req, res) => res.send("Welcome to Nichijou!"));
// server.get("/users", (req,res) => res.send("users"));
// server.get("/habits",(req, res) => res.send("habits"));
// server.get("/auth", (req,res) => res.send("auth"));

module.exports = server;
