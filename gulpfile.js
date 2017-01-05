'use strict';

global.$ = {
	package    : require('./package.json'),
	config     : require('./lib/gulp/config'), // Конфиги всех  тасков
	// Tools
	gulp       : require('gulp'),
	rimraf     : require('rimraf'), //-> делает "rm -fr" в node
	browserSync: require('browser-sync'),//.create(),
	combiner   : require('stream-combiner2').obj, //-> запихивает несколько задач в один поток
	through2   : require('through2').obj,  //-> Инструмент для создания плагиов под gulp
	lpg         : require('gulp-load-plugins')({
		rename: {
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
						'css:vendors',    //-> Собирает  все Вендорные CSS указанные
						'js:vendors',     //-> Собирает  все Вендорные JS указанные
						//'js:lint',      //-> Проверяет на ошибки JS
						'ts:compile',     //-> Собирает все JS
						'assets',         //-> Копирует все картинки из src/assets в build/assets
						'pug'             //-> Обрабатывает PUG и делает из них HTML
				),
				$.gulp.parallel(
						'watch',
						'serve'
				)
		)
);
