'use strict';

function Config() {
	var basePath, confObj;

	basePath = {
		lib : './lib',
		src : './src',
		dest: './public'
	};

	confObj = {
		isDev    : !process.env.NODE_ENV || process.env.NODE_ENV == 'development',
		lib      : basePath.lib,
		src      : basePath.src,
		dest     : basePath.dest,
		// Gulp Tasks
		gulpTasks: (function () {
			var
					_dirTasks = './lib/gulp/tasks/',
					_taskList = [
						'serve.js',
						'watch.js',
						'clean.js',
						'css.vendors.js',
						'css.sass.js',
						'js.vendors.js',
						//'ts.compile.js',
						'js.compile.js',
						//'js.process.js',
						'js.lint.js',
						'assets.image.js',
						'assets.fonts.js',
						'assets.svgSprite.js',
						'pug.js'
					];

			return _taskList.map(function (item) {
				return _dirTasks + item;
			})
		}()),

		// JS Opts
		jsVendors   : [//-> Вендорные JS
			'./node_modules/jquery/dist/jquery.slim.min.js',
			'./node_modules/lodash/lodash.min.js'
			//'./node_modules/require.js/require.min.js'
		],
		mainJsFile  : basePath.src + '/js/app.js',   //-> Входной JS проекта
		allJsFiles  : basePath.src + '/js/**/*.js',  //-> Все входные JS проекта
		jsOutputPath: basePath.dest + '/js',        //-> Директория куда складывать все готовые JS


		// CSS Opts
		cssVendors    : [
			'./node_modules/normalize.css/normalize.css',
			//'./node_modules/animate.css/animate.min.css',
			//'./node_modules/magnific-popup/dist/magnific-popup.css'
		],
		mainSassFile  : basePath.src + '/style/app.scss',
		allSassFiles  : basePath.src + '/style/**/*.scss',
		cssOutputPath : basePath.dest + '/css',
		sassOutputFile: 'app.min.css',


		// Page Templates
		allPugFiles: [basePath.src + '/template/**/*.{jade,pug}'],
		pugPages   : [basePath.src + '/template/pages/*.{jade,pug}'],

		// TypeScript Opts
		typings                     : './typings',
		srcApp                      : basePath.src + '/js',
		mainTypeScript              : basePath.src + '/js/app.ts',
		libraryTypeScriptDefinitions: basePath.typings + '/**/*.ts',
		allTypeScript               : basePath.src + '/js/**/*.ts',
		tsOutputFile                : 'app.min.js',

// TOOLS CONFIGS
		pugCfg: {
			pretty: true
		},

		autoprefixerCfg: {
			browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
		},

		sassCfg: {
			//"indentedSyntax": true,
			"includePaths": [
				"./node_modules/sass-mediaqueries",
				"./node_modules/sass-flex-mixin",
				"./node_modules/bourbon/app/assets/stylesheets",
			]
		}
	};

	return confObj;
}

module.exports = new Config();
