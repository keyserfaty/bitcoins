module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'separator': grunt.util.linefeed,
				'banner': '',
				'footer': '',
				'stripBanners': false,
				'process': false,
				'sourceMap': false,
				'sourceMapName': undefined,
				'sourceMapStyle': 'embed'
			}
		},
		cssmin: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'banner': null,
				'keepSpecialComments': '*',
				'report': 'min'
			}
		},
		imagemin: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'optimizationLevel': 3,
				'progressive': true,
				'interlaced': true,
				'use': null
			}
		},
		jshint: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'globals': null,
				'jshintrc': null,
				'extensions': '',
				'ignores': null,
				'force': false,
				'reporter': null,
				'reporterOutput': null
			}
		},
		sass: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'sourcemap': 'auto',
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
				'banner': '',
				'update': false
			}
		},
		uglify: {
			task: {
				src: ['source'], 
				dest: 'destination'
			},
			options: {
				'mangle': {},
				'compress': {},
				'beautify': false,
				'expression': false,
				'report': 'min',
				'sourceMap': false,
				'sourceMapName': undefined,
				'sourceMapIn': undefined,
				'sourceMapIncludeSources': false,
				'enclose': undefined,
				'wrap': undefined,
				'exportAll': false,
				'preserveComments': undefined,
				'banner': '',
				'footer': ''
			}
		},
		watch: {
	      concat: {
	        files: '<%= project.src %>/js/{,*/}*.js',
	        tasks: ['concat:dev', 'jshint']
	      },
	      sass: {
	        files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
	        tasks: ['sass:dev', 'cssmin:dev']
	      }
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'cssmin', 'imagemin', 'jshint', 'sass', 'uglify', 'watch']);
};