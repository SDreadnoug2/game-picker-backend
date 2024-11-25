module.exports.getAllGames = (req, res)  => {
    fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
    .then(res => res.json())
    .then(data => {
        const apps = data.applist.apps;
        return apps;
    })
};

