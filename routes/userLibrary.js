const router = require('express').Router();
const {randomUserGame} = require("../controllers/userLibrary");


router.get('/random', randomUserGame);

module.exports = router;