require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars')
const path = require('path');
const route = require('./routes');
const { mainModule } = require('process');
const config = require('./config');
const db = require('./config/database');
const cookieParser = require('cookie-parser');
const ban = require('./app/controllers/admin/ban_unban')


const helper = hbs.create({});
helper.handlebars.registerHelper('forloop', function(from, to, incr, url, block) {
    var accum = '';
    for(var i = from; i<= to; i+=incr){
        block.data.index = i;
        block.data.realUrl = url;
        accum+= block.fn(i);
    }
    return accum;
});

// database
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(error => console.log(error));


const app = express();
const port = process.env.APP_PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// http logger
app.use(morgan('dev'));

// template engine
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.set('port', port);

app.engine('handlebars', hbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'customer-main',
}));

route(app);

// app.listen(port, () => {})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))