const path = require("path");
const fs = require('fs');
const checkAuth = require("../middlewares/checkAuth");
const jwt = require("jsonwebtoken");

exports.get = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) {
        res.sendFile(path.resolve("upload/default.png"));
    } else {

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.sendFile(path.resolve("upload/default.png"));
        } else {
            if(req.query.id) {
                if (fs.existsSync(path.resolve("upload/" + req.query.id + ".png"))) {

                    res.sendFile(path.resolve("upload/" + req.query.id +".png"));
                } else {
                    res.sendFile(path.resolve("upload/default.png"), {
                        id: checkAuth.getUser(req)
                    });
                }
            } else {
                res.sendFile(path.resolve("upload/default.png"), {
                        id: checkAuth.getUser(req)
                });
                return;
            }
        }
    })
    }
}

exports.delete = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) {
        res.statusCode(403);
        return;
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.statusCode(403);
            } else {
                if(req.query.id) {
                    if(req.query.id == user.id) {
                        res.statusCode(200);
                        console.log("DELETE");
                    } else {
                        res.statusCode(403)
                    }
                } else {
                    res.statusCode(400);
                    return;
                }
            }
        })
    }
}
