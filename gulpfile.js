/*global require, console */
(function () {
    'use strict';

    var gulp = require('gulp'),
        jsHint = require('gulp-jshint'),
        jscs = require('gulp-jscs'),
        nodemon = require('gulp-nodemon'),
        jsFiles = ['*.js', 'src/**/*.js'];

    gulp.task('style', function () {
        return gulp.src(jsFiles)
            .pipe(jsHint())
            .pipe(jsHint.reporter('jshint-stylish', {
                verbose: true
            }))
            .pipe(jscs());
    });

    gulp.task('inject', function () {
        var wiredep = require('wiredep').stream,
            inject = require('gulp-inject'),
            injectSrc = gulp.src(['./public/css/*.css',
                                  './public/js/*.js'], {
                read: false
            }),
            injectOptions = {
                ignorePath: 'public/'
            },
            options = {
                bowerJson: require('./bower.json'),
                directory: './public/lib',
                ignorePath: '../../public/'
            };

        return gulp.src('./src/views/*.html')
            .pipe(wiredep(options))
            .pipe(inject(injectSrc, injectOptions))
            .pipe(gulp.dest('./src/views'));
    });
    
    gulp.task('serve', ['style', 'inject'], function () {
        var options = {
            script: 'app.js',
            delayTime: 1,
            env: {
                'PORT': 3000
            },
            watch: jsFiles
        };
                
        return nodemon(options)
            .on('restart', function (ev) {
                console.log('*************************** Restarting *************************** ');
            });

        
    });

}());