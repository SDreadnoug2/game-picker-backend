const router = require("express").Router();
const SteamAuth = require("node-steam-openid");
const steam = new SteamAuth({
    realm: "https://pickagame.app",
    returnUrl:"https://pickagame.app/libraries/userlibrary",
    apiKey: "11CEE5DB82AEEFD5D66119105D65286C",
});

router.get("/auth/steam", async (req, res) => {
    const redirectUrl = await steam.getRedirectUrl();
    return res.redirect(redirectUrl);
  });
  
router.get("/auth/steam/authenticate", async (req, res) => {
try {
    const user = await steam.authenticate(req);
    console.log(user);
    return user;
} catch (error) {
    console.error(error);
}
});

module.exports = router;