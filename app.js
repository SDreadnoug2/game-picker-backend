require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');
const https = require('https');
const index = require("./routes/index");
const errorHandler = require('./middleware/error-handler');
const { getAllGames } = require('./utils/fetchGames');
const { setGamesList, setGamesListLength } = require('./utils/storeList');

const dayMS = 1000 * 60 * 60 * 24;
const NODE_ENV = process.env.NODE_ENV; 
const requestOrigin = NODE_ENV === "production" ? "https://pickagame.app" : "https://localhost:5173";

async function updateGamesList(){
  try{
      let games = await getAllGames();
      setGamesListLength(games.length);
      setGamesList(games);
  }
  catch (error) {
      console.error("Error updating list:", error)
  }
}

app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: requestOrigin,
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,            
    saveUninitialized: false, 
  }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    done(null, user);
  });
passport.deserializeUser((obj, done) => {
  done(null, obj); 
});

updateGamesList();
setInterval(updateGamesList, dayMS);
app.use('/', index);
app.get('/', console.log("received"));

app.listen(3001, () => console.log('server running at 3001'));