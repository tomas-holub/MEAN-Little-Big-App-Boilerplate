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
var gulpDocs = require('gulp-ngdocs');
var templateCache = require('gulp-angular-templatecache');

gulp.task('ngdocs', [], function () {
    return gulp.src('client/js/**/*.js')
        .pipe(gulpDocs.process())
        .pipe(gulp.dest('./docs'));
});

gulp.task('templateCache', function () {
    gulp.src('client/views/**/*.html')
        .pipe(templateCache({standalone:true}))
        .pipe(gulp.dest('client/js'));
});

gulp.task('unitTests', function () {
    return gulp.src(['no need to supply files because everything is in config file'])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }).on('error', function (err) {
            process.exit(1);
        }));
});

gulp.task('e2eTests', function () {
    return gulp.src(["tests/e2e/*.js"])
        .pipe(protractor({
            configFile: "protractor.conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:3000']
        }))
        .on('error', function (e) {
            throw e
        })

});

gulp.task('compileLess', function () {
    return gulp.src('./client/less/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./client/css'))
        .pipe(livereload());
});

gulp.task('copyTemplate', function () {
    gulp.src('client/index.html').pipe(gulp.dest('public'));
});

//used only partitaly
gulp.task('copyViews', function () {
    gulp.src('client/views/*.html').pipe(gulp.dest('public/views'));
});

gulp.task('copyCSS', function () {
    gulp.src('client/css/*').pipe(gulp.dest('public/css'));
});

gulp.task("copyJS", function () {
    return gulp.src(["client/js/**/*.js"])
        .pipe(gulp.dest("public/js"));
});

gulp.task('minify', function () {
    gulp.src('client/index.html')
        .pipe(usemin({
            assetsDir: 'client',
            css: [minifyCss(), 'concat'],
            js: []
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
    ], cb);
});

gulp.task('devf', function () {
    runSequence('clean', 'templateCache', ['unitTests', 'e2eTests', 'compileLess', 'copyTemplate', 'copyCSS', 'copyJS'])
});

gulp.task('dev', function () {
    runSequence('clean', 'templateCache', ['unitTests', 'compileLess', 'copyTemplate', 'copyCSS', 'copyJS', 'copyViews'])
});

gulp.task('prod', function () {
    runSequence('clean', 'templateCache', ['compileLess', 'minify', 'requirejsBuild'])
});

