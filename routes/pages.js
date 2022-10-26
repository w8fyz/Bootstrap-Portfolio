const express = require('express');
const headerManager = require('../controllers/headerManager')
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.get('/',( req, res) => {
    res.render('index', {
        urlPath: headerManager.getUrl(req),
        user: checkAuth.getUser(req)
    });
})

router.get('/aboutme', (req, res) => {
    res.render('aboutme', {
        urlPath: headerManager.getUrl(req),
        user: checkAuth.getUser(req)
    });
})

router.get('/skills', (req, res) => {
    res.render('skills', {
        urlPath: headerManager.getUrl(req),
        user: checkAuth.getUser(req)
    });
})

router.get('/projects', (req, res) => {
    res.render('projects', {
        urlPath: headerManager.getUrl(req),
        user: checkAuth.getUser(req)
    });
})

router.get('/login', (req, res) => {
    res.render('login', {
        urlPath: headerManager.getUrl(req)
    });
})

router.get('/register', (req, res) => {
    res.render('register', {
        urlPath: headerManager.getUrl(req)
    });
})


module.exports = router;
