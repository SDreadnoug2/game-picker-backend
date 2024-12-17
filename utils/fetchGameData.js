const { getGamesList } = require("./storeList");

module.exports.fetchGameData = (req, res, next) => {
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
    return gameInfo;
})
};