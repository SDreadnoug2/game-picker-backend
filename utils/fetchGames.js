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
