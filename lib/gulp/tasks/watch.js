'use strict';

module.exports = function () {
	$.gulp.task('watch', function () {
		$.gulp.watch($.config.allTsFiles, $.gulp.series('ts:compile'));
		$.gulp.watch($.config.allSassFiles, $.gulp.series('css:sass'));
		$.gulp.watch($.config.src + '/assets/**/*.*', $.gulp.series('assets'));
		$.gulp.watch($.config.allPugFiles, $.gulp.series('pug'));
	});
};
