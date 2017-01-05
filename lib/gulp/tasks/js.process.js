
'use strict';

module.exports = function () {
	$.gulp.task('js:process', function () {
		return $.combiner(
				$.gulp.src($.config.mainJsFile, {since: $.gulp.lastRun('js:process')}),
				$.lpg.If(
						$.config.isDev,
						$.lpg.sourcemaps.init({loadMaps: true})
				),
				$.lpg.babel(),
				$.lpg.concat('app.min.js'),
				$.lpg.If(
						$.config.isDev,
						$.lpg.sourcemaps.write('./maps')
				),
				$.gulp.dest($.config.jsOutputPath)
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'js:process',
						message: 'Error: <%= error.message %>'
					};
				})
		);
	});
};
