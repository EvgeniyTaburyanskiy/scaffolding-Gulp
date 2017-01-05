/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        08.12.16 23:32
 *  =====================================================
 *
 */

'use strict';

module.exports = function () {
	$.gulp.task('css:sass', function () {
		return $.combiner(
				$.gulp.src($.config.allSassFiles),// {since: $.gulp.lastRun('css:sass')}),
				$.lpg.sassGlob(),
				$.lpg.If($.config.isDev, $.lpg.sourcemaps.init()),
				$.lpg.sass($.config.sassCfg),
				$.lpg.autoprefixer($.config.autoprefixerCfg),
				$.lpg.concat($.config.sassOutputFile),
				$.lpg.csso(),
				$.lpg.If($.config.isDev, $.lpg.sourcemaps.write('./maps')),
				$.gulp.dest($.config.cssOutputPath),
				$.browserSync.stream()
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'css:sass',
						message: "Error: <%= error.message %>"
					}
				})
		)

	})
};
