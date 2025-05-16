/***** genesix *****/
const express = require('express');
const { homePage } = require('../controllers/mainController');

const router = express.Router()

router.get("/", homePage)

module.exports = router