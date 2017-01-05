//https://www.youtube.com/watch?v=pjdrg6n5puU

'use strict';
let fs = require('fs');

module.exports = function () {
	$.gulp.task('js:lint', function () {

		let eslintResults = {};//-> Кеш предыдущего запуска EsLint
		let cacheFilePath = process.cwd() + '/tmp/lintCache.json';

		try {
			eslintResults = JSON.parse(fs.readFileSync(cacheFilePath));
		}
		catch (e) {
		}

		return $.gulp.src($.config.allJsFiles, {read: false})
		//.pipe(debug({title: 'src'}))
				.pipe($.lpg.If(
						// Если в Кеше есть инфо по файлу из потока и время модиф фала совпадает с веременем из кеша
						function (file) {
							return eslintResults[file.path] && eslintResults[file.path].mtime == file.stat.mtime.toJSON();
						},
						// Тогда подсовываем в выход потока кеш
						$.through2(function (file, enc, callback) {
							file.eslint = eslintResults[file.path].eslint;
							callback(null, file);
						}),
						// Иначе обрабатываем файл через EsLint и кешируем результат
						$.combiner(
								// Читаем контент и заталкиваем в поток vynil
								$.through2(function (file, enc, callback) {
									file.contents = fs.readFileSync(file.path);
									callback(null, file);
								}),
								// Обрабатываем поток в EsLint
								$.lpg.eslint(),
								// Кешируем результат
								$.through2(function (file, enc, callback) {
									eslintResults[file.path] = {
										eslint: file.eslint,
										mtime : file.stat.mtime
									};
									callback(null, file);
								})
						)
				))
				// Кеш сбрасываем в файл кеша
				.on('end', function () {
					let  dir = './tmp';
					if (!fs.existsSync(dir)){
						fs.mkdirSync(dir);
					}
					fs.writeFileSync(cacheFilePath, JSON.stringify((eslintResults)));
				})
				.pipe($.lpg.eslint.failAfterError());
	});
};
