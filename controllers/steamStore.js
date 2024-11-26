const { getGamesList, } = require("../utils/storeList");
//Updating Steam Games List
// should just fetch the list of games and make a variable
// of all of them

module.exports.randomGame = (req, res) => {
    const gamesList = getGamesList();
    const randomIndex = Math.floor(Math.random() * gamesList.length + 1);
    const gameId = gamesList[randomIndex];
    try{
        const response = fetch(`http://store.steampowered.com/api/appdetails?appids=${gameId}`);

        if(!response.ok) {
            return res.status(response.status)
        }
    }

    const parsedGame = randomGame.JSON();
};

// I need to check if the fetched game is valid.
// Steam will return 