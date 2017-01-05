/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        08.12.16 23:45
 *  =====================================================
 *
 */

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
