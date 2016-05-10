var createSourceMaps = false;

// Grunt tasks

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
		'* <%= pkg.name %> - v<%= pkg.version %> - MIT LICENSE <%= grunt.template.today("yyyy-mm-dd") %>. \n' +
		'* @author <%= pkg.author %>\n' +
		'*/\n',

		clean: {
			dist: ['src']
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			app: {
				src: ['app/modules/**/*.js']
			}
		},

		exec: {
			bowerInstaller: 'bower-installer'
		},

		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: false
			},
			base: {
				src: [
					// Angular Project Dependencies,
					'app/app.js',
					'app/app.config.js',
					'app/modules/**/*Module.js',
					'app/modules/**/*Route.js',
					'app/modules/**/*Ctrl.js',
					'app/modules/**/*Service.js',
					'app/modules/**/*Directive.js'
				],
				dest: 'app/assets/js/<%= pkg.name %>-appbundle.js'
			},
			build: {
				src: [
					// Angular Project Dependencies,
					'app/assets/libs/angular/angular.js',
					'app/assets/libs/**/*.js'

				],
				dest: 'app/assets/js/<%= pkg.name %>-angularbundle.js'
			},
			modules: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapName: './app/assets/css/modules.css.map',
                    sourceMapStyle: 'link'
                },
                src: ['./app/assets/css/modules/**/*.css'],
                dest: './app/assets/css/modules.css'
            },
			ui: {
                options: {
                    sourceMap: createSourceMaps,
                    sourceMapName: './app/assets/css/ui.css.map',
                    sourceMapStyle: 'link'
                },
                src: ['./app/assets/css/ui/**/*.css'],
                dest: './app/assets/css/ui.css'
            }
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				report: 'min'
			},
			modules: {
				src: ['./app/assets/css/modules.css'],
				dest: './app/assets/css/modules.min.css'
			},
			ui: {
				src: ['./app/assets/css/ui.css'],
				dest: './app/assets/css/ui.min.css'
			},
			base: {
				src: ['<%= concat.base.dest %>'],
				dest: './app/assets/js/<%= pkg.name %>-angscript.min.js'
			},
			basePlugin: {
				src: [ './src/plugins/**/*.js' ],
				dest: './app/assets/js/plugins/',
				expand: true,
				flatten: true,
				ext: '.min.js'
			}
		},

		connect: {
			server: {
				options: {
					keepalive: true,
					port: 8080,
					base: '.',
					hostname: '0.0.0.0',
					debug: true,
					livereload: true,
					open: true
				}
			}
		},
		concurrent: {
			tasks: ['connect', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},

		watch: {
			app: {
				files: '<%= jshint.app.src %>',
				tasks: ['jshint:app'],
				options: {
					livereload: true
				},
				css: {
					files: ["app/**/*.{scss,sass,css}"],
					tasks: ["sass"]
				},
			}
		},

		injector: {
			options: {},
			dev: {
				files: {
					'index.html': [
						'bower.json',
						'app/app.js',
						'app/app.config.js',
						'app/**/*Module.js',
						'app/**/*Route.js',
						'app/**/*Ctrl.js',
						'app/**/*Service.js',
						'app/**/*Directive.js'
					]
				}
			},
			production: {
				files: {
					'index.html': [
						'app/assets/css/**/*.css',
						'app/assets/js/*.js'
					]

				}
			}
		},

		ngtemplates: {
			app: {
				src: 'app/modules/**/*.html',
				dest: 'app/assets/js/templates.js',
				options: {
					module: '<%= pkg.name %>',
					root: 'app/',
					standAlone: false
				}
			}
		},

        sass: {
            options: {
				sourceMap: createSourceMaps
            },
            modules: {
                files: [{
                    expand: true,
                    cwd: './app/modules',
                    src: ['**/*.{scss,sass}'],
                    dest: './app/assets/css/modules',
                    ext: '.css'
                }]
            },
            ui: {
                files: [{
                    expand: true,
                    cwd: './app/ui',
                    src: ['**/*.{scss,sass}'],
                    dest: './app/assets/css',
                    ext: '.css'
                }]
            }
        }



	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project if something fail.
	grunt.option('force', true);

	// Register grunt tasks
	
	// build but don't run
	grunt.registerTask("build", [
		"styles",
		"jshint",
		"exec",
		"concat",
		"ngtemplates",
		"injector:production"
	]);

	// Build and run at port 8080
	grunt.registerTask("run", [
		"styles",
		"jshint",
		"exec",
		"concat",
		"ngtemplates",
		"injector:production",
		"concurrent",
		"clean"
	]);

	// Development task(s).
	grunt.registerTask('dev', ['styles', 'injector:dev', 'concurrent']);

	// Sass task(s).
	grunt.registerTask('styles', ['sass:ui', 'sass:modules', 'concat:modules', 'concat:ui']);

};
