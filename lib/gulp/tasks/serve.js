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
