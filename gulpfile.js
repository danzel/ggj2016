var gulp = require('gulp');
var gutil = require("gulp-util");
var zip = require("gulp-zip");
var uglify = require('gulp-uglify');
var webpack = require("webpack");

var webpackConfig = require("./webpack.config.js");


gulp.task("default", ["webpack", 'copy-img', 'copy-font', 'copy-audio']);


gulp.task('webpack', function (callback) {

	var config = Object.create(webpackConfig);
	//Alter the config
	config.devtool = 'source-map';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());

	//Hack around ts confusion
	var webpackMethod = webpack.bind(webpack);

	webpackMethod(config, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('copy-audio', function () {
	gulp.src(['audio/**/*']).pipe(gulp.dest('dist/audio'));
})
gulp.task('copy-img', function () {
	gulp.src(['img/**/*']).pipe(gulp.dest('dist/img'));
})
gulp.task('copy-font', function () {
	gulp.src(['font/**/*']).pipe(gulp.dest('dist/font'));
})

gulp.task('package', ['default'], function () {
	return gulp.src([
		'./dist/**/*'
	], { base: '.' })
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest(''));
});