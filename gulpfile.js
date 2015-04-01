//var gulp = require('gulp');
//var gutil = require('gulp-util');
//var less = require('gulp-less');
//var path = require('path');
//var uglify = require('gulp-uglify');
//var watch = require('gulp-watch');
//var concat = require('gulp-concat');
//var notify = require('gulp-notify');
//
//
//
//
//
//gulp.task('less', function () {
//    return gulp.src('./less/**/*.less')
//        .pipe(less({
//            paths: [path.join(__dirname, 'less', 'includes')]
//        }))
//        .pipe(gulp.dest('./public/stylesheets'));
//});
//
//
//// uglify task
//gulp.task('js', function () {
//    // main app js file
//    gulp.src('./assets/js/app.js')
//        .pipe(uglify())
//        .pipe(concat("app.min.js"))
//        .pipe(gulp.dest('./assets/js/'));
//
//    // create 1 vendor.js file from all vendor plugin code
//    gulp.src('./assets/js/vendor/**/*.js')
//        .pipe(uglify())
//        .pipe(concat("vendor.js"))
//        .pipe(gulp.dest('./assets/js'))
//        .pipe(notify({message: "Javascript is now ugly!"}));
//});
//
//gulp.task('watch', function () {
//    // watch scss files
//    gulp.watch('./less/*.less', function () {
//        gulp.run('less');
//    });
//
//    gulp.watch('./assets/js/**/*.js', function () {
//        gulp.run('js');
//    });
//});
//
//gulp.task('default', ['less', 'js', 'watch']);
//gulp.task('production', ['less']);


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

// By gulp-karma karma.conf.js files array is replaced with:
var testFiles = [
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'public/js/*.js',
    'tests/unit/*.js'
];

gulp.task('test', function() {
    // Be sure to return the stream
    return gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
          //  throw err;
        });
});

gulp.task('e2e', function(){
    return gulp.src(["tests/*.js"])
        .pipe(protractor({
            configFile: "protractor.conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', function(e) { throw e })

});

gulp.task('less', function () {
    return gulp.src('./client/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('minify', function() {
    gulp.src('client/index.html')
        .pipe(usemin({
            assetsDir: 'public',
            css: [minifyCss(), 'concat'],
            js: [uglify(), 'concat']
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('pure', function() {
    gulp.src('client/index.html')
        .pipe(gulp.dest('public'));
});
gulp.task('fonts', function() {
    gulp.src([
        'bower_components/foundation-icon-fonts/foundation-icons.woff',
        'bower_components/foundation-icon-fonts/foundation-icons.ttf'
    ]).pipe(gulp.dest('public/css'));
});




gulp.task('dev', ['less', 'pure','test','e2e']);
gulp.task('prod', ['less', 'minify','fonts']);