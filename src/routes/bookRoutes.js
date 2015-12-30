var router = function (lang) {
    'use strict';
    var express = require('express'),
        bookRouter = express.Router();

    bookRouter.route('/')
        .get(function (req, res) {
            res.render('books',
                {title: 'Hello from BOOKS ' + lang,
                    nav: [
                        {Link: '/Books', Text: 'Books'},
                        {Link: '/Authors', Text: 'Authors'}
                    ]});        
        });    

    bookRouter.route('/:id')
        .get(function (req, res) {

            res.send('hello from single ' + req.params.id);
        });

    return bookRouter;
};

module.exports = router;