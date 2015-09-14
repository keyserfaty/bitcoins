module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// concat: {
		// 	task: {
		// 		src: '<%= pkg.name %>.js', 
		// 		dest: 'destination'
		// 	},
		// 	options: {
		// 		'separator': grunt.util.linefeed,
		// 		'banner': '',
		// 		'footer': '',
		// 		'stripBanners': false,
		// 		'process': false,
		// 		'sourceMap': false,
		// 		'sourceMapName': undefined,
		// 		'sourceMapStyle': 'embed'
		// 	}
		// },
		cssmin: {
			task: {
				src: 'public/css/style.css', 
				dest: 'public/css/style.min.css'
			},
			options: {
				'banner': null,
				'keepSpecialComments': '*',
				'report': 'min'
			}
		},
		// no sé qué hace
		// jshint: {
		// 	task: {
		// 		src: '<%= pkg.name %>.js', 
		// 		dest: 'destination'
		// 	},
		// 	options: {
		// 		'globals': null,
		// 		'jshintrc': null,
		// 		'extensions': '',
		// 		'ignores': null,
		// 		'force': false,
		// 		'reporter': null,
		// 		'reporterOutput': null
		// 	}
		// },
		sass: {
			task: {
				src: 'src/assets/scss/style.scss', 
				dest: 'public/css/style.css'
			},
			options: {
				'trace': false,
				'unixNewlines': false,
				'check': false,
				'style': 'nested',
				'precision': 3,
				'quiet': false,
				'compass': false,
				'debugInfo': false,
				'lineNumbers': false,
				'loadPath': [],
				'require': [],
				'cacheLocation': '.sass-cache',
				'noCache': false,
				'bundleExec': false,
				'update': false
			}
		},
		// no sé para qué es
		// uglify: {
		// 	task: {
		// 		src: 'public/<%= pkg.name %>.js', 
		// 		dest: 'destination'
		// 	},
		// 	options: {
		// 		'mangle': {},
		// 		'compress': {},
		// 		'beautify': false,
		// 		'expression': false,
		// 		'report': 'min',
		// 		'sourceMap': false,
		// 		'sourceMapName': undefined,
		// 		'sourceMapIn': undefined,
		// 		'sourceMapIncludeSources': false,
		// 		'enclose': undefined,
		// 		'wrap': undefined,
		// 		'exportAll': false,
		// 		'preserveComments': undefined,
		// 		'banner': '',
		// 		'footer': ''
		// 	}
		// },
		watch: {
	      sass: {
	        files: 'src/assets/scss/style.scss',
	        tasks: ['sass', 'cssmin']
	      }
	    }
	});

	// grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['cssmin', 'sass', 'watch']);

	// grunt.registerTask('default', ['concat', 'cssmin', 'imagemin', 'jshint', 'sass', 'uglify', 'watch']);
};