/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n',

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['']
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            test: {
                src: ['webapp/modules/**/*.js', '!webapp/modules/main.js', '!webapp/modules/main.min.js']
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            test: {
                files: '<%= jshint.test.src %>',
                // tasks: ['jshint', 'jasmine']
                tasks: ['jshint']
            },
            concat: {
                files: ['webapp/modules/**/*.js', '!webapp/modules/main.js', '!webapp/modules/*.min.js'],
                tasks: ['concat']
            },
            uglify: {
                files: ['webapp/modules/main.js'],
                tasks: ['uglify']
            },
            cssmin: {
                files: ['webapp/style/main.css'],
                task: ['cssmin']
            }
        },

        concat: {
            dist: {
                options: {
                    separator: '\n\r',
                    banner: '/*\nConcatinated JS file \n' +
                            'Created Date: <%= grunt.template.today("yyyy-mm-dd") %>' +
                            '\n */ \n'
                },
                src: ['webapp/modules/sbstorage.src/*.js','webapp/modules/sbflickr.src/*.js', '!webapp/modules/main.js', '!webapp/modules/*.min.js'],
                    // the resulting JS file
                dest: 'webapp/modules/main.js' 
            }
        },

        uglify: {
            options: {
                //  banner for inserting at the top of the result
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                mangle: true
            },
            build: {
                src: ['webapp/modules/main.js'],
                dest: 'webapp/modules/main.min.js'
            }
        },
        cssmin: {
            css: {
                src: 'webapp/style/main.css',
                dest: 'webapp/style/main.min.css'
            }
        },



        // jasmine unit test runner task
        // jasmine: {
        //     src: ['*.js'],
        //     options: {
        //         specs: 'spec/**/*.spec.js',

        //         junit: {
        //             path: 'reports',
        //             consolidate: true
        //         },

        //         keepRunner: true, // enable to keep the test runner so that it can be viewed in a browser

        //         //template: require('grunt-template-jasmine-requirejs'),
        //         templateOptions: {
        //             requireConfig: {
        //                 baseUrl: 'modules/',
        //                 paths: {
        //                     'jquery-1.9': '../spec/vendor/jquery-1.9.1'
        //                 }
        //             }
        //         }
        //     }
        // }
    });



    // These plugins provide necessary tasks.
    // grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Tasks
    grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['build', 'test']);

};