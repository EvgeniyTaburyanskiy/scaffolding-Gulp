'use strict';

module.exports = function () {
	$.gulp.task('assets', function () {
		return $.combiner(
				$.gulp.src(
						$.config.src + '/assets/**/*.*',
						{since: $.gulp.lastRun('assets')}
				),
				$.gulp.dest($.config.dest)
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'assets',
						message: "Error: <%= error.message %>"
					}
				})
		);
	});
};
