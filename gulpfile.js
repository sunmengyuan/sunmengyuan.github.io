var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('default', function () {
    console.log('hello world');
});
gulp.task('minify_demos', function () {
    var srcPath = './demosSrc';
    var targetPath = './demos';
    var htmlPath = srcPath + '/**/*.html';
    var jsPath = srcPath + '/**/*.js';
    var cssPath = srcPath + '/**/*.css';
    var imgPath = [srcPath + '/**/*.jpg', srcPath + '/**/*.png'];
    var minJsPath = srcPath + '/**/*.min.js';
    var minCssPath = srcPath + '/**/*.min.css';

    gulp.src(htmlPath)
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest(targetPath));

    gulp.src([jsPath, '!' + minJsPath])
        .pipe(uglify())
        .pipe(gulp.dest(targetPath));
    gulp.src(minJsPath)
        .pipe(gulp.dest(targetPath));

    gulp.src([cssPath, '!' + minCssPath])
        .pipe(minifyCss())
        .pipe(gulp.dest(targetPath));
    gulp.src(minCssPath)
        .pipe(gulp.dest(targetPath));

    gulp.src(imgPath)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(targetPath));
});
gulp.task('minify_materials', function () {
    var path = './materials';
    var pattern = [path + '/**/*.jpg', path + '/**/*.png'];
    gulp.src(pattern)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path));
});