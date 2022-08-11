const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || process.env.API_PORT;

connectDB();

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server listening on PORT " + PORT);
});
