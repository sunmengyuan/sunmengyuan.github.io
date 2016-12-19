var gulp = require('gulp');
var debug = require('gulp-debug');
var changed = require('gulp-changed');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('minify_demos', function () {
    var srcPath = './demosSrc';
    var targetPath = './demos';
    var htmlPath = srcPath + '/**/*.html';
    var jsPath = srcPath + '/**/*.js';
    var cssPath = srcPath + '/**/*.css';
    var imgPath = srcPath + '/**/*.{png,jpg}';
    var minJsPath = srcPath + '/**/*.min.js';
    var minCssPath = srcPath + '/**/*.min.css';

    gulp.src(htmlPath)
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(changed(targetPath))
        .pipe(gulp.dest(targetPath))
        .pipe(debug({title: 'html:'}));

    gulp.src([jsPath, '!' + minJsPath])
        .pipe(uglify())
        .pipe(changed(targetPath))
        .pipe(gulp.dest(targetPath))
        .pipe(debug({title: 'js:'}));
    gulp.src(minJsPath)
        .pipe(changed(targetPath))
        .pipe(gulp.dest(targetPath))
        .pipe(debug({title: 'min.js:'}));

    gulp.src([cssPath, '!' + minCssPath])
        .pipe(minifyCss())
        .pipe(changed(targetPath))
        .pipe(gulp.dest(targetPath))
        .pipe(debug({title: 'css:'}));
    gulp.src(minCssPath)
        .pipe(changed(targetPath))
        .pipe(gulp.dest(targetPath))
        .pipe(debug({title: 'min.css:'}))

    gulp.src(imgPath)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(changed(targetPath))
        .pipe(gulp.dest(targetPath))
        .pipe(debug({title: 'img:'}));
});
gulp.task('minify_materials', function () {
    var path = './materials';
    var pattern = path + '/**/*.{png,jpg}';
    gulp.src(pattern)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(changed(path))
        .pipe(gulp.dest(path))
        .pipe(debug({title: 'img:'}));
});