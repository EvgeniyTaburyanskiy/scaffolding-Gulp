/*
 *  =====================================================
 *        Company developer: TeaSoft.
 *        Developer: Evgeniy Taburyanskiy
 *        Site: http://
 *        E-mail: Evgeniy.Taburyanskiy@gmail.com
 *        Copyright (c) 2014-2016 TeaSoft
 *  =====================================================
 *        TeaSoft BX modules
 *        08.12.16 23:46
 *  =====================================================
 *
 */

'use strict';

module.exports = function () {
	$.gulp.task('assets:svgSprite', function () {
		var config = {
			mode : {
				symbol: {
					dest  : '.',
					sprite: 'sprite.svg'
				}
			},
			shape: {
				spacing: {
					padding: 0,
					box    : 'content'
				}
			}
		};

		return $.combiner(
				$.gulp.src($.config.src + '/img/icons/*.svg', {since: $.gulp.lastRun('assets:svgSprite')}),
				$.lpg.svgSprite(config),
				$.rsp.remove({properties: [$.rsp.PROPS_FILL]}),
				$.gulp.dest($.config.dest + '/img/icons')
		).on('error',
				$.lpg.notify.onError(function (error) {
					return {
						title  : 'assets:svgSprite',
						message: "Error: <%= error.message %>"
					}
				})
		)
	});
};
