/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        08.12.16 23:31
 *  =====================================================
 *
 */

'use strict';

module.exports = function () {
	$.gulp.task('assets:image', function () {
		return $.combiner(
				$.gulp.src(
						[$.config.src + '/img/**/*.*', '!' + $.config.src + '/img/**/*.svg'],
						{since: $.gulp.lastRun('assets:image')}
				),
				$.gulp.dest($.config.dest + '/img')
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'assets:image',
						message: "Error: <%= error.message %>"
					}
				})
		);
	});
};
