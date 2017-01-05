"use strict";
//https://www.typescriptlang.org/docs/handbook/gulp.html
var browserify = require("browserify");
var tsify = require("tsify");
var babelify = require("babelify");

var buffer = require("vinyl-buffer");
var sourceStream = require("vinyl-source-stream");
var uglify = require("gulp-uglify");
var gutil = require("gulp-util");

module.exports = function () {
	var bundler = browserify(
			[$.config.mainTsFile],
			$.lpg.If($.config.isDev, {debug: true})
	)
			.plugin(tsify)
			.transform(babelify, {
				presets   : [
					'es2015'
				],
				extensions: [
					'.tsx',
					'.ts'
				]
			});

	function bundle() {
		return $.combiner(
				bundler.bundle(),
				sourceStream($.config.jsOutputFile),
				buffer(),
				$.lpg.concat("app.min.js"),
				$.lpg.If($.config.isDev, $.lpg.sourcemaps.init()),
				uglify(),
				$.lpg.If($.config.isDev, $.lpg.sourcemaps.write("./maps")),
				$.gulp.dest($.config.jsOutputPath)
		).on("error",
				$.lpg.notify.onError(function (error) {
					return {
						title  : "ts:compile",
						message: "Error: <%= error.message %>"
					}
				}));
	}

	//bundler .on("update", bundle);
	bundler.on("log", gutil.log);

	$.gulp.task("ts:compile", function (cb) {
		bundle();
		return cb();
	});
}
;