/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        20.12.16 17:21
 *  =====================================================
 *
 */

'use strict';
//https://www.typescriptlang.org/docs/handbook/gulp.html
var browserify = require('browserify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var sourceStream = require('vinyl-source-stream');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var babelify = require('babelify');
//var babelifyCfg = require('./.babelrc');


module.exports = function () {

	var bundler = browserify(
			[$.config.mainJsFile],
			$.lpg.If($.config.isDev, {debug: true})
	).transform(babelify, {'presets': ['es2015']});

	function bundle() {
		return $.combiner(
				bundler.bundle(),
				sourceStream($.config.tsOutputFile),
				buffer(),
				$.lpg.concat('app.min.js'),
				$.lpg.If($.config.isDev, $.lpg.sourcemaps.init()),
				uglify(),
				$.lpg.If($.config.isDev, $.lpg.sourcemaps.write('./maps')),
				$.gulp.dest($.config.jsOutputPath)
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'js:compile',
						message: 'Error: <%= error.message %>'
					}
				}));
	}

	//bundler .on('update', bundle);
	bundler.on('log', gutil.log);

	$.gulp.task('js:compile', function (cb) {
		bundle();
		return cb();
	});

}
;