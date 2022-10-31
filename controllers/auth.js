const checkAuth = require("../middlewares/checkAuth");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


exports.register = (req, res) => {
    const {showName, firstname, lastname, email, password, passwordConfirm} = req.body;

    if(!showName || !firstname || !lastname || !email || !password || !passwordConfirm)             return res.render('register', {
        message: 'Tout les champs doivent être complétés',
        id: checkAuth.getUser(req)
    })

    mysql.db.query('SELECT mail FROM users WHERE mail = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return  res.render('register', {
                message: 'L\'adresse mail est déjà utilisée !',
                id: checkAuth.getUser(req)
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Les mot de passes ne correspondent pas',
                id: checkAuth.getUser(req)
            });
        }
        let hashPwd = await bcrypt.hash(password, 8);

        mysql.db.query('INSERT INTO users SET ? ', {isAdmin: 0, name: name, mail: email, password: hashPwd}, async (error, result) => {
            if (error) {
                console.log(error);
            } else {
                return res.render('register', {
                    message: 'Utilisateur inscrit !',
                    id: checkAuth.getUser(req)
                });
            }
        })

    });
}

exports.logout = (req, res) => {
    res.clearCookie('access_token');
    return res.redirect('/');
}

exports.login = (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) return res.render('login', {
        message: 'Tout les champs doivent être complétés',
        id: checkAuth.getUser(req)
    })

    mysql.db.query('SELECT * FROM users WHERE mail = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0 && bcrypt.compareSync(password, results[0].password)) {

            const isAdmin = results[0].isAdmin;
            const name = results[0].name;
            const id = results[0].id;

            const token = await jwt.sign({id, name, email, isAdmin}, process.env.JWT_SECRET, {expiresIn: 3600000})
            res.cookie('access_token', token, {
                httpOnly: false
            });
            return res.redirect("../dashboard");
        } else {
            return res.render('login', {
                message: 'Le compte est introuvable ou le mot de passe est incorrect.',
                id: checkAuth.getUser(req)
            })
        }

    });
}
