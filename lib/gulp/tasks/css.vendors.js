/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        08.12.16 23:43
 *  =====================================================
 *
 */

'use strict';

module.exports = function () {
	$.gulp.task('css:vendors', function () {

		return $.combiner(
				$.gulp.src($.config.cssVendors, {since: $.gulp.lastRun('css:vendors')}),
				$.lpg.concatCss('vendors.min.css'),
				$.lpg.csso(),
				$.gulp.dest($.config.cssOutputPath)
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'css:vendors',
						message: "Error: <%= error.message %>"
					}
				})
		)
	})
};
