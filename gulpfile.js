'use strict';

var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');

// build task
gulp.task('default', ['build']);

// create normal and minified versions
gulp.task('build', gulpSequence('clean', ['sass']));

// create minified css files
gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(scsslint())
        .pipe(sass({
            outputStyle: 'compact'
        }).on('error', gutil.log))
        .pipe(gulp.dest('css'))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', gutil.log))
        .pipe(rename(function (path) {
            path.basename += '.min';
            return path;
        }))
        .pipe(gulp.dest('css'));
});

// delete dist and .tmp folder
gulp.task('clean', function () {
    return del.sync(['css/**', '.tmp/**']);
});
