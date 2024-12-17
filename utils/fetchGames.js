module.exports.getAllGames = async () => {
    try{
        const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
        const list = await response.json();
        return list.applist.apps;
    } catch (error){
        console.error('Error fetching apps list:', error);
        throw error;
    }
};
/*
module.exports.validateGame = async () => {
    try{ 
        const response = await fetch('`https://store.steampowered.com/api/appdetails?appids=${gameId.appid}&filters=basic,price_overview,screenshots,genres,metacritic,platforms,developers`')
        const gameData = await response.json();
        return gameData;
    } catch(error){
        console.error('Error fetching individual game:', error);
    }
}*/