require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const mongoose = require("mongoose");
const index = require("./routes/index");
const { getAllGames } = require('./utils/fetchGames');
const errorHandler = require('./middleware/error-handler');
const { setGamesList, setGamesListLength } = require('./utils/storeList');
const fs = require('fs');
const https = require('https');
//json parser
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(session({
    secret: 'your-secret-key', // Replace with a secure secret key
    resave: false,            // Avoid resaving session if unmodified
    saveUninitialized: false, // Don't save uninitialized sessions
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);

passport.serializeUser((user, done) => {
    done(null, user); // Save the whole user object in the session
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj); // Retrieve the user from the session
  });


const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
  };

mongoose.connect("mongodb://127.0.0.1:27017/SteamPicker")

const dayMS = 1000 * 60 * 60 * 24;
async function updateGamesList(){
    try{
        let games = await getAllGames();
        setGamesListLength(games.length);
        setGamesList(games);
        //console.log(games);
    }
    catch (error) {
        console.error("Error updating list:", error)
    }
    console.log('games Set.');
}
updateGamesList();
setInterval(() => updateGamesList, dayMS);

const port = 3001;
/*
app.listen(3001, () => {
    console.log(`Server running on port: ${port}`);
})
*/

app.use('/', index);

https.createServer(options, app).listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
  });

