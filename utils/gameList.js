//Updating Steam Games List
// should just fetch the list of games and make a variable
// of all of them
var request = require('request');

module.exports = function getAllGames() {
    return request({
        method:'GET',
        uri: 'https://api.steampowered.com/ISteamApps/GetAppList/v2/?',
        gzip: true
    },
    function(error, response, body) {
        const gamesList = body;
        return gamesList;
    }
)
};
