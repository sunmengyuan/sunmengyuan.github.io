var gulp = require('gulp');
var debug = require('gulp-debug');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var jsmin = require('gulp-uglify');
var imgmin = require('gulp-imagemin');

var minify = function (root, extname, action) {
    gulp.src(root + '/**/*' + extname)
        .pipe(action)
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