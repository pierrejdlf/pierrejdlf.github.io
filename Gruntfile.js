module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // settings set in config.json will be available as constants within angular
    //conf: grunt.file.readJSON('config.json'),

    // ngconstant: {
    //   options: {
    //     space: '  '
    //   },
    //   // Environment targets
    //   development: [{
    //     dest: 'app/js/config.js',
    //     wrap: '"use strict";\n\n <%= __ngModule %>',
    //     name: 'config',
    //     constants: {
    //       settings: '<%= conf.settings.dev %>'
    //     }
    //   }],
    //   production: [{
    //     dest: 'app/js/config.js',
    //     wrap: '"use strict";\n\n <%= __ngModule %>',
    //     name: 'config',
    //     constants: {
    //       settings: '<%= conf.settings.prod %>'
    //     }
    //   }]
    // },

    env : {
      options : {
          /* Shared Options Hash */
          //globalOption : 'foo'
      },
      dev: {
        NODE_ENV : 'DEVELOPMENT'
      },
      prod : {
        NODE_ENV : 'PRODUCTION'
      }
    },

    less: {
      prod: {
        options: {
          paths: ["assets"]
        },
        files: {
          "app/css/styles.css": "app/css/*.less"
        }
      }
    },

    // removelogging: {
    //   dist: {
    //     src: "app/js/*.js",
    //     dest: "dist/js/*_nolog.js",
    //     options: {}
    //   }
    // },

    concat: {
      options: {
        separator: '\n;\n\n'
      },
      css: {
        src: [
          //'app/lib/font-awesome/css/font-awesome.min.css',
          //'app/lib/intro.js/introjs.css', // introjs.css has its own minified version
          'app/vendor/normalize.css/normalize.css',
          'app/vendor/animate.css/animate.min.css',
          // 'app/vendor/icomoon/dist/css/style.css',
          'app/css/font.css',
          'app/css/styles.css'
        ],
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      js: {
        src: [
          'app/vendor/underscore/underscore-min.js',
          
          'app/vendor/angular/angular.min.js',
          'app/vendor/angular-route/angular-route.min.js',
          'app/vendor/angular-messages/angular-messages.min.js',
          'app/vendor/angular-gettext/dist/angular-gettext.min.js',
          'app/vendor/angular-animate/angular-animate.min.js',
          'app/vendor/angular-progress-arc/angular-progress-arc.min.js',

          'app/js/*.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    copy: {
        dist: {
            files: [
                // {
                //     src: [ 'app/lib/intro.js/minified/introjs.min.css'],
                //     dest: 'dist/css/introjs.min.css',
                //     filter: 'isFile'
                // },
                {
                    expand: true,
                    flatten: true,
                    src: [ 
                        'app/fonts/**'
                    ],
                    dest: 'dist/fonts/',
                    filter: 'isFile'
                },
                // {
                //     expand: true,
                //     flatten: true,
                //     src: [ 
                //         'app/vendor/icomoon/dist/fonts/**'
                //     ],
                //     dest: 'dist/fonts/',
                //     filter: 'isFile'
                // },
                // {
                //     expand: true,
                //     flatten: true,
                //     src: [ 
                //         'app/lib/font-awesome/fonts/**'
                //     ],
                //     dest: 'dist/fonts/',
                //     filter: 'isFile'
                // },
                // {
                //     expand: true,
                //     flatten: true,
                //     src: [ 
                //         'app/lib/font-awesome/css/**'
                //     ],
                //     dest: 'dist/css/',
                //     filter: 'isFile'
                // },
                {
                    expand: true,
                    flatten: false,
                    cwd: 'app/images/',
                    src: ['**'],
                    dest: 'dist/images/'
                },
                {
                    expand: true,
                    flatten: true,
                    src: ['app/partials/**'],
                    dest: 'dist/partials/',
                    filter: 'isFile'
                }
            ]
        }
    },

    preprocess : {
      prod : {
        src : 'app/index.html',
        dest : 'dist/index.html'
      }
    },

    strip : {
      main : {
        src : 'dist/js/<%= pkg.name %>.js',
        dest : 'dist/js/<%= pkg.name %>.nolog.js',
        options : {
          nodes : ['console.log']
        }
      }
    },

    // ngAnnotate: {
    //   all: {
    //     options: {
    //       remove: true
    //     },
    //     src: ['dist/js/<%= pkg.name %>.js'],
    //     dest: 'dist/js/<%= pkg.name %>.ngm.js'
    //   }
    // },

    uglify: {
      options: {
        banner: '\n/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n\n',
        mangle: false
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['dist/js/<%= pkg.name %>.nolog.js']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    nggettext_extract: {
      pot: {
        files: {
          'po/template.pot': ['app/index.html','app/partials/*.html']
        }
      }
    },
    nggettext_compile: {
      all: {
        files: {
          'app/js/translations.js': ['po/*.po']
        }
      }
    }

    // watch: {
    //   files: ['<%= jshint.files %>'],
    //   tasks: ['jshint', 'qunit']
    // }

  });
  


  // grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy' );
  // grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-strip');

  // for i18n translations using angular-gettext
  grunt.loadNpmTasks('grunt-angular-gettext');

  //grunt.registerTask('dev', ['ngconstant:development']);  
  //grunt.registerTask('prod', ['ngconstant:production']);
  grunt.registerTask('default',['nggettext_extract','nggettext_compile','jshint','env:prod','less:prod','concat:js','concat:css','copy','strip','uglify','preprocess:prod']);

};