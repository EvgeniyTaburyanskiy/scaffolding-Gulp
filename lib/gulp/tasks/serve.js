/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        09.12.16 1:40
 *  =====================================================
 *
 */

'use strict';

module.exports = function () {
	$.gulp.task('serve', function () {

		$.browserSync(
				{
					notify: false,
					port  : 8080,
					server: $.config.dest
				}
		);

		$.browserSync.watch($.config.dest + '/**/*.*', $.browserSync.reload);
	});
};
