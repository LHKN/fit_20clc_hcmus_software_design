const route1 = require('./admin');
const route2 = require('./customer')

function route(app) {
    app.use('/admin', route1);
    app.use('/customer', route2);
    app.get('/', function(req, res){
        res.redirect('/customer/home');
    });
}

module.exports = route;
