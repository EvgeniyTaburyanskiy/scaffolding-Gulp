'use strict';

global.$ = {
	package    : require('./package.json'),
	config     : require('./lib/gulp/config'), // Конфиги всех  тасков
	// Tools
	gulp       : require('gulp'),
	rimraf     : require('rimraf'), //-> делает "rm -fr" в node
	rsp        : require('remove-svg-properties').stream,
	browserSync: require('browser-sync'),//.create(),
	combiner   : require('stream-combiner2').obj, //-> запихивает несколько задач в один поток
	through2   : require('through2').obj,  //-> Инструмент для создания плагиов под gulp
	lpg         : require('gulp-load-plugins')({
		rename: {
			'gulp-svg-sprite': 'svgSprite',
			'gulp-sass-glob' : 'sassGlob',
			'gulp-if'        : 'If'
		}
	})
};

// Загружаем все таски из отдельных файлов
$.config.gulpTasks.forEach(function (taskPath) {
	require(taskPath)();
});


// Запускаем таски
$.gulp.task('default',
		$.gulp.series(
				'clean', // Очистка директории сборки
				$.gulp.parallel(
						'css:sass',       //-> Собирает sass в css
						'css:vendors',    //-> Собирает  все Вендорные CSS указанные в  gulp/paths/css.foundation.js один foundation.css
						'js:vendors',     //-> Собирает  все Вендорные JS указанные в  gulp/paths/foundation.js в один foundation.js
						//'js:lint',        //-> Проверяет на ошибки JS
						//'js:process',     //-> Собирает все JS указанные в gulp/paths/app.js в один файл с картой app.js
						'js:compile',
						//'ts:compile',
						'assets:image',     //-> Копирует все картинки из source/images в build/assets/img
						'assets:fonts',     //-> Копирует все шрифты из source/fonts в build/assets/fonts
						//'assets:svgSprite', //-> Собирает  все ./source/icons/ очищает их от атрибутов и генерит спрайт svg
						'pug'             //-> Обрабатывает PUG и делает из них HTML
				),
				$.gulp.parallel(
						'watch',
						'serve'
				)
		)
);
