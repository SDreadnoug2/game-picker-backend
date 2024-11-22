const express = require('express');
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const router = express.Router();
const mongoose = require("mongoose");
const index = require("./routes/index")
//json parser
app.use(express.json());
app.use('/', index);

mongoose.connect("mongodb://127.0.0.1:27017/SteamPicker")

const port = 3001;
app.listen(3001, () => {
    console.log(`Server running on port: ${port}`);
})

