const express = require('express');
const steamStoreRouter = require("./steamStore");
const userLibraryRouter = require("./userLibrary");
const router = express.Router();

router.use("/steamStore", steamStoreRouter);
//router.use("/userLibrary", userLibraryRouter);
router.use("/", () =>{
    console.log("hello");
})
module.exports = router;