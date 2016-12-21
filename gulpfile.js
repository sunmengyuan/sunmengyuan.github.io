var gulp = require('gulp');
var debug = require('gulp-debug');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var jsmin = require('gulp-uglify');
var imgmin = require('gulp-imagemin');
var del = require('del');
var vinylpaths = require('vinyl-paths');

var minify = function (root, extname, action) {
    var include = root + '/**/*' + extname;
    var exclude = '!' + root + '/**/*.min' + extname;
    gulp.src([include, exclude])
        .pipe(vinylpaths(del))
        .pipe(action)
        .pipe(rename(function (path) {
            var extname = path.extname;
            path.extname = '.min' + extname;
        }))
        .pipe(gulp.dest(root))
        .pipe(debug());
};

gulp.task('minify_demos', function () {
    var root = './demos';
    minify(root, '.html', htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        })
    );
    minify(root, '.css', cssmin());
    minify(root, '.js', jsmin());
    minify(root, '.{png,jpg}', imgmin({
            progressive: true
        })
    );
});
gulp.task('minify_materials', function () {
    var root = './materials';
    minify(root, '.{png,jpg}', imgmin({
            progressive: true
        })
    );
});