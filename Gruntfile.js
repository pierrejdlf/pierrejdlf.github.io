module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // settings set in config.json will be available as constants within angular
    //conf: grunt.file.readJSON('config.json'),

    ngconstant: {
      options: {
        space: '  ',
        name: 'config'
      },
      // Environment targets
      development: {
        options: {
          dest: 'src/js/config.js' 
        },
        constants: {
          settings: {
            dev: true,
            mediapath: "../media"
          }
        }
      },
      production: {
        options: {
          dest: 'src/js/config.js'
        },
        constants: {
          settings: {
            dev: false,
            mediapath: "../media"
          }
        }
      }
    },

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
          "src/css/styles.css": "src/css/style.less"
        }
      }
    },

    // removelogging: {
    //   dist: {
    //     src: "src/js/*.js",
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
          'src/vendor/font-awesome/css/font-awesome.min.css',

          'src/vendor/normalize.css/normalize.css',
          'src/vendor/animate.css/animate.min.css',
          // 'src/vendor/icomoon/dist/css/style.css',
          'src/css/font.css',
          'src/css/styles.css'
        ],
        dest: 'p/css/<%= pkg.name %>.css'
      },
      js: {
        src: [
          'src/vendor/underscore/underscore-min.js',
          "src/vendor/jquery/dist/jquery.min.js",
          "src/vendor/texttailor/dist/jquery.texttailor.min.js",

          'src/vendor/angular/angular.min.js',
          'src/vendor/angular-sanitize/angular-sanitize.min.js',
          'src/vendor/angular-route/angular-route.min.js',
          //'src/vendor/angular-animate/angular-animate.min.js',

          'src/vendor/showdown/compressed/showdown.js',
          'src/vendor/angular-markdown/angular.markdown.js',

          'src/vendor/angular-texttailor/angular-texttailor.js',

          'src/vendor/js-yaml/dist/js-yaml.min.js',
          
          'src/js/*.js'
        ],
        dest: 'p/js/<%= pkg.name %>.js'
      }
    },

    copy: {
        dist: {
            files: [
                // {
                //     src: [ 'src/lib/intro.js/minified/introjs.min.css'],
                //     dest: 'dist/css/introjs.min.css',
                //     filter: 'isFile'
                // },
                // {
                //     expand: true,
                //     flatten: true,
                //     src: [ 
                //         'src/fonts/**'
                //     ],
                //     dest: 'dist/fonts/',
                //     filter: 'isFile'
                // },
                // {
                //     expand: true,
                //     flatten: true,
                //     src: [ 
                //         'src/vendor/icomoon/dist/fonts/**'
                //     ],
                //     dest: 'dist/fonts/',
                //     filter: 'isFile'
                // },
                {
                    expand: true,
                    flatten: true,
                    src: ['src/vendor/font-awesome/fonts/**'],
                    dest: 'p/fonts/',
                    filter: 'isFile'
                },
                // {
                //     expand: true,
                //     flatten: true,
                //     src: ['src/vendor/font-awesome/css/font-awesome.min.css'],
                //     dest: 'p/css/',
                //     filter: 'isFile'
                // },
                {
                    expand: true,
                    flatten: false,
                    cwd: 'src/images/',
                    src: ['**'],
                    dest: 'p/images/'
                },
                {
                    expand: true,
                    flatten: true,
                    src: ['src/data/**'],
                    dest: 'p/data/',
                    filter: 'isFile'
                },
                {
                    expand: true,
                    flatten: true,
                    src: ['src/partials/**'],
                    dest: 'p/partials/',
                    filter: 'isFile'
                }
            ]
        }
    },

    preprocess : {
      prod : {
        src : 'src/index.html',
        dest : 'p/index.html'
      }
    },

    strip : {
      main : {
        src : 'p/js/<%= pkg.name %>.js',
        dest : 'p/js/<%= pkg.name %>.nolog.js',
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
          'p/js/<%= pkg.name %>.min.js': ['p/js/<%= pkg.name %>.nolog.js']
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
    }

    // execute: {
    //     target: {
    //         src: ['grunt_fetch_data.js']
    //     }
    // }

    // watch: {
    //   files: ['<%= jshint.files %>'],
    //   tasks: ['jshint', 'qunit']
    // }

  });
  

  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy' );
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-strip');
  //grunt.loadNpmTasks('grunt-execute');


  //grunt.registerTask('dev', []);
  grunt.registerTask('default',['ngconstant:production','jshint','env:prod','less:prod','concat:js','concat:css','copy','strip','uglify','preprocess:prod','ngconstant:development']);

};