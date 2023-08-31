const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

require("dotenv").config();

const connectDB = require("./config/db");
const socketServer = require("./sockerServer");

const app = express();
const PORT = process.env.PORT || process.env.API_PORT;

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
socketServer.registerSocketServer(server);

connectDB();

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

server.listen(PORT, () => {
  console.log("Server listening on PORT " + PORT);
});
