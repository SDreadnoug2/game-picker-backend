const express = require('express');
const steamStoreRouter = require("./steamStore");
const userLibraryRouter = require("./userLibrary");
const authRouter = require("./auth");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/steamstore", steamStoreRouter);
//router.use("/userLibrary", userLibraryRouter);

module.exports = router;