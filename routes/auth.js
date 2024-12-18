const router = require("express").Router();
const SteamAuth = require("node-steam-openid");
const steam = new SteamAuth({
    realm: "https://localhost:3001",
    returnUrl:"https://localhost:3001/auth/steam/authenticate",
    apiKey: "11CEE5DB82AEEFD5D66119105D65286C",
});

router.get("/steam", async (req, res) => {
    const redirectUrl = await steam.getRedirectUrl();
    return res.redirect(redirectUrl);
  });
  
router.get("/steam/authenticate", async (req, res) => {
try {
    const user = await steam.authenticate(req);
    console.log(user);
    //This should redirect back, and then store the userID as a cookie, and
    // then just have the cookie be removed when you click logout. 
    // Explicitly state this, don't save any data whatsoever anywhere.
    
    return res.redirect("https://localhost:5173/libraries");
} catch (error) {
    console.error(error);
}
});

module.exports = router;