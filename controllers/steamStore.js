const { BadRequest } = require("../utils/BadRequestError");
const { fetchGameData } = require("../utils/fetchGameData");

module.exports.randomGame = async function (req, res, next){
    try{
        let gameFound = false;
        let gameData;
        while(!gameFound){
            try{
                gameData = await fetchGameData();
                if(gameData.type !== 'game' || gameData.name.toLowerCase().includes("playtest")) {
                    console.log('this aint no damn game.');
                    continue; 
                }
                console.log(gameData.price_overview.final_formatted);
                gameFound = true;
                }
            catch(error){
                if (error.name === 'TypeError') {
                    continue;
                } else next(error);
            }
        }
        return res.send(gameData);
    } catch (error){
            return next(error);
    }
};