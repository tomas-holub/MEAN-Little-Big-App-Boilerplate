var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var path = require('path');
var less = require('gulp-less');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var karma = require('gulp-karma');
var protractor = require("gulp-protractor").protractor;
var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('run-sequence');
//// By gulp-karma karma.conf.js files array is replaced with:
//var testFiles = [
//    'bower_components/angular/angular.js',
//    'bower_components/angular-mocks/angular-mocks.js',
//    'public/js/*.js',
//    'tests/unit/*.js'
//];
//
//gulp.task('test', function() {
//    // Be sure to return the stream
//    return gulp.src(testFiles)
//        .pipe(karma({
//            configFile: 'karma.conf.js',
//            action: 'run'
//        }))
//        .on('error', function(err) {
//            // Make sure failed tests cause gulp to exit non-zero
//          //  throw err;
//        });
//});
//
//gulp.task('e2e', function(){
//    return gulp.src(["tests/*.js"])
//        .pipe(protractor({
//            configFile: "protractor.conf.js",
//            args: ['--baseUrl', 'http://127.0.0.1:8000']
//        }))
//        .on('error', function(e) { throw e })
//
//});

gulp.task('compileLess', function () {
    return gulp.src('./client/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./client/css'))
        .pipe(livereload());
});

gulp.task('copyTemplate', function() {
    gulp.src('client/index.html').pipe(gulp.dest('public'));
});

gulp.task('copyCSS', function() {
    gulp.src('client/css/*').pipe(gulp.dest('public/css'));
});

gulp.task("copyJS", function () {
    return gulp.src(["client/js/**/*.js"])
        .pipe(gulp.dest("public/js"));
});

gulp.task('minify', function() {
    gulp.src('client/index.html')
        .pipe(usemin({
            assetsDir: 'client',
            css: [minifyCss(), 'concat'],
            js:[]
        }))
        .pipe(gulp.dest('public'));
});

gulp.task("requirejsBuild", function () {
    return gulp.src(["client/js/**/*.js", 'bower_components/**/*.js'])
        .pipe(amdOptimize("main", {configFile: 'client/config/amd_config.js'}))
        .pipe(concat("app.minified.js"))
        .pipe(uglify())
        .pipe(gulp.dest("public/js"));
});

gulp.task('clean', function (cb) {
    del([
        'public/js/**',
        'public/css/**'
    ],cb);
});

gulp.task('dev', function() {
    runSequence('clean', ['compileLess', 'copyTemplate', 'copyCSS', 'copyJS'])
});

gulp.task('prod', function() {
    runSequence('clean', ['compileLess', 'minify', 'requirejsBuild'])
});

