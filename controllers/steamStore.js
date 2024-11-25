const { getGamesList } = require("../utils/storeList");
//Updating Steam Games List
// should just fetch the list of games and make a variable
// of all of them

module.exports.randomGame = (req, res) => {
    const gamesList = getGamesList();
    console.log(gamesList);
};

//basically I need to fetch a list of games, and then
// fetch those games' prices, and maybe just main image, and
// description.

// it would be better to fetch the length, pick a random value
// between that length after storing the result, and then 
// fetch those items.