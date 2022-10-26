const express = require('express');
const actionController = require('../controllers/actions');
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.get('/get', actionController.get);
router.post('/delete', actionController.delete);
//router.post('/upload', authController.login);

module.exports = router;