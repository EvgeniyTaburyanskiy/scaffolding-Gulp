/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        08.12.16 23:25
 *  =====================================================
 *
 */

'use strict';

module.exports = function () {
	$.gulp.task('js:vendors', function () {
		return $.combiner(
				$.gulp.src($.config.jsVendors, {since: $.gulp.lastRun('js:vendors')}),
				$.lpg.concat('vendors.min.js'),
				$.gulp.dest($.config.jsOutputPath)
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'js:vendors',
						message: "Error: <%= error.message %>"
					}
				})
		)
	})
};
