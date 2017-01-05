//https://www.youtube.com/watch?v=pjdrg6n5puU

'use strict';
let fs = require('fs');

module.exports = function () {
	$.gulp.task('ts:lint', function () {

		let tslintResults = {};//-> Кеш предыдущего запуска EsLint
		let cacheFilePath = process.cwd() + '/tmp/lintCache.json';

		try {
			tslintResults = JSON.parse(fs.readFileSync(cacheFilePath));
		}
		catch (e) {
		}

		return $.gulp.src($.config.allJsFiles, {read: false})
		//.pipe(debug({title: 'src'}))
				.pipe($.lpg.If(
						// Если в Кеше есть инфо по файлу из потока и время модиф фала совпадает с веременем из кеша
						function (file) {
							return tslintResults[file.path] && tslintResults[file.path].mtime == file.stat.mtime.toJSON();
						},
						// Тогда подсовываем в выход потока кеш
						$.through2(function (file, enc, callback) {
							file.tslint = tslintResults[file.path].tslint;
							callback(null, file);
						}),
						// Иначе обрабатываем файл через TsLint и кешируем результат
						$.combiner(
								// Читаем контент и заталкиваем в поток vynil
								$.through2(function (file, enc, callback) {
									file.contents = fs.readFileSync(file.path);
									callback(null, file);
								}),
								// Обрабатываем поток в TsLint
								$.lpg.tslint(),
								// Кешируем результат
								$.through2(function (file, enc, callback) {
									tslintResults[file.path] = {
										tslint: file.tslint,
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
					fs.writeFileSync(cacheFilePath, JSON.stringify((tslintResults)));
				})
				.pipe($.lpg.tslint());
	});
};
