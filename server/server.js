const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/players", require("./routes/player"));
app.use("/api/teams", require("./routes/team"));

app.listen(5000, () => console.log("Server running on port 5000"));
