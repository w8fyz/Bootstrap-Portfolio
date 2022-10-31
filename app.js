const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookie = require('cookie-parser');
const exphbs = require('express-handlebars');

dotenv.config({
    path: './.env'
})

/*mysql.db.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MYSQL Connected...");
    }
})*/

const app = express();

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory))

app.use(cookie())
app.use(express.urlencoded({extended: false}))
app.use(express.json());

const hbs = exphbs.create({
    extname: "hbs",
    defaultLayout: "",
    layoutsDir: "",
    helpers: {
        times: function(n, block) {
            var accum = '';
            for(var i = 1; i < n+1; ++i)
                accum += block.fn(i);
            return accum;
        },
        xif: function (expression, options) {
            return hbs.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
        },
        x: function(expression, options) {
            var result;
            var context = this;
            with(context) {
                result = (function() {
                    try {
                        return eval(expression);
                    } catch (e) {
                        console.warn('•Expression: {{x \'' + expression + '\'}}\n•JS-Error: ', e, '\n•Context: ', context);
                    }
                }).call(context); // to make eval's lexical this=context
            }
            return result;
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/action', require('./routes/actions'));


app.listen(8080, () => {
    console.log("Server started on Port 8080!");
});
