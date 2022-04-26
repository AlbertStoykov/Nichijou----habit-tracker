const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors("*"));
server.use(express.json());

const habitRoutes = require("./controllers/habits");
const userRoutes = require("./routes/user");
const authRoutes = require("./controllers/auth");
//const authorsRoutes = require("./routes/authors");
// server.use("/books", booksRoutes);
// server.use("/authors", authorsRoutes);
//const authRoutes = require('./controllers/auth'); 
//const userRoutes = require('./controllers/users');
//const postRoutes = require('./controllers/posts');
server.use('/auth',authRoutes);
server.use('/habit',habitRoutes);
server.use('/users',userRoutes);
//server.use('/posts',postRoutes);


// Root route
server.get("/", (req, res) => res.send("Welcome to Nichijou!"));
server.get("/users", (req,res) => res.send("users"));
server.get("/habit",(req, res) => res.send("habits"));
server.get("/auth", (req,res) => res.send("auth"));

module.exports = server;
