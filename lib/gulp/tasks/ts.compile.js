'use strict';
//https://www.typescriptlang.org/docs/handbook/gulp.html
var browserify = require('browserify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var sourceStream = require('vinyl-source-stream');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var gutil = require("gulp-util");

module.exports = function () {

	var watchedBrowserify = watchify(
			browserify(
					[$.config.mainTypeScript],
					{
						basedir     : '.',
						debug       : true,
						cache       : {},
						packageCache: {}
					}
			)
			.plugin(tsify)
			.transform('babelify', {
						presets   : ['es2015'],
						extensions: ['.ts']
					}
			)
	);

	function bundle() {
		return $.combiner(
				watchedBrowserify.bundle(),
				$.lpg.If($.config.isDev, sourceStream($.config.tsOutputFile)),
				buffer(),
				$.lpg.If($.config.isDev, $.lpg.sourcemaps.init()),
				uglify(),
				$.lpg.concat('app.min.js'),
				$.lpg.If($.config.isDev, $.lpg.sourcemaps.write('./maps')),
				$.gulp.dest($.config.jsOutputPath)
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'ts:compile',
						message: "Error: <%= error.message %>"
					}
				}));
	}

	watchedBrowserify.on("update", bundle);
	watchedBrowserify.on("log", gutil.log);

	$.gulp.task('ts:compile', function () {
		return bundle();
	});

	$.gulp.task('ts:watch', function () {
	});

}
;