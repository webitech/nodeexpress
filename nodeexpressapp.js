(function () {
    'use strict';
    var express = require('express'),
        app = express(),
        port = process.env.PORT || 5000,
        bookRouter = require('./src/routes/bookRoutes')('PL'),
        pub = express.static('public');
    
    
    app.use(pub);
    app.set('views', './src/views');
    app.set('view engine', 'ejs');
    app.use('/Books', bookRouter);

    app.get('/', function (req, res) {
        res.render('index',
            {title: 'Hello from render ' + Date(),
                nav: [
                    {Link: '/Books', Text: 'Books'},
                    {Link: '/Authors', Text: 'Authors'}
                ]});
    });          

    app.get('/books', function (req, res) {
        res.send('hello books!');
    });
    
    app.listen(port, function (err) {
        console.log('listening on ' + port);
    });
}());