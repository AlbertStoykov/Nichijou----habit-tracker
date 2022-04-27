const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

const habitRoutes = require("./controllers/habits");
const userRoutes = require("./controllers/users");
const authRoutes = require("./controllers/auth");

server.use('/auth',authRoutes);
server.use('/habit',habitRoutes);
server.use('/users',userRoutes);



// Root route
server.get("/", (req, res) => res.send("Welcome to Nichijou!"));



module.exports = server;
