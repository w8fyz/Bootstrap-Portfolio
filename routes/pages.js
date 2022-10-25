const express = require('express');
const headerManager = require('../controllers/headerManager')

const router = express.Router();

router.get('/',( req, res) => {
    res.render('index', {
        urlPath: headerManager.getUrl(req)
    });
})

router.get('/aboutme', (req, res) => {
    res.render('aboutme', {
        urlPath: headerManager.getUrl(req)
    });
})

router.get('/skills', (req, res) => {
    res.render('skills', {
        urlPath: headerManager.getUrl(req)
    });
})

router.get('/projects', (req, res) => {
    res.render('projects', {
        urlPath: headerManager.getUrl(req)
    });
})


module.exports = router;
