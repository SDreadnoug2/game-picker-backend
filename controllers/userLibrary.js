const APIKEY = process.env.APIKEY; 
const axios = require('axios');
const {fetchUserGame} = require('../utils/fetchGameData');
const { BadRequest } = require('../utils/BadRequestError');
const { ServerError } = require('../utils/ServerError');

async function fetchUserLibrary(userID, next) {
    try {
        const response = await axios(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${APIKEY}&steamid=${userID}&include_appinfo=true&format=json`);
        const data = response.data
        return data
    } catch (error) {
        next(error);
    }
}

module.exports.randomUserGame = async function (req, res, next){
    const userID = await req.query.userID
    if(!userID){
        next(new BadRequest('No User ID'))
    }
    console.log(userID);
    const library = await fetchUserLibrary(userID);
    if(!library) {
        next(new ServerError('Issue Retrieving Library'))
    }
    const games = library.response.games;
    try{
        const gameInfo = await fetchUserGame(games);
        console.log(gameInfo);
        return res.send(gameInfo);
    } catch (error) {
        next(new ServerError('Server Error:', error))
    }
};