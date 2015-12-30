/*global require, console */
(function () {
    'use strict';

    var gulp = require('gulp'),
        jsHint = require('gulp-jshint'),
        jscs = require('gulp-jscs'),
        nodemon = require('gulp-nodemon'),
        jsFiles = ['*.js', 'src/**/*.js'],
        htmlFiles = ['src/views/*.*'],
        livereload = require('gulp-livereload');

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

    gulp.task('reload_html', function () {

        livereload.listen({start: true});
        
        var watch = require('gulp-watch');
        
        watch(htmlFiles, function () {
            console.log('HTML files changed...');
            livereload.reload();
        });
        
    });
    
    gulp.task('serve', ['style', 'inject', 'reload_html'], function () {
        var options = {
                script: 'nodeexpressapp.js',
                delayTime: 1,
                env: {
                    'PORT': 3000
                },
                watch: jsFiles
            };
        
        livereload.listen({start: true});
        
        return nodemon(options)
            .on('restart', function (ev) {
                console.log('*************************** Restarting *************************** ');
                livereload.reload();
            });
    });
    
    

}());