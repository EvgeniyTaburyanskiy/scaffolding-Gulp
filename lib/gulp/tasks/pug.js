'use strict';

module.exports = function () {
	$.gulp.task('pug', function () {
		return $.combiner(
				$.gulp.src($.config.pugPages, {since: $.gulp.lastRun('pug')}),
				$.lpg.pug($.config.pugCfg),
				$.gulp.dest($.config.dest)
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'pug',
						message: "Error: <%= error.message %>"
					}
				}));
	});
};
