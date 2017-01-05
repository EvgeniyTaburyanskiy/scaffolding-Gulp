
'use strict';

module.exports = function () {
	$.gulp.task('watch', function () {
		//$.gulp.series('ts:watch');
		$.gulp.watch($.config.allJsFiles, $.gulp.series('js:compile'));
		$.gulp.watch($.config.allSassFiles, $.gulp.series('css:sass'));
		$.gulp.watch($.config.allPugFiles, $.gulp.series('pug'));
		//$.gulp.watch('./source/images/**/*.*', $.gulp.series('copy:image'));
		//$.gulp.watch('./source/fonts/**/*.*', $.gulp.series('copy:fonts'));
	});
};
