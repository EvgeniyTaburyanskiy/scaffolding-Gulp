/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        09.12.16 0:42
 *  =====================================================
 *
 */

'use strict';

module.exports = function () {
	$.gulp.task('clean', function (cb) {
				return $.rimraf('./public', cb);
			}
	)
};
