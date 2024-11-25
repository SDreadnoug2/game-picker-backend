const express = require('express');
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const router = express.Router();
const mongoose = require("mongoose");
const index = require("./routes/index");
const { getAllGames } = require('./utils/fetchGames');
const { setGamesList } = require('./utils/storeList');

//json parser
app.use(express.json());
app.use('/', index);

mongoose.connect("mongodb://127.0.0.1:27017/SteamPicker")

const dayMS = 1000 * 60 * 60 * 24;

async function updateGamesList(){
    try{
        let games = getAllGames();
        console.log(games);
        setGamesList(games);
        console.log("New list of games updated, list length : ");
    }
    catch (error) {
        console.error("Error updating list:", error)
    }
}
updateGamesList();
setInterval(() => updateGamesList, dayMS);


const port = 3001;
app.listen(3001, () => {
    console.log(`Server running on port: ${port}`);
})

