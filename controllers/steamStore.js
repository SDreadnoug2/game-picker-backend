const { fetchGameData } = require("../utils/fetchGameData");
const { validateGame } = require("../utils/fetchGames");
const { GameError } = require("../utils/InvalidGameError");
const { getGamesList, } = require("../utils/storeList");

//Updating Steam Games List
// should just fetch the list of games and make a variable
// of all of them

/*
module.exports.randomGame = (req, res) => {
    const gamesList = getGamesList();
    const randomIndex = Math.floor(Math.random() * gamesList.length);
    const gameId = gamesList[randomIndex];
    return fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId.appid}&filters=basic,price_overview,screenshots,genres,metacritic,platforms,developers`)
    .then((res) => {
        if(!res.ok){
            return res.status;
        }
        return res.json();
    }).then((data) => {
        console.log(data);
        return res.json(data);
    })
};
*/
// If the fetch request results in something other than a game, it needs to
// disregard it and send a new request.
// I need to check if the fetched game is valid./
/*
module.exports.randomGame = (req, res) => {
    const gamesList = getGamesList();
    const randomIndex = Math.floor(Math.random() * gamesList.length);
    const gameId = gamesList[randomIndex];
    return fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId.appid}&filters=basic,price_overview,screenshots,genres,metacritic,platforms,developers`)
    .then((res) => {
        if(!res.ok){
            return res.status;
        }
        return res.json();
    }).then((game) => {
        const gameInfo = game[gameId.appid]?.data;
        console.log(gameInfo);
        return gameInfo;
    })
};
*/
module.exports.randomGame = async function (req, res, next){
    let gameFound = false;
    while(!gameFound){
        try{
            const gameData = await fetchGameData();
            if(gameData.type !== 'game') {
                console.log('this aint no damn game.');
                continue; 
            }
            return res.send(gameData);
            }
         catch(error){
            console.error(error);
            throw new GameError('Issue Fetching Game');
        }
    }
};