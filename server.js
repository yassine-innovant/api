const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { readdirSync } = require("fs");

app.use(cors());
app.use(express.json());

//DB connection
mongoose.connect(
  process.env.MONGO_URI,
  () => {
    console.log("Connected to DB");
  },
  (e) => console.log(e)
);

//routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
