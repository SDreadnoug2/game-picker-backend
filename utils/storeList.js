let gamesList;
let gamesListLength;
//let gamesListLength = gamesList.length;
const setGamesList = (list) => gamesList = list;
const setGamesListLength = (list) => gamesListLength = list.length;
const getGamesList = () => gamesList
module.exports = {setGamesList, setGamesListLength, getGamesList};
