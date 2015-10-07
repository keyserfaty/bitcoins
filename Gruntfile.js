module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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

    jshint: {
      task: {
        src: ['lib/*.js', '*.js', 'src/*.js']
      },
      options: {
        'globals': null,
        'force': false,
        'reporter': null,
        'reporterOutput': null
      }
    },

    sass: {
      task: {
        src: 'src/css/scss/style.scss', 
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

    uglify: {
      task: {
        src: 'src/js/*.js', 
        dest: 'public/js/app.min.js'
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
        sass: {
          files: 'src/css/scss/style.scss',
          tasks: ['sass', 'cssmin']
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['cssmin', 'sass', 'watch', 'jshint', 'uglify']);

};