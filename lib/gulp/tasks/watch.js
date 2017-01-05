'use strict';

module.exports = function () {
	$.gulp.task('watch', function () {
		$.gulp.watch($.config.allJsFiles, $.gulp.series('js:compile'));
		$.gulp.watch($.config.allSassFiles, $.gulp.series('css:sass'));
		$.gulp.watch($.config.allPugFiles, $.gulp.series('pug'));
		$.gulp.watch($.config.src + '/assets/**/*.*', $.gulp.series('assets'));
	});
};
