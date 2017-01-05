/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        08.12.16 23:30
 *  =====================================================
 *
 */

'use strict';

module.exports = function () {
	$.gulp.task('assets:fonts', function () {
		return $.combiner(
				$.gulp.src(
						$.config.src + '/fonts/**/*.*',
						{since: $.gulp.lastRun('assets:fonts')}
				),
				$.gulp.dest($.config.dest + '/fonts')
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'assets:fonts',
						message: "Error: <%= error.message %>"
					}
				})
		);
	});
};
